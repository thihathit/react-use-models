## About

Ref-based 2-way data binding react-hook.

## Installation

install package via [npm](https://www.npmjs.com/package/react-use-models).

```
yarn add react-use-models

// or

npm -i react-use-models
```



## Usage

```jsx
import useModels from "./useModels"

function App() {
    const { models, register } = useModels({
        initialData: {
            gender: "female",
            colors: ["blue"],
            contact: "something",
        },
        onChange(values) {
            console.log(values)
        },
    })

    return (
        <div
            style={{
                margin: "0 auto",
                maxWidth: 1200,
            }}
        >
            <div>
                <label>Name</label>
                <br />
                <input ref={(ref) => register("name", ref)} type="text" />

                <br />
                <br />

                <label>Email</label>
                <br />
                <input ref={(ref) => register("email", ref)} type="email" />

                <br />
                <br />

                <label>Contact</label>
                <br />
                <textarea ref={(ref) => register("contact", ref)} />

                <br />
                <br />

                <label>Gender</label>
                <br />
                <input
                    ref={(ref) => register("gender", ref)}
                    name="gender"
                    type="radio"
                    value="male"
                />
                <input
                    ref={(ref) => register("gender", ref)}
                    name="gender"
                    type="radio"
                    value="female"
                />

                <br />
                <br />

                <label>Colors</label>
                <br />
                <input
                    ref={(ref) => register("colors", ref)}
                    name="colors"
                    type="checkbox"
                    value="red"
                />
                <input
                    ref={(ref) => register("colors", ref)}
                    name="colors"
                    type="checkbox"
                    value="blue"
                />

                <button
                    onClick={() => {
                        alert(JSON.stringify(models, null, 2))
                    }}
                >
                    Submit
                </button>
            </div>
        </div>
    )
}
```
