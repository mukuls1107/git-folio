console.log("script started")
let btn = document.querySelector("button")
const input = document.querySelector(".input-field")
let username;

let userObj = {
    name: username,
    followers: 0,
    following: 0,
    avatar: "",
    repository: 0,
    star: 0
}



const userCard = document.createElement("div")
userCard.setAttribute("class","user-card");





btn.addEventListener("click", (event) => {
    event.preventDefault();
    username = String(input.value).toLowerCase()
    // console.log("Username:", username);
    getDataFromGithub(username)
})




function getDataFromGithub(name) {
    let apiURL = `https://api.github.com/users/${name}`;
    fetch(apiURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response is not OK`)
            }

            return response.json();
        })
        .then(data => {
            userObj["name"] = data.name;
            userObj["followers"] = data.followers;
            userObj["following"] = data.following;
            userObj["repository"] = data.public_repos;
            console.log(
                `Username is: ${data.login}\nNumber of followers: ${data.followers}\nNumber of following: ${data.following}`
            )
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}