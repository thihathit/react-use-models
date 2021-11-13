import { Dispatch, SetStateAction, ChangeEvent, HTMLProps } from "react"

type TFieldValue = HTMLProps<HTMLInputElement>

export type TypeUseModelsInput<FieldValues> = {
    name: keyof FieldValues
    type?: Pick<HTMLInputElement, "type">
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}
export type TypeUseModelsInputProps<FieldValues> = Readonly<
    Required<TypeUseModelsInput<FieldValues>> & {
        value: TFieldValue["value"]
    }
>

export type TypeUseModelsTextarea<FieldValues> = {
    name: keyof FieldValues
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
}
export type TypeUseModelsTextareaProps<FieldValues> = Readonly<
    Required<TypeUseModelsTextarea<FieldValues>> & {
        value: TFieldValue["value"]
    }
>

export type TypeUseModelsRadio<FieldValues> = {
    name: keyof FieldValues
    value?: string | null
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}
export type TypeUseModelsRadioProps<FieldValues> = Readonly<
    Required<TypeUseModelsRadio<FieldValues>> & {
        value: TFieldValue["value"]
    }
>

export type TypeUseModelsCheckbox<FieldValues> = {
    name: keyof FieldValues
    truevalue?: TFieldValue["value"]
    falsevalue?: TFieldValue["value"]
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}
export type TypeUseModelsCheckboxProps<FieldValues> = Readonly<
    Required<TypeUseModelsCheckbox<FieldValues>> & {
        value: TFieldValue["value"]
        checked: TFieldValue["checked"]
    }
>

export type TypeUseModelsConfig<FieldValues> = {
    defaultState?: FieldValues
}

export interface TypeUseModels<FieldValues> {
    models: FieldValues
    register: {
        input: (
            options: TypeUseModelsInput<FieldValues>
        ) => TypeUseModelsInputProps<FieldValues>
        textarea: (
            options: TypeUseModelsTextarea<FieldValues>
        ) => TypeUseModelsTextareaProps<FieldValues>
        radio: (
            options: TypeUseModelsRadio<FieldValues>
        ) => TypeUseModelsRadioProps<FieldValues>
        checkbox: (
            options: TypeUseModelsCheckbox<FieldValues>
        ) => TypeUseModelsCheckboxProps<FieldValues>
    }
    updateModel: (name: keyof FieldValues, value: any) => void
    setModels: Dispatch<SetStateAction<Partial<FieldValues>>>
}

export const useModels: <T>(
    options?: TypeUseModelsConfig<T>
) => TypeUseModels<T>

export default useModels
