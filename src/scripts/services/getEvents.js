
import {baseUrl, repositoriesQuantity} from "../variables.js"

export const getEvents = async (userName) => {
    const response = await fetch(`${baseUrl}/${userName}/events?per_page=${repositoriesQuantity}`)
    const events = await response.json()
    return  events.filter(event => event.type === 'CreateEvent' || event.type === 'PushEvent').slice(0, repositoriesQuantity)
}