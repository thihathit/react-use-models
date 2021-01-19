## About

State-based 2-way data binding hook.

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
            items: {
                1: "two",
            },
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
                {...register.checkboxes({
                    name: "items",
                    key: 0,
                    value: "one",
                })}
            />
            <label>one</label>
            <br />
            <input
                {...register.checkboxes({
                    name: "items",
                    key: 1,
                    value: "two",
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
