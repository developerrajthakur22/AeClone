let container = document.getElementById("cont");
let adminuser = document.getElementById("adminuser");
adminuser.textContent = `Hey ${localStorage.getItem("adminAuth")}`;
fetch("https://642418c7d6152a4d48067bc3.mockapi.io/complain")
.then((res)=>res.json())
.then((data)=>{
    console.log(data)
    appendData(data);
})
.catch((err)=>console.error(err))
function appendData(deta){
    container.innerHTML = ""
    deta.forEach((el)=>{
        let a = createDiv(el.name,el.email,el.number,el.productname,el.complain);
        container.append(a);
    })
}
function createDiv(name,email,phone,productname,complain){
    let a = document.createElement("div");
    a.setAttribute("id","card");
    a.innerHTML = `<div id="b1">
       <h3>${name}</h1>
        <h3>${email}</h3>
        <h3>${phone}</h3>
        <h3>${productname}</h3>
      </div>
      <div>${complain}</div>
      <button>Respond</button>`
      return a
}