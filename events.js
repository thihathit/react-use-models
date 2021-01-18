export const isCheckbox = (element) => {
    return ["checkbox"].includes(element.type)
}

export const isMultipleType = (element) => {
    return ["checkbox", "radio"].includes(element.type)
}

export const getEventType = (element) => {
    return element.tagName.toLowerCase() === "select" || isMultipleType(element)
        ? "change"
        : "input"
}

export const registerListener = (element, type, handler) => {
    element.addEventListener(type, handler)
}

export const unRegisterListener = (element, type, handler) => {
    element.removeEventListener(type, handler)
}

export const registerFieldListeners = (element, handler) => {
    const eventType = getEventType(element)

    registerListener(element, eventType, handler)

    return {
        type: eventType,
        handler,
    }
}
