import { Dispatch, SetStateAction, ChangeEvent } from "react"

type TFieldValue = string | boolean | number

export type TypeUseModelsInput = {
    name: string
    type?: string
    onChange?: (e?: ChangeEvent<HTMLInputElement>) => void
}
export type TypeUseModelsInputProps = Readonly<
    Required<TypeUseModelsInput> & {
        value: TFieldValue
    }
>

export type TypeUseModelsRadio = {
    name: string
    value?: string | null
    onChange?: (e?: ChangeEvent<HTMLInputElement>) => void
}
export type TypeUseModelsRadioProps = Readonly<
    Required<TypeUseModelsRadio> & {
        value: TFieldValue
    }
>

export type TypeUseModelsCheckbox = {
    name: string
    truevalue?: TFieldValue
    falsevalue?: TFieldValue
    onChange?: (e?: ChangeEvent<HTMLInputElement>) => void
}
export type TypeUseModelsCheckboxProps = Readonly<
    Required<TypeUseModelsCheckbox> & {
        value: TFieldValue
        checked: TFieldValue
    }
>

export type TypeUseModelsConfig<InitialState> = {
    initialState?: InitialState
}

export interface TypeUseModels<InitialState> {
    models: InitialState
    register: {
        input: (options: TypeUseModelsInput) => TypeUseModelsInputProps
        radio: (options: TypeUseModelsRadio) => TypeUseModelsRadioProps
        checkbox: (options: TypeUseModelsCheckbox) => TypeUseModelsCheckboxProps
    }
    updateModel: (name: keyof InitialState, value: any) => void
    setModels: Dispatch<SetStateAction<Partial<InitialState>>>
}

export const useModels: <T>(
    options?: TypeUseModelsConfig<T>
) => TypeUseModels<T>

export default useModels
