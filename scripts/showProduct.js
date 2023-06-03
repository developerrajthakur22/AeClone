



let adminuser = document.getElementById("adminuser");
adminuser.textContent = `Hey ${localStorage.getItem("adminAuth")}`;

// fetch('https://6421cc1c34d6cd4ebd7c224f.mockapi.io/Products')
//   .then(response => response.json())
//   .then(data => {
//     let products = '';
    
//     data.forEach(product => {
//       let tim= convertD(product.date);
      
//       products += `
//         <tr>
//           <td>${product.name}</td>
//           <td><img src="${product.image1}" alt="Product Image" style="width: 100px; height: 100px;"></td>
//           <td><img src="${product.image2}" alt="Product Hover Image" style="width: 100px; height: 100px;"></td>
//           <td>${product.category}</td>
//           <td>${product.gender}</td>
//           <td>${product.price}</td>
//           <td>${tim}</td>
//           <td>${product.shipping}</td>
//           <td>${product.description}</td>
//           <td>${product.size}</td>
//           <td>${product.discount}</td>
//           <td>${product.quantity}</td>
//           <td><button class="edit-btn" data-id="${product.id}">Edit</button></td>
//           <td><button class="delete-btn" data-id="${product.id}">Delete</button></td>
//         </tr>`;
//     });
    
//     document.querySelector('#product_table').innerHTML = products;
    
//     // Add event listener to all delete buttons
//     const deleteBtns = document.querySelectorAll('.delete-btn');
//     deleteBtns.forEach(btn => {
//       btn.addEventListener('click', () => {
//         const productId = btn.getAttribute('data-id');
//         deleteProduct(productId);
//       });
//     });



//     // add event listener for all edit buttons

//     const editBtns = document.querySelectorAll('.edit-btn');
// editBtns.forEach(btn => {
//   btn.addEventListener('click', async () => {
//     const productId = btn.getAttribute('data-id');
//     const product = await fetchProduct(productId);
//     fillForm(product);
//   });
// });
//   });

// function convertD(v) {
//   let timeStamp = Date.parse(v);
//   let exactDate = new Date(timeStamp);
//   let dateString = exactDate.toDateString();
//   return dateString;
// }




// // function for deleteing the item 
// async function deleteProduct(productId) {
//   try {
//     const response = await fetch(`https://6421cc1c34d6cd4ebd7c224f.mockapi.io/Products/${productId}`, {
//       method: 'DELETE'
//     });
    
//     if (response.ok) {
//       alert('Product deleted successfully!');
//       location.reload(); // Refresh the page to reflect the updated product list
//     } else {
//       alert('Failed to delete product');
//     }
//   } catch (error) {
//     console.error('Error deleting product:', error);
//   }
// }



// // function for editing the  item
// async function fetchProduct(productId) {
//   try {
//     const response = await fetch(`https://6421cc1c34d6cd4ebd7c224f.mockapi.io/Products/${productId}`);
//     const product = await response.json();
//     return product;
//   } catch (error) {
//     console.error('Error fetching product:', error);
//   }
// }




// function fillForm(product) {
//     document.querySelector('#name').value = product.name;
//     document.querySelector('#image1').value = product.image1;
//     document.querySelector('#image2').value = product.image2;
//     document.querySelector('#select_category').value = product.category;
//     document.querySelector('#gender').value = product.gender;
//     document.querySelector('#price').value = product.price;
//     document.querySelector('#date').value = product.date;
//     document.querySelector('#shipping').value = product.shipping;
//     document.querySelector('#description').value = product.description;
//     document.querySelector('#select_size').value = product.size;
//     document.querySelector('#discount').value = product.discount;
//     document.querySelector('#quantity').value = product.quantity;
//   }
  
  






fetch('https://6421cc1c34d6cd4ebd7c224f.mockapi.io/Products')
  .then(response => response.json())
  .then(data => {
    const productsPerPage = 5;
    let currentPage = 1;
    
    const renderProducts = (page) => {
      const start = (page - 1) * productsPerPage;
      const end = start + productsPerPage;
      const products = data.slice(start, end);
      let productsHtml = '';
      
      products.forEach(product => {
        let tim= convertD(product.date);
        productsHtml += `
          <tr>
            <td>${product.name}</td>
            <td><img src="${product.image1}" alt="Product Image" style="width: 100px; height: 100px;"></td>
           
            <td>${product.category}</td>
            <td>${product.gender}</td>
            <td>${product.price}</td>
            <td>${tim}</td>
            <td>${product.shipping}</td>
            <td>${product.description}</td>
            <td>${product.size}</td>
            <td>${product.discount}</td>
            <td>${product.quantity}</td>
            <td><button class="edit-btn" data-id="${product.id}">Edit</button></td>
            <td><button class="delete-btn" data-id="${product.id}">Delete</button></td>
          </tr>`;
      });
      
      document.querySelector('#product_table').innerHTML = productsHtml;
      
      // Add event listener to all delete buttons
      const deleteBtns = document.querySelectorAll('.delete-btn');
      deleteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const productId = btn.getAttribute('data-id');
          deleteProduct(productId);
        });
      });
      
      // add event listener for all edit buttons
      const editBtns = document.querySelectorAll('.edit-btn');
      editBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
          const productId = btn.getAttribute('data-id');
          const product = await fetchProduct(productId);
          // fillForm(product);
          window.location.href='./adminProduct.html';
          window.location.replace('./adminProduct.html');
        });
      });
    }
    
    renderProducts(currentPage);
    
    // Add pagination
    const totalPages = Math.ceil(data.length / productsPerPage);
    const pagination = document.querySelector('#pagination');
    
    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement('button');
      pageBtn.innerText = i;
      pageBtn.classList.add('page-btn');
      
      if (i === currentPage) {
        pageBtn.classList.add('active');
      }
      
      pageBtn.addEventListener('click', () => {
        currentPage = i;
        renderProducts(currentPage);
        
        const activeBtn = document.querySelector('.page-btn.active');
        activeBtn.classList.remove('active');
        pageBtn.classList.add('active');
      });
      
      pagination.appendChild(pageBtn);
    }
  });

function convertD(v) {
  let timeStamp = Date.parse(v);
  let exactDate = new Date(timeStamp);
  let dateString = exactDate.toDateString();
  return dateString;
}

// function for deleting the item 
async function deleteProduct(productId) {
  try {
    const response = await fetch(`https://6421cc1c34d6cd4ebd7c224f.mockapi.io/Products/${productId}`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      alert('Product deleted successfully!');
      location.reload(); // Refresh the page to reflect the updated product list
           } else {
            alert('Failed to delete product');
          }
       } catch (error) {
          console.error('Error deleting product:', error);
       }
       }
  
  
      let edit=JSON.parse(localStorage.getItem('forEdit')) || [];

       async function fetchProduct(productId) {
           try {
             let response = await fetch(`https://6421cc1c34d6cd4ebd7c224f.mockapi.io/Products/${productId}`);
             let product = await response.json();
             edit=product
             localStorage.setItem('forEdit',JSON.stringify(edit))
             return product;
           } catch (error) {
             console.error('Error fetching product:', error);
           }
         }