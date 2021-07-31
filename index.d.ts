import { Dispatch, SetStateAction, ChangeEvent, HTMLProps } from "react"

type TFieldValue = HTMLProps<HTMLInputElement>

export type TypeUseModelsInput = {
    name: string
    type?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}
export type TypeUseModelsInputProps = Readonly<
    Required<TypeUseModelsInput> & {
        value: TFieldValue["value"]
    }
>

export type TypeUseModelsRadio = {
    name: string
    value?: string | null
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}
export type TypeUseModelsRadioProps = Readonly<
    Required<TypeUseModelsRadio> & {
        value: TFieldValue["value"]
    }
>

export type TypeUseModelsCheckbox = {
    name: string
    truevalue?: TFieldValue["value"]
    falsevalue?: TFieldValue["value"]
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}
export type TypeUseModelsCheckboxProps = Readonly<
    Required<TypeUseModelsCheckbox> & {
        value: TFieldValue["value"]
        checked: TFieldValue["checked"]
    }
>

export type TypeUseModelsConfig<DefaultState> = {
    defaultState?: DefaultState
}

export interface TypeUseModels<DefaultState> {
    models: DefaultState
    register: {
        input: (options: TypeUseModelsInput) => TypeUseModelsInputProps
        radio: (options: TypeUseModelsRadio) => TypeUseModelsRadioProps
        checkbox: (options: TypeUseModelsCheckbox) => TypeUseModelsCheckboxProps
    }
    updateModel: (name: keyof DefaultState, value: any) => void
    setModels: Dispatch<SetStateAction<Partial<DefaultState>>>
}

export const useModels: <T>(
    options?: TypeUseModelsConfig<T>
) => TypeUseModels<T>

export default useModels
