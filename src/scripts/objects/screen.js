export const screen = {
    userProfile : document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML  = 
        `   
            <div class="info">
                <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                <div class="data">
                    <h1>${user.name ?? "Não possui nome cadastrado 😒"}</h1>
                    <p>${user.bio ?? "Não possui bio cadastrada 😒"}</p>
                    <p>Seguidores: ${user.followers ?? "Não possui seguidores 😒"}</p>
                    <p>Seguindo: ${user.following ?? "Ainda não segue ninguém 😒!"}</p>
                </div>
            </div>
        `
        let repositoriesItens = ""
        user.repositories.forEach(repo => {
            repositoriesItens += `
            <li>
                <a href="${repo.html_url}"  target="_blank">${repo.name}</a>
            </li>
            `
        });

        if (user.repositories.length > 0 ) {
            this.userProfile.innerHTML += `
                <div class="repositories section">
                    <h2>Repositórios</h2>
                    <ul>
                        ${repositoriesItens}
                    </ul>
                </div>
            `
        }


        let eventsItem = ''
        user.events.forEach(event => {
            if (event.type === "PushEvent" || event.type === "CreateEvent") {
                if (event.type === "PushEvent") {
                     eventsItem += `
                        <li>
                            <p class="name-repo">${event.repo.name}: <span> - ${event.payload.commits[0].message}</span></p>
                            <br/>
                        </li>
                    `
                }

                if (event.type === "CreateEvent") {
                    eventsItem += `
                        <li>
                            <p class="name-repo">${event.repo.name}: <span> - Sem mensagem de commit</span></p>
                            <br/>
                        </li>
                    `
                }
            }
        });

        this.userProfile.innerHTML += `
            <div class="repositories section">
                <h2>Eventos</h2>
                <ul>
                    ${eventsItem}
                </ul>
            </div>
        `
    },
    renderNotFound() {
        this.userProfile.innerHTML  = `<h3>Usuário não encontrado!</h3>`
    },
}