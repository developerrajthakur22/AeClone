let prod1=JSON.parse(localStorage.getItem("prod")) || []
let cartItems = JSON.parse(localStorage.getItem("cart-items"))||[]
let container = document.getElementById("prod-image")
let details = document.getElementById("details")
console.log(prod1)
displayprod(prod1)
function displayprod(data){
let cardimg = document.createElement("div")
cardimg.classList.add("card-img")
let img1 = document.createElement("img")
img1.src=data.image1
let img2 = document.createElement("img")
img2.src=data.image2
cardimg.append(img1,img2)
container.append(cardimg)

let cardbody = document.createElement("div")


let title = document.createElement("h3")
title.textContent=data.name

let det = document.createElement("p")
det.textContent=data.description

let ideal =document.createElement("p")
ideal.textContent=`Ideal for: ${data.gender}`

let cat =document.createElement("p")
cat.textContent=`Shipping : $${data.shipping}USD`

let l1 =document.createElement("label")
l1.textContent="Price :"
let price = document.createElement("h6")

if(data.discount==0){
    let spn = document.createElement("p")
    spn.classList.add("aprice")
    spn.textContent=`$${data.price}USD`
    price.append(spn)
}else{
   var pr = (data.price-(data.price*(data.discount/100))).toFixed(2) 
   let spn = document.createElement("p")
   spn.classList.add("dprice")
   let dis = document.createElement("button")
   dis.classList.add("discount")
   dis.textContent=`save ${data.discount}%`
   spn.textContent=`$${pr}USD     `
    spn.append(dis)
   let apr = document.createElement("span")
   apr.classList.add("aaprice")
   apr.textContent=`$${data.price}USD`
   price.append(spn,apr)
}

var sel = document.createElement("select")
sel.classList.add("sel-size")
let op0 =document.createElement("option")
op0.setAttribute("value",null)
op0.textContent="SIZE"
sel.append(op0)
for(let i=0;i<data.size.length;i++){
    let op=document.createElement("option")
    op.setAttribute("value",data.size[i])
    op.textContent=data.size[i]
    sel.append(op)
}
let qty = document.createElement("div")
qty.classList.add("pqty")

let tqty = document.createElement("span")
let item=1
tqty.textContent=item
let inc = document.createElement("button")
inc.classList.add("inc")
inc.textContent="+"
inc.addEventListener("click",()=>{
    item=item+1
    tqty.textContent=item
})

let desc = document.createElement("button")
desc.classList.add("desc")
desc.textContent="-"

desc.addEventListener("click",()=>{
    if(item>1){
        item=item-1
        tqty.textContent=item
    }
})

let bag = document.createElement("button")
bag.classList.add("bag")
bag.textContent = "Add to Bag"

sel.addEventListener("change",()=>{
    sel.value=sel.value
    console.log(sel.value)
})
bag.addEventListener("click",()=>{
    if(sel.value=="null"){
        alert("Please select the size.")
    }else{
        if(checkDuplicate(data.id)){
            alert("Product already in the Cart.")
        }else{
            let cart ={
                id:data.id,
                name:data.name,
                quantity:item,
                price:pr,
                image:data.image1,
                discount: data.discount,
                size:sel.value
            }
            console.log(cart)
            cartItems.push(cart)
            localStorage.setItem("cart-items",JSON.stringify(cartItems)) 
        alert(`Product added to the cart with quantity of ${item}.`)
        }
    }
})


let wish = document.createElement("button")
wish.classList.add("wish")

wish.textContent = " 🤍 Save to fevorites"

qty.append(desc,tqty,inc)

cardbody.append(title,l1,price,det,ideal,cat,sel,qty,bag,wish)
details.append(cardbody)

}

function checkDuplicate(id){
    for(let i=0;i<cartItems.length;i++){
        if(cartItems[i].id==id){
          return true
        }
      }
      return false 
}


//username on navbar
//user
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