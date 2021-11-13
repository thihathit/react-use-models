import { useState } from "react"

import get from "lodash.get"
import set from "lodash.set"

const has = (o, k) => o[k] !== undefined

export const useModels = ({ defaultState = {} }) => {
    const [models, setModels] = useState(() => Object.assign({}, defaultState))

    const getModel = (name) => get(models, name)

    const updateModel = (name, value) => {
        setModels((old) => Object.assign({}, set(old, name, value)))
    }

    const textarea = ({ name, onChange = () => {} }) => ({
        onChange: (e) => {
            const value = e.target.value

            updateModel(name, value)

            onChange(e)
        },
        value: getModel(name) || "",
        name,
    })

    const input = ({ name, type = "text", onChange = () => {} }) => ({
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

            onChange(e)
        },
        value: getModel(name) || "",
        name,
        type,
    })

    const radio = ({ name, value = null, onChange = () => {} }) => ({
        onChange: (e) => {
            if (e.target.checked) {
                updateModel(name, value)
            }

            onChange(e)
        },
        checked: getModel(name) === value,
        type: "radio",
        name,
        value,
    })

    const checkbox = ({
        name,
        truevalue = true,
        falsevalue = false,
        onChange = () => {},
    }) => ({
        onChange: (e) => {
            const value = e.target.checked ? truevalue : falsevalue

            updateModel(name, value)

            onChange(e)
        },
        checked: getModel(name) === truevalue,
        type: "checkbox",
        name,
        value: truevalue,
    })

    return {
        models,
        register: {
            input,
            textarea,
            radio,
            checkbox,
        },
        updateModel,
        setModels,
    }
}

export default useModels
