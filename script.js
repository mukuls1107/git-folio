console.log("script started")
let btn = document.querySelector("button")
const input = document.querySelector(".input-field")
let username;

btn.addEventListener("click", (event) => {
    event.preventDefault();
    username = String(input.value)
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
            console.log(
                `Username is: ${data.login}\nNumber of followers: ${data.followers}\nNumber of following: ${data.following}`
            )
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}