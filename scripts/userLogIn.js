let elform = document.querySelector("form");
let uemail = document.getElementById("email");
let upass = document.getElementById("password");
elform.addEventListener("submit",(e)=>{
    e.preventDefault();
    fetch("https://642942415a40b82da4cf4804.mockapi.io/user")
    .then((res)=>res.json())
    .then((data)=>{
        for(let i=0;i<data.length;i++){
            if(uemail.value==data[i].email && upass.value==data[i].password){
                let obj = {
                    username: data[i].username,
                    address: data[i].address
                }
                localStorage.setItem("userlogin",JSON.stringify(obj));
                window.location.href = "./cart.html";
                window.location.replace("./cart.html");
                alert("login successfull");
            }
        }
    })
})