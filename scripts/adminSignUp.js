let elform = document.querySelector("form");
let euser = document.getElementById("username");
let Eemail = document.getElementById("email");
let epass = document.getElementById("password");

elform.addEventListener("submit", (e) => {
    e.preventDefault();
    let obj = {
        username: euser.value,
        email: Eemail.value,
        password: epass.value
    }
    fetch("https://6421cc1c34d6cd4ebd7c224f.mockapi.io/adminuser", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            alert("registration successfull")
        })
        .catch((err) => console.error(err))
})