import { useTranslation } from "react-i18next"
import { Text } from "@/components/custom-ui/Text"

export function TodoEmpty() {
  const { t } = useTranslation()

  return (
    <Text variant="muted" size="sm" className="text-center py-8">
      {t("todo.empty")}
    </Text>
  )
}
