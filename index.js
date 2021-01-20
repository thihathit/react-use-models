import { useState } from "react"

import get from "lodash.get"
import set from "lodash.set"

const has = (o, k) => o[k] !== undefined

export const useModels = (options = {}) => {
    const { defaultState = {} } = options

    const [models, setModels] = useState(() => defaultState)

    const getModel = (name) => get(models, name)

    const updateModel = (name, value) => {
        setModels((old) => Object.assign({}, set(old, name, value)))
    }

    const input = ({ name, type = "text", onChange }) => {
        const handler = onChange || (() => undefined)

        const savedValue = getModel(name) || ""

        return {
            onChange: (e) => {
                let value = null

                //primitive values
                if (has(e, "value")) {
                    value = e.value
                }

                //normal value
                if (has(e, "target")) {
                    value = e.target.value
                }

                updateModel(name, value)

                handler(e)
            },
            value: savedValue,
            name,
            type,
        }
    }

    const radio = ({ name, value = null, onChange }) => {
        const handler = onChange || (() => undefined)

        return {
            onChange: (e) => {
                if (e.target.checked) {
                    updateModel(name, value)
                }

                handler(e)
            },
            checked: getModel(name) === value,
            type: "radio",
            name,
            value,
        }
    }

    const checkbox = ({
        name,
        truevalue = true,
        falsevalue = false,
        onChange,
    }) => {
        const handler = onChange || (() => undefined)

        return {
            onChange: (e) => {
                const value = e.target.checked ? truevalue : falsevalue

                updateModel(name, value)

                handler(e)
            },
            checked: getModel(name) === truevalue,
            type: "checkbox",
            name,
            value: truevalue,
        }
    }

    const checkboxes = ({ name, key = 0, value, onChange }) => {
        const handler = onChange || (() => undefined)

        const savedValue = getModel(name) || {}

        return {
            onChange: (e) => {
                const data = e.target.checked ? value : null

                const newValue = { ...savedValue }

                if (data) {
                    newValue[key] = data
                } else {
                    delete newValue[key]
                }

                updateModel(name, newValue)

                handler(e)
            },
            checked: savedValue.hasOwnProperty(key),
            type: "checkbox",
            name,
            value,
        }
    }

    return {
        models,
        register: {
            input,
            radio,
            checkbox,
            checkboxes,
        },
        updateModel,
        setModels,
    }
}

export default useModels
