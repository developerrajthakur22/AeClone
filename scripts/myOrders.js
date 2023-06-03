let orderid = JSON.parse(localStorage.getItem("orderid"));
let userobj = JSON.parse(localStorage.getItem("userlogin"))||{};
let user = document.getElementById("user");
user.textContent = userobj.username;
let noOfItems = document.getElementById("noOfItems");
let cardlist = document.getElementById("cardList");
fetch("https://642418c7d6152a4d48067bc3.mockapi.io/orders/")
.then((res)=>res.json())
.then((data)=>{
  let arr = [];
  for(let i=0;i<orderid.length;i++){
    for(let j=0;j<data.length;j++){
        if(orderid[i]==data[j].id){
            arr.push(data[j]);
        }
    }
  }
  noOfItems.textContent = arr.length;
  append(arr)
})

function append(array) {
    cardlist.innerHTML = "";
    array.forEach((el) => {
        let card = document.createElement("div");
        card.setAttribute("class","card");
        card.innerHTML = `<h1>Order ID : ${el.id}</h1>
         <h1>Status : ${el.status}</h1>
         <p>Payment Type : ${el["payment-type"]}</p>
         <p>Total :${el.total}</p>
         <h2>Delivery Date : ${convertintodate(el["delivery-date"])}</h2>`
         cardlist.append(card)
    })
}
function convertintodate(value) {
    if (value == "") {
        return ""
    }
    let timestamp = value
    let date = new Date(timestamp);
    let string = date.toDateString();
    return string;
}