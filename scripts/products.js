

let adminuser = document.getElementById("adminuser");
adminuser.textContent = `Hey ${localStorage.getItem("adminAuth")}`;



let names=document.getElementById('name');
let imgs1=document.getElementById('image1');
let imgs2=document.getElementById('image2');
let categorys=document.getElementById('select_category');
let genders=document.getElementById('gender');
let prices=document.getElementById('price');
let addates=document.getElementById('date');
let shippings=document.getElementById('shipping');
let descriptions=document.getElementById('description');
let sizes=document.getElementById('select_size');
let discounts=document.getElementById('discount');
let quantitys=document.getElementById('quantity');
let submit=document.getElementById('submit');
let editb=document.getElementById('submit_edit');

submit.addEventListener('click',(e)=>{
    e.preventDefault()
    fetched()
})



 function fetched(){
    

 fetch(`https://6421cc1c34d6cd4ebd7c224f.mockapi.io/Products`,{
     
     method:'POST',
     headers:{
        'Content-Type':'application/json'
     },
     body:JSON.stringify({
        name:names.value,
        image1:imgs1.value,
        image2:imgs2.value,
        category:categorys.value,
        gender:genders.value,
        price:prices.value,
        addDate:addates.value,
        shipping:shippings.value,
        description:descriptions.value,
        size:sizes.value,
        discount:discounts.value,
        quantity:quantitys.value
     })

    })
   .then((res)=>{
    return res.json()
   })
   .then((data)=>{
    console.log(data)
   })
   .catch((e)=>{
    console.log(e);
   })


}










// edit data with the help of put;
editb.addEventListener('click',(e)=>{
   e.preventDefault();
   putData();
})











async function fetchData() {
   const editId = JSON.parse(localStorage.getItem('forEdit'))?.id;
   if (editId) {
     const response = await fetch(`https://6421cc1c34d6cd4ebd7c224f.mockapi.io/Products/${editId}`);
     const data = await response.json();
     names.value = data.name;
     imgs1.value = data.image1;
     imgs2.value = data.image2;
     addates.value = data.addDate;
     categorys.value = data.category;
     descriptions.value = data.description;
     discounts.value = data.discount;
     genders.value = data.gender;
     quantitys.value = data.quantity;
     shippings.value = data.shipping;
     sizes.value = data.size;
     prices.value = data.price;
   }
 }
 
 // Define the function to update data in the API
 async function putData() {
   const edit = JSON.parse(localStorage.getItem('forEdit')) || {};
   const editId = edit.id;
   if (editId) {
     const newData = {
       name: names.value,
       image1: imgs1.value,
       image2: imgs2.value,
       addDate: addates.value,
       category: categorys.value,
       description: descriptions.value,
       discount: discounts.value,
       gender: genders.value,
       quantity: quantitys.value,
       shipping: shippings.value,
       size: sizes.value,
       price: prices.value
     };
     const response = await fetch(`https://6421cc1c34d6cd4ebd7c224f.mockapi.io/Products/${editId}`, {
       method: 'PUT',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(newData)
     });
     const data = await response.json();
     console.log(data); 
   }
 }
 
 // Call the fetchData and putData functions when the page is loaded
 window.addEventListener('load', () => {
   fetchData();
   putData();
 });










    

