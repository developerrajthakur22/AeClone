var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

var k;
for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}


let filter = {
  gender: "",
  category:[],
  size: [],
  price: []
}
function updateFilters() {
  let genderSelect = document.getElementById("sel-gen")
  filter.gender = genderSelect.value
  
  let categoryInputs = document.querySelectorAll("#filter input[type=checkbox][id=cat]")
   filter.category = []
   categoryInputs.forEach((input)=>{
      if(input.checked){
          filter.category.push(input.value)
      }
   })

  let sizeInputs = document.querySelectorAll("#filter input[type=checkbox][id=size]")
  filter.size = []
  sizeInputs.forEach((input) => {
      if (input.checked) {
          filter.size.push(input.value)
      }
  })


  let priceInputs = document.querySelectorAll("#filter input[type=checkbox][id=price]")
  filter.price = []
  priceInputs.forEach((input) => {
      if (input.checked) {
          filter.price.push(parseInt(input.value))
      }
  })
}
function applyFilters(product) {
  let filteredProducts = product.filter((el) => {
      // filter by gender
      if (filter.gender && el.gender !== filter.gender) {
          return false
      }

      if(filter.category.length>0 && (!filter.category.includes(el.category))){
         return false
      }
      // filter by size
      if (filter.size.length > 0 ) {
          let count = 0;
          for(let i=0;i<el.size.length;i++){
              if(filter.size.includes(el.size[i])){
                 count++
              }
          }
          if(count==0){
              return false
          }
          
      }

      // filter by price
      if (filter.price.length > 0) {
          let priceInRange = filter.price.some((price) => {
              return el.price <= price        
          })
          console.log(priceInRange)
          if (!priceInRange) {
              return false
          }
      }

      return true
  })
  return filteredProducts
}
let genderSelect = document.getElementById("sel-gen")
let sizeInputs = document.querySelectorAll("#filter input[type=checkbox][id=size]")
let priceInputs = document.querySelectorAll("#filter input[type=checkbox][id=price]")
let categoryInputs = document.querySelectorAll("#filter input[type=checkbox][id=cat]")
let sortltoh = document.getElementById("sort1")
let sorthtol = document.getElementById("sort2")
let irl = "https://6421cc1c34d6cd4ebd7c224f.mockapi.io/Products"
fetch(irl)
.then((res)=>res.json())
.then((data)=>{
  genderSelect.addEventListener("change", () => {
      updateFilters()
      let a =applyFilters(data)
      products.innerHTML = ""
      createcardlist(a)
  })
  categoryInputs.forEach((input)=>{
      input.addEventListener("change",()=>{
          updateFilters()
          let a = applyFilters(data)
          products.innerHTML = ""
          createcardlist(a)
      })
  })
  sizeInputs.forEach((input) => {
      input.addEventListener("change", () => {
          updateFilters()
          let a = applyFilters(data)
          products.innerHTML = ""
          createcardlist(a)
      })
  })
  priceInputs.forEach((input) => {
      input.addEventListener("change", () => {
          updateFilters()
          let a = applyFilters(data)
          products.innerHTML = ""
          createcardlist(a)
      })
  })
  sorthtol.addEventListener("change",()=>{
      if(sorthtol.checked){
          updateFilters()
         let a= applyFilters(data);
         a.sort(function(a,b){return b.price - a.price})
          products.innerHTML = ""
          createcardlist(a)
      }
  })
  sortltoh.addEventListener("change",()=>{
      if(sortltoh.checked){
          updateFilters()
          let a = applyFilters(data);
          a.sort(function (a, b) { return a.price - b.price })
          products.innerHTML = ""
          createcardlist(a)
      }
  })
  
})
function createcardlist(data) {
  let cardlist = document.createElement('div')
  cardlist.classList.add("card-list")
  products.append((cardlist))
  data.forEach((ele) => {
      let card = getcard(
          ele.id,
          ele.name,
          ele.image1,
          ele.image2,
          ele.catagory,
          ele.gender,
          ele.price,
          ele.addDate,
          ele.shipping,
          ele.description,
          ele.size,
          ele.discount,
          ele.quantity,
      );
      cardlist.append(card)
  });
  return cardlist
}
function getcard(id, name, image1, image2, cat, gen, price, date, ship, desc, size, dis, qty) {
  let card = document.createElement("div")
  card.classList.add("card")
  card.setAttribute("data-id", id)

  let cardimg = document.createElement('div')
  cardimg.classList.add("card-img")
  cardimg.addEventListener("click", () => {
      let prod = {
          id: id,
          name: name,
          image1: image1,
          image2: image2,
          catagory: cat,
          gender: gen,
          price: price,
          addDate: date,
          shipping: ship,
          description: desc,
          size: size,
          discount: dis,
          quantity: qty
      }
      localStorage.setItem("prod", JSON.stringify(prod))
      window.location.href = "./productDetails.html"
  })

  let pimg = document.createElement("img")
  pimg.setAttribute("src", image1)
  pimg.addEventListener("mouseenter", () => {
      pimg.setAttribute("src", image2)
  })
  pimg.addEventListener("mouseleave", () => {
      pimg.setAttribute("src", image1)
  })
  let icon = document.createElement("i")
  icon.classList.add("fa", "fa-heart", "heart-icon")
  // icon.classList.add("heart", "fa", "fa-heart-o")
  icon.setAttribute("id", "heart")

  let add = document.createElement("button")
  add.classList.add("add-prod")
  add.textContent = "Add to Cart"
  cardimg.appendChild(add)
  cardimg.appendChild(icon)
  cardimg.appendChild(pimg)

  let cardbody = document.createElement("div")
  cardbody.classList.add("card-body")
  let title = document.createElement("h5")
  title.classList.add("card-title")
  title.textContent = name
  let cprice = document.createElement("h6")
  cprice.classList.add("card-price")
  if (dis != 0) {
      let p = (price - (price * (dis / 100))).toFixed(2)
      let ap = document.createElement("span")
      ap.classList.add("price")
      ap.textContent = `$${p}USD`
      let d = document.createElement("span")
      d.classList.add("aprice")
      d.textContent = `$${price} USD`
      cprice.append(ap, d)
  } else {
      cprice.textContent = `$${price}USD`
  }

  cardbody.append(title, cprice)
  card.append(cardimg, cardbody)

  return card

}