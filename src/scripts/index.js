import {getUser} from "./services/getUser.js"
import { getRepositories} from "./services/getRepositories.js"
import { user } from "./objects/user.js"
import { screen } from "./objects/screen.js"
import { getEvents } from "./services/getEvents.js"

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    if(validateEmptyInput(userName)) return
    getUserData(userName)
})

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13

    if (isEnterKeyPressed) {
        if(validateEmptyInput(userName)) return
        getUserData(userName)
    }
})

const validateEmptyInput = (userName) =>  {
    if (userName.length === 0) {
        alert("Preencha o campo com o nome do usuário do github")
        return true
    }
}

const getUserData = async (userName) => {

    const userResponse =  await getUser(userName)
    if (userResponse.message === "Not Found") {
        screen.renderNotFound()
        return
    }

    const repositoriesResponse = await getRepositories(userName)
    const eventsResponse = await getEvents(userName)
        
    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    user.setEvents(eventsResponse)



    screen.renderUser(user)
    

}




