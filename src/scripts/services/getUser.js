import {baseUrl} from "../variables.js"

 const getUser = async (userName) => {
    const response = await fetch(`${baseUrl}/${userName}`)

    return await response.json()
}

export { getUser }
