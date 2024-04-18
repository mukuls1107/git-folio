console.log("script started");
let btn = document.querySelector("button");
let mainCard = document.querySelector(".card");
let central = document.querySelector(".centralised");
const input = document.querySelector(".input-field");
let username;

// Define userObj to store user data
let userObj = {
    name: "",
    followers: 0,
    following: 0,
    avatar: "",
    numOfRepo: 0,
    numOfGist: 0
};

btn.addEventListener("click", (event) => {
    event.preventDefault();
    username = String(input.value).toLowerCase();
    getDataFromGithub(username);
});

function getDataFromGithub(name) {
    let apiURL = `https://api.github.com/users/${name}`;
    fetch(apiURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response is not OK`);
            }
            return response.json();
        })
        .then(data => {
            // Update user object with fetched data
            userObj.name = data.name;
            userObj.followers = data.followers;
            userObj.following = data.following;
            userObj.avatar = data.avatar_url;
            userObj.numOfRepo = data.public_repos;
            userObj.numOfGist = data.public_gists;

            // Display user details
            displayUserDetails();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            displayUserNotFoundError();
        });
}

function displayUserDetails() {
    // Hide main card
    mainCard.style.display = "none";

    // Clear central box before adding user details
    central.innerHTML = '';

    // Create user card element
    let userCard = document.createElement("div");
    userCard.classList.add("user-card");

    // Create and append user details to user card
    let userImg = document.createElement("img");
    userImg.src = userObj.avatar;
    userImg.alt = "User Avatar";
    userCard.appendChild(userImg);

    let userName = document.createElement("h2");
    userName.textContent = userObj.name;
    userCard.appendChild(userName);

    let followers = document.createElement("p");
    followers.textContent = `Followers: ${userObj.followers}`;
    userCard.appendChild(followers);

    let following = document.createElement("p");
    following.textContent = `Following: ${userObj.following}`;
    userCard.appendChild(following);

    let repos = document.createElement("p");
    repos.textContent = `Public Repos: ${userObj.numOfRepo}`;
    userCard.appendChild(repos);

    let gist = document.createElement("p");
    gist.textContent = `Public Gists: ${userObj.numOfGist}`;
    userCard.appendChild(gist);
    // Append user card to central box
    central.appendChild(userCard);

    // Show central box
    central.style.display = "flex";
}

function displayUserNotFoundError() {

    central.innerHTML = '';

    // Display user not found message
    let notFoundMessage = document.createElement("p");
    notFoundMessage.innerHTML = ":( User not found on GitHub.\nPlease Reload the page to search again.";
    central.appendChild(notFoundMessage);


    mainCard.style.display = "none"
    central.style.display = "flex";
}