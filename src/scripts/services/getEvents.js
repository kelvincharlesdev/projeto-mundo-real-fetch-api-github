
import {baseUrl, repositoriesQuantity} from "../variables.js"

export const getEvents = async (userName) => {
    const response = await fetch(`${baseUrl}/${userName}/events?per_page=${repositoriesQuantity}`)

    return response.json()
}