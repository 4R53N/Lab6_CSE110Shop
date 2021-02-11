// product-item.js

class ProductItem extends HTMLElement {
  render() {
    const imgUrl = this.getAttribute('img');
    const titleText = this.getAttribute('title');
    const priceText = this.getAttribute('price');
    const incart = this.getAttribute('incart');
    const id = this.getAttribute('id');
    this.innerHTML = `
    <style> 
    .price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }
    </style>
    <li class="product">
      <img src="${imgUrl}" alt="${titleText}" width=200>
      <p class="title">${titleText}</p>
      <p class="price">${priceText}</p>
      ${incart == "false" || incart == "undefined"  ?
      `<button onclick=addToCart('${id}')>Add to Cart</button>`:
      `<button onclick=removeFromCart('${id}')>Remove from Cart</button>`
    }
      
    </li>
    
    `
  }

  connectedCallback() { // (2)
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
  }

  static get observedAttributes() { // (3)
    return ['img', 'title', 'price', 'incart'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  

  

}

customElements.define('product-item', ProductItem);