// Script.js
let cart = JSON.parse(localStorage.getItem("cart"));
if(!cart){
  cart = {};
}

function cartCount(){
  let count = 0;
  for(prop in cart){
    if(cart[prop] == true){
      count++;
    }
  }
  document.querySelector("#cart-count").textContent = count;
}

cartCount();

window.addEventListener('DOMContentLoaded', () => {
  
  if(!localStorage.getItem("products")){
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
      localStorage.setItem("products", JSON.stringify(data));
      createCards(data);
    }
    );
  }
  else{
    let data = localStorage.getItem("products");
    data = JSON.parse(data);
    createCards(data);
  }
});

function createCards(data){
  let list = document.querySelector("#product-list");
  for(let i in data){
    let prodItem = document.createElement("product-item");
    let prod = data[i];
    prodItem.setAttribute("img", prod.image);
    prodItem.setAttribute("title", prod.title);
    prodItem.setAttribute("price", "$" + prod.price);
    prodItem.setAttribute("id", "prod" + prod.id);
    prodItem.setAttribute("incart", cart["prod" + prod.id]);    
    list.appendChild(prodItem);
  }
}

function addToCart(id){
  cart[id] = true;
  localStorage.setItem("cart", JSON.stringify(cart));
  let card = document.querySelector("#"+id);
  card.setAttribute("incart", "true");
  cartCount();
}

function removeFromCart(id){
  cart[id] = false;
  localStorage.setItem("cart", JSON.stringify(cart));
  let card = document.querySelector("#"+id);
  card.setAttribute("incart", "false");
  cartCount();
}