let elform = document.querySelector("form");
let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let address = document.getElementById("address");
elform.addEventListener("submit",(e)=>{
    e.preventDefault()
    let obj = {
        username: username.value,
        email : email.value,
        password : password.value,
        address : address.value
    }
    fetch("https://642942415a40b82da4cf4804.mockapi.io/user",{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(obj)
    })
    .then((res)=>res.json())
    .then((data)=>console.log(data))
    .catch((err)=>console.error(err))
    window.location.href = "./userLogIn.html";
    window.location.replace("./userLogIn.html");
    alert("registration successfull")
})