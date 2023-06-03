
// progress bar
function setProgress(progress) {
    let bar = document.getElementById("bar");
    let shipping_free_amt = document.getElementById("shipping_amt");
    // let deliveryChrg = document.getElementById("deliveryChrg");

    if (progress < 100) {
        bar.style.width = `${progress}%`;
        shipping_free_amt.innerText = "$" + (100 - progress);
    }
    else {
        bar.style.width = `100%`;
        need_to_buy.innerText = "You are Eligible for Free shipping!";
        // deliveryChrg.innerText = 0;
        // deliveryChrg.style.color = "red";
    }
}
let orderid = JSON.parse(localStorage.getItem("orderid")) || []
let userarr = JSON.parse(localStorage.getItem("userlogin")) || [];
let arr = JSON.parse(localStorage.getItem("cart-items")) || [];
console.log(arr);
let cardlist = document.getElementById("cardList");
let tot = document.getElementById("noOfItems");
let totalprice = document.getElementById("totalprice");
let totaldiscount = document.getElementById("totaldiscount");
let totalshipping = document.getElementById("shipping");
let alltotal = document.getElementById("alltotal");
let btncod = document.getElementById("btn1");
let btnonline = document.getElementById("btn2");
let elform = document.querySelector("form");
let cardnumber = document.getElementById("cardnumber");
let cvv = document.getElementById("cvv");
let totpri = 0;
let totdisc = 0;
let sum = 0;
append();
tot.textContent = sum
totpri = Math.round(totpri * 100);
totpri = totpri / 100;
totdisc = Math.round(totdisc * 100);
totdisc = totdisc / 100;
let abc = totpri - totdisc;
totalprice.textContent = `$ ${totpri}`;
totaldiscount.textContent = `$ ${totdisc}`;
setProgress(abc)
let totalbill
if (abc >= 100) {
    totalshipping.textContent = `$ ${0.00}`
    totalbill = totpri - totdisc + 0;
    totalbill = Math.round(totalbill * 100);
    console.log(totalbill)
    totalbill = totalbill / 100;
    alltotal.textContent = `$ ${totalbill}`
}
else {
    totalshipping.textContent = `$ ${7.81}`
    totalbill = totpri - totdisc + 7.81;
    totalbill = Math.round(totalbill * 100);
    totalbill = totalbill / 100;
    alltotal.textContent = `$ ${totalbill}`
}




btncod.addEventListener("click", () => {
    if (userarr.length == 0) {
        window.location.href = "./userLogIn.html";
        window.location.replace("./userLogIn.html");
    }
    else {
        let obj = {
            "payment-type": "cash",
            "delivery-date": "",
            status: "pending",
            quantity: sum,
            total: totalbill,
            "user-address": userarr.address
        }
        fetch("https://642418c7d6152a4d48067bc3.mockapi.io/orders/", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then((res) => res.json())
            .then((data) => {
                orderid.push(data.id);
                localStorage.setItem("orderid", JSON.stringify(orderid));
                console.log(data)
            })
            .catch((err) => console.error(err))

        alert("order placed")
    }
})
btnonline.addEventListener("click", () => {
    if (userarr.length == 0) {
        window.location.href = "./userLogIn.html";
        window.location.replace("./userLogIn.html");
    }
    else {
        elform.style.visibility = "visible"
    }
})
elform.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch("https://642942415a40b82da4cf4804.mockapi.io/atm")
        .then((res) => res.json())
        .then((data) => {
            let flag = false;
            for (let i = 0; i < data.length; i++) {
                if (cardnumber.value == data[i].cardNumber && cvv.value == data[i].cvv) {
                    flag = true;
                }
            }
            if (flag == false) {
                alert("enter valid credentials")
            }
            else {
                let obj = {
                    "payment-type": "cash",
                    "delivery-date": "",
                    status: "pending",
                    quantity: sum,
                    total: totalbill,
                    "user-address": userarr.address
                }
                fetch("https://642418c7d6152a4d48067bc3.mockapi.io/orders/", {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                })
                    .then((res) => res.json())
                    .then((data) => {
                        orderid.push(data.id);
                        localStorage.setItem("orderid", JSON.stringify(orderid));
                        console.log(data)
                    })
                    .catch((err) => console.error(err))

                alert("order placed")
            }
        })
})
function append() {
    cardlist.innerHTML = "";
    arr.forEach((el) => {
        totpri = totpri + ((+el.price) * el.quantity);
        console.log(totpri)
        sum = sum + el.quantity;
        let card = document.createElement("div");
        card.setAttribute("class", "card");
        let contentdiv = document.createElement("div");
        contentdiv.setAttribute("id", "content");
        let imgDiv = document.createElement("div");
        imgDiv.setAttribute("id", "imgdiv");
        let img = document.createElement("img")
        img.setAttribute("src", el.image);
        imgDiv.append(img);
        let dataDiv = document.createElement("div");
        dataDiv.setAttribute("id", "datadiv")
        let dname = document.createElement("h2");
        dname.textContent = el.name;
        let op = (+el.price) - ((+el.price) * ((el.discount) / 100));
        let dc = ((+el.price) * ((el.discount) / 100)) * el.quantity;
        totdisc = totdisc + dc;
        op = Math.round(op * 100);
        op = op / 100;
        let pdisp = document.createElement("h4");
        let sp1 = document.createElement("span");
        let sp2 = document.createElement("span");
        sp2.setAttribute("id", "sp2");
        sp1.textContent = op;
        sp2.textContent = el.price;
        pdisp.append(sp1, sp2);
        let dsize = document.createElement("p");
        dsize.textContent = `size : ${el.size}`
        let dquantity = document.createElement("p");
        dquantity.textContent = `quantity : ${el.quantity}`;
        dataDiv.append(dname, pdisp, dsize, dquantity);
        contentdiv.append(imgDiv, dataDiv);
        let buttons = document.createElement("div");
        buttons.setAttribute("class", "edit");
        let a1 = document.createElement("a");
        a1.textContent = "Add to favorites"
        let a2 = document.createElement("a");
        a2.textContent = "Remove";
        a2.addEventListener("click", () => {
            console.log("jaimatadi")
            let filtered = arr.filter((e) => {
                if (e.id == el.id) {
                    return false
                }
                return true
            })
            localStorage.setItem("cart-items", JSON.stringify(filtered));
            window.location.reload();
        })
        buttons.append(a1, a2);
        card.append(contentdiv, buttons);
        cardlist.append(card);
    })
}



//username -

let uname = JSON.parse(localStorage.getItem("userlogin"))

let name = document.getElementById("username")

name.textContent = uname.username.toUpperCase();

///
let Menbtn = document.querySelector(".men")
Menbtn.addEventListener("click", ()=>{
    localdata = "men"
    localStorage.setItem("filterbyCat", localdata)
    window.location.href = "./productsPage.html"
  })
  
let womenbtn = document.querySelector(".women")
womenbtn.addEventListener("click", ()=>{
  localdata = "women"
  localStorage.setItem("filterbyCat", localdata)
  window.location.href = "./productsPage.html"
})

let jeans = document.querySelector(".jeans")
jeans.addEventListener("click", ()=>{
  localdata = "jeans"
  localStorage.setItem("filterbyCat", localdata)
  window.location.href = "./productsPage.html"
})