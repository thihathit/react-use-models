import { useEffect, useRef } from "react"
import {
    effect,
    reactive,
    computed,
    isProxy,
    isReactive,
    isRef,
} from "@vue/reactivity"

import {
    registerFieldListeners,
    unRegisterListener,
    isMultipleType,
    isCheckbox,
} from "./events"

const toPlainValue = (proxy) => {
    const isVue = isProxy(proxy) || isReactive(proxy) || isRef(proxy)

    if (!isVue) return proxy

    if (Array.isArray(proxy)) {
        const plain = [...proxy]

        return plain.map((values) => toPlainValue(values))
    } else {
        const plain = { ...proxy }

        for (const name in plain) {
            if (typeof plain[name] == "object") {
                plain[name] = toPlainValue(plain[name])
            }
        }

        return plain
    }
}

const useModels = (options = {}) => {
    const { initialData = {}, onChange } = options

    const state = reactive({
        fields: {},
        field_events: {},
        models: initialData,
    })

    const fieldValues = computed(() => {
        return toPlainValue(state.models)
    })

    const models = useRef({})

    // DOM
    const updateFieldValue = (name, value) => {
        const fields = state.fields[name]

        if (Array.isArray(fields)) {
            if (isCheckbox(fields[0])) {
                fields.map((field) => {
                    if (value.includes(field.value)) {
                        field.checked = true
                    } else {
                        field.checked = false
                    }
                })
            } else {
                fields.map((field) => {
                    if (field.value == value) {
                        field.checked = true
                    } else {
                        field.checked = false
                    }
                })
            }
        } else {
            fields.value = value
        }
    }

    const updateModel = (name, value) => {
        state.models = {
            ...state.models,
            [name]: value,
        }
    }

    const setFieldValue = (name, value) => {
        updateModel(name, value)
        updateFieldValue(name, value)
    }

    const register = (name, ref) => {
        if (!ref) return

        if (isMultipleType(ref)) {
            const previousFields = state.fields[name]

            const fields = previousFields || []

            fields.push(ref)

            state.fields = {
                ...state.fields,
                [name]: fields,
            }
        } else {
            state.fields = {
                ...state.fields,
                [name]: ref,
            }
        }
    }

    effect(() => {
        models.current = fieldValues.value
    })

    if (onChange) {
        effect(() => {
            onChange(fieldValues.value)
        })
    }

    useEffect(() => {
        // Event binding
        if (state.fields) {
            for (const name in state.fields) {
                const fields = state.fields[name]

                const handler = (e) => {
                    if (Array.isArray(fields) && isCheckbox(fields[0])) {
                        const values = []

                        fields.map((field) => {
                            if (field.checked) {
                                values.push(field.value)
                            }
                        })

                        updateModel(name, values)
                    } else {
                        updateModel(name, e.target.value)
                    }
                }

                if (Array.isArray(fields)) {
                    const events = fields.map((field) => {
                        return registerFieldListeners(field, handler)
                    })

                    state.field_events = {
                        ...state.field_events,
                        [name]: events,
                    }
                } else {
                    const event = registerFieldListeners(fields, handler)

                    state.field_events = {
                        ...state.field_events,
                        [name]: event,
                    }
                }
            }
        }

        // set default values
        for (const name in initialData) {
            setFieldValue(name, initialData[name])
        }

        // Event un-binding
        return () => {
            if (state.field_events) {
                for (const name in state.field_events) {
                    const fields = state.fields[name]

                    if (Array.isArray(fields)) {
                        fields.map((field, index) => {
                            const event = state.field_events[name][index]

                            unRegisterListener(field, event.type, event.handler)
                        })
                    } else {
                        const event = state.field_events[name]

                        unRegisterListener(fields, event.type, event.handler)
                    }
                }
            }
        }
    }, [])

    return {
        models,
        setFieldValue,
        register,
    }
}

export default useModels
