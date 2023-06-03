let eltbody = document.querySelector("tbody");
let adminuser = document.getElementById("adminuser");
adminuser.textContent = `Hey ${localStorage.getItem("adminAuth")}`;
let url = "https://642418c7d6152a4d48067bc3.mockapi.io/orders";
fetchrender(url)
function fetchrender(api) {
    fetch(api)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            data = data.filter((e)=>{
                if(e.status=="pending"){
                    return true
                }
                return false
            })
            appendTbody(data);
        })
        .catch((err) => console.error(err, "kaam khraab"))
}
function appendTbody(deta) {
    eltbody.innerHTML = "";
    deta.forEach((e) => {
        let a = createRow(e.id, e["payment-type"],e.createdAt,e.total )
        eltbody.append(a);
    })
}
function createRow(orderid, paymentType, orderDate, total) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    td1.textContent = orderid;
    let td2 = document.createElement("td");
    td2.textContent = paymentType;
    let td3 = document.createElement("td");
    td3.textContent = convertintodate(orderDate);
    let td4 = document.createElement("td");
    td4.textContent = total;
    let td5 = document.createElement("input");
    td5.setAttribute("type", "date")
    td5.addEventListener("change", async () => {
        let a = td5.value;
        let obj = { "delivery-date": a, status: "processing" }
        console.log(obj)
        if (a != "") {
            await aw1(orderid, obj)
            location.reload();
        }
    })
    let td6 = document.createElement("td");
    let p = document.createElement("p");
    p.textContent = "Cancel Order";
    td6.append(p)
    td6.addEventListener("click", async () => {
        await aw2(orderid)
        location.reload();
    })
    tr.append(td1, td2, td3, td4, td5,td6)
    return tr
}
async function aw1(orderid, obj) {
    await fetch(`${url}/${orderid}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err))
}
async function aw2(orderid) {
    await fetch(`${url}/${orderid}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err))
}
function convertintodate(value) {
    let timestamp = value
    let date = new Date(timestamp);
    let string = date.toDateString();
    return string;
}