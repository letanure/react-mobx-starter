import "@testing-library/jest-dom"
import { server } from "@/test/mocks/node"

// Establish API mocking before all tests
beforeAll(() => server.listen())

// Reset handlers after each test
afterEach(() => server.resetHandlers())

// Clean up after all tests are done
afterAll(() => server.close())
