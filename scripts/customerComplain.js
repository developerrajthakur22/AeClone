let form = document.querySelector("form");
let ename = document.getElementById("name");
let email = document.getElementById("email");
let number = document.getElementById("number");
let pname = document.getElementById("productname");
let complain = document.getElementById("complain");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let obj = {
        name : ename.value,
        email:email.value,
        number:number.value,
        productname:pname.value,
        complain : complain.value
    }
    fetch("https://642418c7d6152a4d48067bc3.mockapi.io/complain",{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(obj)
    })
    .then((res)=>res.json())
    .then((data)=>{console.log(data)
    alert("complain submitted")})
    .catch((err)=>console.error(err))
})