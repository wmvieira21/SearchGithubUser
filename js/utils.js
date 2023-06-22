import User from "./user.js";

export default function getUserData(username) {
    const API_URL = 'https://api.github.com/users/';
    axios.get(API_URL.concat(username))
        .then(response => {
            const data = response.data;
            const userGit = Reflect.construct(User, [data.login, data.name, data.bio, data.avatar_url, data.public_repos, data.followers, data.following]);
            drawCard(userGit);
        })
        .catch(error => {
            console.log(error);
        });
}


function drawCard(user) {
    const cardSection = document.querySelector('.card-user-section');
    const bodyCard = `
    <div class="card-user__image">
    <figure>
        <img class="card-user__image--avatar" src="${user.avatar_url}"
            alt="${user.name}">
    </figure>
    </div>

    <div class="card-user__info">
        <div class="card-user__info--user">
            <h2 class="card-user__info--username">${user.name} (${user.login})</h2>
            <h4 class="card-user__info--bio">${user.bio}
            </h4>
        </div>

        <div class="card-user__info--details">
            <span class="card-user__info--followers">${user.followers} Followers</span>
            <span class="card-user__info--following">${user.following} Following</span>
            <span class="card-user__info--repo">${user.public_repos} Repositories</span>
        </div>

        <div class="card-user__info--repo">
            <ul>
                <li><a href="" target="blank">Repositorie 1</a></li>
                <li><a href="">Repositorie 1</a></li>
                <li><a href="">Repositorie 1</a></li>
            </ul>
        </div>
    </div>`;

    cardSection.innerHTML = bodyCard;
}