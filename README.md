## About

State-based 2-way data binding hook.



### Credit

0.1.0 Implementation inspired from [use-models](https://www.npmjs.com/package/use-models).



## Installation

install package via [npm](https://www.npmjs.com/package/react-use-models).

```
yarn add react-use-models

// or

npm -i react-use-models
```



## Usage

```jsx
import React, { useEffect } from "react"
import useModels from "react-use-models"

function App() {
    const { models, setModels, updateModel, register } = useModels({
        defaultState: {
            name: "My Name",
            gender: "female",
            colors: "blue",
            contact: "something",
        },
    })

    useEffect(() => {
        setTimeout(() => updateModel("name", "My New Name"), 5000)
    }, [])

    return (
        <div>
            <label>Name</label>
            <br />
            <input {...register.input({ name: "name" })} />

            <br />
            <br />

            <label>Email</label>
            <br />
            <input {...register.input({ name: "email" })} />

            <br />
            <br />

            <label>Contact</label>
            <br />
            <textarea {...register.input({ name: "contact" })} />

            <br />
            <br />

            <label>Gender</label>
            <br />
            <input {...register.radio({ name: "gender", value: "male" })} />
            <input {...register.radio({ name: "gender", value: "female" })} />

            <br />
            <br />

            <label>Color</label>
            <br />
            <input
                {...register.checkbox({
                    name: "color",
                    truevalue: "red",
                })}
            />
            <label>red</label>
            <br />
            <input
                {...register.checkbox({
                    name: "color",
                    truevalue: "blue",
                })}
            />
            <label>blue</label>
            <br />
            <input
                {...register.checkbox({
                    name: "color",
                    truevalue: "Custom event",
                    onChange: (e) => alert(e.target.value),
                })}
            />
            <label>Custom event</label>

            <br />
            <br />

            <label>Items</label>
            <br />
            <input
                {...register.checkbox({
                    name: "items.one",
                })}
            />
            <label>one</label>
            <br />
            <input
                {...register.checkbox({
                    name: "items.two",
                })}
            />
            <label>two</label>

            <br />

            <button
                onClick={() => {
                    alert(JSON.stringify(models, null, 2))
                }}
            >
                Submit
            </button>

            <br />
            <br />
            <hr />
            <br />

            <code>
                <pre>{JSON.stringify(models, null, 2)}</pre>
            </code>
        </div>
    )
}
```



### Combo with [react-joi](https://www.npmjs.com/package/react-joi).

```jsx
import React, { useEffect } from "react"

import useModels from "react-use-models"
import Joi from "joi"
import useValidator from "react-joi"

export default function App() {
    const { models, register } = useModels({
        defaultState: {
            name: "My Name",
            email: "",
        },
    })

    const { state, setData, validate } = useValidator({
        initialData: models,
        schema: Joi.object({
            name: Joi.string().required(),
            email: Joi.string()
                .email({
                    tlds: { allow: false },
                })
                .required(),
        }),
    })

    // Sync model <-> validator
    useEffect(() => {
        setData(models)
    }, [models])

    return (
        <div>
            <label>Name</label>
            <br />
            <input {...register.input({ name: "name" })} />
            <br />
            {state.$errors.name.map((data) => data.$message).join(",")}

            <br />
            <br />

            <label>Email</label>
            <br />
            <input {...register.input({ name: "email" })} />
            <br />
            {state.$errors.email.map((data) => data.$message).join(",")}

            <br />

            <button onClick={validate}>Submit</button>

            <code>
                <h2>Models</h2>
                <pre>{JSON.stringify(models, null, 2)}</pre>
            </code>

            <hr />

            <code>
                <h2>Validation</h2>
                <pre>{JSON.stringify(state, null, 2)}</pre>
            </code>
        </div>
    )
}
```