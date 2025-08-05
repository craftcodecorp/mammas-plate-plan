import * as React from "react"
import {
  ControllerProps,
  useFormContext,
} from "react-hook-form"

/**
 * Form field context value type
 */
export type FormFieldContextValue = {
  name: string
}

/**
 * Form field context
 */
export const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

/**
 * Form item context value type
 */
export type FormItemContextValue = {
  id: string
}

/**
 * Form item context
 */
export const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

/**
 * Hook to access form field context
 */
export function useFormField() {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const fieldState = getFieldState(fieldContext.name, formState)
  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

/**
 * Controller props type
 */
export type FormFieldProps = ControllerProps<Record<string, unknown>, string>
