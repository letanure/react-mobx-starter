# Schema-First Validation Architecture

## Overview

The application uses a **schema-first approach** with Zod for all validation needs. This ensures type safety, runtime validation, and consistent error handling across the entire application.

## Core Principles

### 1. Single Source of Truth
All types are derived from Zod schemas, not defined separately:

```typescript
// ✅ Good: Schema-first approach
export const UserSchema = z.object({
  id: z.string().min(1, "validation.required"),
  email: z.string().email("validation.invalidEmail"),
  name: z.string().min(1, "validation.required"),
})

export type User = z.infer<typeof UserSchema>

// ❌ Avoid: Separate type definitions
interface User {
  id: string
  email: string  
  name: string
}
```

### 2. Validation Boundaries

Validation happens at **data boundaries**:

- **UI Boundary**: Forms validate user input
- **Persistence Boundary**: Data from localStorage/API is validated during hydration
- **Store Internal**: Business logic trusts pre-validated data

```typescript
// Form validates input
<FormBuilder 
  schema={UserFormSchema}
  translateMessage={t}
  onSubmit={handleSubmit}
/>

// Store trusts validated data
addUser(userData: User) {
  // No re-validation needed - form already validated
  this.users.push(userData)
}

// Persistence validates during hydration  
static persistenceConfig = {
  key: "userStore",
  schema: UserStoreSchema, // Validates data from localStorage
}
```

### 3. i18n Integration

Use i18n keys in validation messages for localized error handling:

```typescript
// Schema with i18n keys
export const UserSchema = z.object({
  email: z.string().email("validation.invalidEmail"),
  password: z.string().min(8, "validation.passwordTooShort"),
})

// Form with translation
<FormBuilder 
  schema={UserFormSchema}
  translateMessage={t} // t("validation.invalidEmail") -> "Please enter a valid email"
/>
```

## Implementation Patterns

### Feature Schema Structure

Each feature should have a `schemas.ts` file:

```typescript
// src/features/user/schemas.ts
import { z } from "zod"

// Main entity schema
export const UserSchema = z.object({
  id: z.string().min(1, "validation.required"),
  email: z.string().email("validation.invalidEmail"), 
  name: z.string().min(1, "validation.required"),
  createdAt: z.coerce.date(), // Handle string dates from persistence
})

// Form-specific schemas
export const UserFormSchema = z.object({
  email: z.string().email("validation.invalidEmail"),
  name: z.string().min(1, "validation.required"),
})

export const UpdateUserSchema = UserSchema.partial().extend({
  id: z.string().min(1, "validation.required"), // ID required for updates
})

// Store state schema for persistence validation
export const UserStoreSchema = z.object({
  users: z.array(UserSchema),
})

// Inferred types (single source of truth)
export type User = z.infer<typeof UserSchema>
export type UserFormData = z.infer<typeof UserFormSchema>  
export type UpdateUser = z.infer<typeof UpdateUserSchema>
export type UserStoreData = z.infer<typeof UserStoreSchema>
```

### Store Integration

```typescript
// src/features/user/store.ts
import { makeAutoObservable } from "mobx"
import { UserStoreSchema, type User } from "./schemas"

export class Store {
  users: User[] = []

  constructor() {
    makeAutoObservable(this)
  }

  // Persistence with validation
  static persistenceConfig = {
    enabled: true,
    key: "userStore", 
    schema: UserStoreSchema, // Validates during hydration
  }

  // Business logic trusts validated data
  addUser(userData: User) {
    this.users.push(userData)
  }
}
```

### FormBuilder Integration

```typescript
// Component with validation
export function UserForm({ onSubmit }: UserFormProps) {
  const { t } = useTranslation()
  
  return (
    <FormBuilder
      fields={fields}
      schema={UserFormSchema} // Uses centralized schema
      translateMessage={t}    // Translates validation keys
      onSubmit={onSubmit}
    />
  )
}
```

## Validation Keys

### Standard Keys
Use these standard validation keys for consistency:

```typescript
// Common validation keys
"validation.required"        // Field is required
"validation.invalidEmail"    // Invalid email format
"validation.tooShort"       // Text too short
"validation.tooLong"        // Text too long
"validation.invalidFormat"   // Invalid format
"validation.mustMatch"      // Fields must match
```

### Feature-Specific Keys
For domain-specific validation:

```typescript
// Feature-specific keys
"user.validation.usernameExists"     // Username already exists
"todo.validation.titleRequired"      // Todo title required
"auth.validation.passwordWeak"       // Password too weak
```

## Error Handling

### Form Validation Errors
FormBuilder automatically handles validation errors:

```typescript
// Schema with validation message
const schema = z.object({
  email: z.string().email("validation.invalidEmail")
})

// Error displays as: t("validation.invalidEmail") -> "Please enter a valid email"
```

### Persistence Validation Errors
Corrupted localStorage data is handled gracefully:

```typescript
// If validation fails during hydration:
console.warn('Hydration validation failed for userStore:', error)
// Falls back to default store state
```

### Custom Validation
For complex business rules:

```typescript
const schema = z.object({
  password: z.string()
    .min(8, "validation.passwordTooShort")
    .refine(
      (val) => /[A-Z]/.test(val), 
      { message: "validation.passwordNoUppercase" }
    )
    .refine(
      (val) => /[0-9]/.test(val),
      { message: "validation.passwordNoNumber" }
    )
})
```

## Best Practices

### ✅ Do's
- Define schemas before types
- Use i18n keys in validation messages
- Validate at data boundaries only  
- Use `z.coerce.date()` for date persistence
- Keep business logic validation-free
- Use descriptive schema names (`UserFormSchema`, `CreateUserSchema`)

### ❌ Don'ts  
- Don't define types separately from schemas
- Don't validate the same data multiple times
- Don't use hardcoded error messages
- Don't skip validation at boundaries
- Don't put validation logic in business logic
- Don't forget to handle date coercion for persistence

## Migration Guide

### From Interface to Schema-First

```typescript
// Before: Separate interface
interface User {
  id: string
  name: string
}

// After: Schema-first
const UserSchema = z.object({
  id: z.string().min(1, "validation.required"),
  name: z.string().min(1, "validation.required"),
})

type User = z.infer<typeof UserSchema>
```

### Adding Validation to Existing Features

1. Create `schemas.ts` file
2. Define Zod schemas with validation rules
3. Export inferred types 
4. Update store to use schema for persistence
5. Update forms to use schema for validation
6. Remove old type definitions
7. Add i18n translations for validation keys

This schema-first approach provides type safety, runtime validation, and excellent developer experience while maintaining clean separation of concerns.