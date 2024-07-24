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
                <a href="${repo.html_url}"  target="_blank">
                    ${repo.name}
                    <div class="info-repo">
                    <span class="info-repo-itens ">🔀${repo.forks !== 0 ? repo.forks : "Sem forks 😒"}</span>
                    <span class="info-repo-itens ">⭐${repo.stargazers_count !== 0 ? repo.stargazers_count : "Sem estrelas 😒"}</span>
                    <span class="info-repo-itens ">👀${repo.watchers_count !== 0 ? repo.watchers_count : "Sem views 😒" }</span>
                    <span class="info-repo-itens ">👨‍💻${repo.language !== null ? repo.language  : "Sem linguagem😒"}</span>
                    </div>
                </a>
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
            
                if (event.type === "PushEvent") {
                     eventsItem += `
                        <li>
                            <p class="name-repo">${event.repo.name}: <span> - ${event.payload.commits[0].message}</span></p>
                            <br/>
                        </li>
                    `
                }else if (event.type === "CreateEvent") {
                    eventsItem += `
                    <li>
                        <p class="name-repo">${event.repo.name}: <span> - Sem mensagem de commit</span></p>
                        <br/>
                    </li>
                `
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