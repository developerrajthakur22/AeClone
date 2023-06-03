let elform = document.querySelector("form");
let eemail = document.getElementById("email");
let epass = document.getElementById("password");
elform.addEventListener("submit", (e) => {
    e.preventDefault()
    fetch("https://6421cc1c34d6cd4ebd7c224f.mockapi.io/adminuser")
        .then((res) => res.json())
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].email == eemail.value && data[i].password == epass.value) {
                    alert("login successful");
                    localStorage.setItem("adminAuth",data[i].username)
                    window.location.href = "./adminHomePage.html";
                    window.location.replace("./adminHomePage.html");

                }
            }
        })
        .catch((err) => console.error(err, "kaam khraab"))
})