import User from "./user.js";

export default function getUserData(username) {
    const API_URL_USER = 'https://api.github.com/users/';
    const API_URL_STARRED_REPO = `https://api.github.com/users/${username}/starred`;

    const getUserData = axios.get(API_URL_USER.concat(username));
    const getStarredRepo = axios.get(API_URL_STARRED_REPO);

    Promise.all([getUserData, getStarredRepo])
        .then(response => {
            console.log(response);
            const data = response[0].data;
            const listStarredRepo = response[1].data;

            const userGit = Reflect.construct(User, [data.login, data.name, data.bio, data.avatar_url, data.public_repos, data.followers, data.following, listStarredRepo]);

            clearCards();
            drawCard(userGit);
        })
        .catch(error => {
            clearCards();
            showError(error);
            console.log(error);
        });
}

function drawCard(user) {
    const bodyCard = `
    <section class="card-user-section">
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
    </div>
    </section>`;

    document.querySelector('.form-section').insertAdjacentHTML('afterend', bodyCard);
}

function clearCards() {
    const card = document.querySelector('.card-user-section');

    if (card) {
        document.querySelector('main').removeChild(card);
    }
}

function showError(error) {
    const errorMessageEl = document.querySelector('.error-section');
    errorMessageEl.classList.add('show-error');
    setTimeout(() => {
        errorMessageEl.classList.remove('show-error');
    }, 3000);
}