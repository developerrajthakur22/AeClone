let url = `https://642418c7d6152a4d48067bc3.mockapi.io/orders`;
let eltbody = document.querySelector("tbody");
let pending = document.getElementById("pending");
let cancel = document.getElementById("cancel");
let process = document.getElementById("process");
let totalincome = document.getElementById("income");
let adminuser = document.getElementById("adminuser");
let btnwrap = document.getElementById("btnwrap");
let sortltoh = document.getElementById("sltoh");
let sorthtol = document.getElementById("shtol")
let arr = [];
adminuser.textContent = `Hey ${localStorage.getItem("adminAuth")}`;
sorthtol.addEventListener("click",()=>{
    let link = new URL("https://642418c7d6152a4d48067bc3.mockapi.io/orders")
    link.searchParams.append('sortBy', 'total');
    link.searchParams.append('order', 'desc');
    fetchrender(link,1)
})
sortltoh.addEventListener("click", () => {
    let link = new URL("https://642418c7d6152a4d48067bc3.mockapi.io/orders")
    link.searchParams.append('sortBy', 'total');
    link.searchParams.append('order', 'asc');
    fetchrender(link, 1)
})
process.addEventListener("click", (e) => {
    e.preventDefault();
    let link = "https://642418c7d6152a4d48067bc3.mockapi.io/orders?status=processing"
    fetchrender(link,1)
    
})
cancel.addEventListener("click",(e)=>{
    e.preventDefault();
    let link = "https://642418c7d6152a4d48067bc3.mockapi.io/orders?status=cancel"
    fetchrender(link, 1);
    
})
totalincome.addEventListener("click", (e) => {
    e.preventDefault();
    let link = "https://642418c7d6152a4d48067bc3.mockapi.io/orders?status=delivered"
    fetchrender(link, 1)

})
window.addEventListener("load",()=>{
    fetchnumber(url);
    fetchrender(url, 1);
})
async function fetchnumber(api) {
    try {
        let res = await fetch(api)
        let data = await res.json()
        displayheadings(pending, data, "pending");
        displayheadings(cancel, data, "cancel");
        displayheadings(process, data, "processing");
        displaytotalincome(totalincome, data)
        let filtered = data.filter((e) => {
            if (e.status != "pending") {
                return true;
            }
        })
        if (arr.length > 0) {
            arr.pop();
        }
        arr.push(filtered.length);
    }
    catch (err) {
        console.log(err)
    }
}
function fetchrender(link, pageno) {
    let api = new URL(link)
    api.searchParams.append('page', pageno);
    api.searchParams.append('limit', 7);
    fetch(api)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            let totalpost = +arr[0];
            let totalbtn = Math.ceil(totalpost / 7);
            btnwrap.innerHTML = "";
            for (let i = 1; i <= totalbtn; i++) {
                let a = createbtn(link, i)
                btnwrap.append(a);
            }
            data = data.filter((e) => {
                if (e.status != "pending") {
                    return true;
                }
            })
            appendTbody(data)
        })
        .catch((err) => console.error(err, "kaam khraab"))
}
function appendTbody(deta) {
    eltbody.innerHTML = "";
    deta.forEach((e) => {
        let a = createRow(e.id, e["payment-type"], e.createdAt, e["delivery-date"], e["product-id"], e.quantity, e.total, e.status)
        eltbody.append(a);
    })
}
function createRow(orderid, paymentType, orderDate, deliverydate, productid, quantity, total, status) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    td1.textContent = orderid;
    let td2 = document.createElement("td");
    td2.textContent = paymentType;
    let td3 = document.createElement("td");
    td3.textContent = convertintodate(orderDate);
    let td4 = document.createElement("td");
    td4.textContent = convertintodate(deliverydate);
    let td5 = document.createElement("td");
    td5.textContent = productid;
    let td6 = document.createElement("td");
    td6.textContent = quantity;
    let td7 = document.createElement("td");
    td7.textContent = total;
    let td8 = document.createElement("td");
    let p = document.createElement("p")
    p.textContent = status;
    td8.append(p);
    if (status == "processing") {
        p.style.backgroundColor = "rgb(110, 87, 244)"
    }
    else if (status == "cancel") {
        p.style.backgroundColor = "red"
    }
    else if (status == "delivered") {
        p.style.backgroundColor = "yellowgreen"
    }
    let td9 = document.createElement("select");
    td9.innerHTML = `<option value="">Edit Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="delivered">Delivered</option>
            <option value="cancel">Cancel</option>`
    td9.addEventListener("change", async () => {
        let a = td9.value;
        let obj = { status: a }
        console.log(obj)
        if (a != "") {
            await aw1(orderid, obj)
            window.location.reload();
        }
    })
    tr.append(td1, td2, td3, td4, td5, td6, td7, td8, td9)
    return tr
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
function displayheadings(dibba, deta, value) {
    dibba.innerHTML = "";
    let count = 0;
    deta.forEach((e) => {
        if (e.status == value) {
            count++;
        }
    })
    dibba.innerText = count;
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
function displaytotalincome(dibba, deta) {
    dibba.innerHTML = "";
    let tot = 0;
    deta.forEach((e) => {
        if (e.status == "delivered") {
            tot = tot + e.total
        }
    })
    dibba.innerText = `$ ${tot}`;
}
function createbtn(api, id) {
    let btn = document.createElement("button");
    btn.textContent = id
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        fetchrender(api, id);
    })
    return btn
}
function fetchrenderfilt(link, pageno,b) {
    let api = new URL(link)
    api.searchParams.append('page', pageno);
    api.searchParams.append('limit', 7);
    fetch(api)
        .then((res) => {
            let totalpost = +b[0];
            let totalbtn = Math.ceil(totalpost / 7);
            btnwrap.innerHTML = "";
            for (let i = 1; i <= totalbtn; i++) {
                let a = createbtn(link, i)
                btnwrap.append(a);
            }
            return res.json()
        })
        .then((data) => {
            appendTbody(data)
        })
        .catch((err) => console.error(err, "kaam khraab"))
}
