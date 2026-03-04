// Cart state
let cart = {};
let allProducts = [];

// Load products data and populate cards
async function loadProducts() {
  try {
    const response = await fetch('./data/products.json');
    const data = await response.json();
    allProducts = data.products;
    populateProductCards(data.products);
    populateFriesCards(data.products);
    populateDrinksCards(data.products);
  } catch (error) {
    console.error('Error loading products:', error);
  }
}

// Populate burger product card data from JSON
function populateProductCards(products) {
  const burgerProducts = products.filter(p => p.type === 'burgers');
  const cards = document.querySelectorAll('.product-card');
  
  cards.forEach((card, index) => {
    if (index < burgerProducts.length) {
      const product = burgerProducts[index];
      
      // Update image
      const img = card.querySelector('.product-image');
      img.src = product.image;
      img.alt = product.name;
      
      // Update button data attribute
      const button = card.querySelector('.add-to-cart-btn');
      button.setAttribute('onclick', `addToCart(${product.id})`);
      
      // Update product name
      const name = card.querySelector('.product-name');
      name.textContent = product.name;
      
      // Update product description
      const description = card.querySelector('.product-description');
      description.textContent = product.description;
      
      // Update product price
      const price = card.querySelector('.product-price');
      price.textContent = `${product.currency} ${product.price}`;
    }
  });
}

// Populate fries product card data from JSON
function populateFriesCards(products) {
  const friesProducts = products.filter(p => p.type === 'fries');
  const cards = document.querySelectorAll('.product-card-fries');
  
  cards.forEach((card, index) => {
    if (index < friesProducts.length) {
      const product = friesProducts[index];
      
      // Update image
      const img = card.querySelector('.product-image-fries');
      img.src = product.image;
      img.alt = product.name;
      
      // Update button data attribute
      const button = card.querySelector('.add-to-cart-btn-fries');
      button.setAttribute('onclick', `addToCart(${product.id})`);
      
      // Update product name
      const name = card.querySelector('.product-name-fries');
      name.textContent = product.name;
      
      // Update product description
      const description = card.querySelector('.product-description-fries');
      description.textContent = product.description;
      
      // Update product price
      const price = card.querySelector('.product-price-fries');
      price.textContent = `${product.currency} ${product.price}`;
    }
  });
}

// Populate cold drinks product card data from JSON
function populateDrinksCards(products) {
  const drinksProducts = products.filter(p => p.type === 'drinks');
  const cards = document.querySelectorAll('.product-card-drinks');
  
  cards.forEach((card, index) => {
    if (index < drinksProducts.length) {
      const product = drinksProducts[index];
      
      // Update image
      const img = card.querySelector('.product-image-drinks');
      img.src = product.image;
      img.alt = product.name;
      
      // Update button data attribute
      const button = card.querySelector('.add-to-cart-btn-drinks');
      button.setAttribute('onclick', `addToCart(${product.id})`);
      
      // Update product name
      const name = card.querySelector('.product-name-drinks');
      name.textContent = product.name;
      
      // Update product description
      const description = card.querySelector('.product-description-drinks');
      description.textContent = product.description;
      
      // Update product price
      const price = card.querySelector('.product-price-drinks');
      price.textContent = `${product.currency} ${product.price}`;
    }
  });
}

// Add to cart functionality
function addToCart(productId) {
  const product = allProducts.find(p => p.id === productId);
  
  if (!product) {
    console.error('Product not found');
    return;
  }

  if (cart[productId]) {
    cart[productId].quantity += 1;
  } else {
    cart[productId] = {
      ...product,
      quantity: 1
    };
  }

  updateCartDisplay();
  openCart();
}

// Update cart display
function updateCartDisplay() {
  const cartItemsList = document.getElementById('cartItemsList');
  
  if (Object.keys(cart).length === 0) {
    cartItemsList.innerHTML = '<p class="text-gray-500 text-center py-8">Your cart is empty</p>';
  } else {
    cartItemsList.innerHTML = Object.entries(cart).map(([productId, item]) => `
      <div class="flex items-center gap-4 bg-gray-100 p-4 rounded-lg">
        <img src="${item.image}" alt="${item.name}" class="w-14 h-14 rounded-full object-cover flex-shrink-0" />
        <div class="flex-1">
          <h4 class="font-bold text-gray-900">${item.name}</h4>
        </div>
        <div class="flex items-center gap-2 flex-shrink-0">
          <button onclick="decreaseQuantity(${productId})" class="w-8 h-8 bg-gray-400 rounded flex items-center justify-center hover:bg-gray-500 transition text-white font-bold">
            −
          </button>
          <input type="number" value="${item.quantity}" readonly class="w-10 h-8 text-center font-bold border border-gray-300 rounded" />
          <button onclick="increaseQuantity(${productId})" class="w-8 h-8 bg-gray-400 rounded flex items-center justify-center hover:bg-gray-500 transition text-white font-bold">
            +
          </button>
        </div>
      </div>
    `).join('');
  }

  calculateTotals();
}

// Increase quantity
function increaseQuantity(productId) {
  if (cart[productId]) {
    cart[productId].quantity += 1;
    updateCartDisplay();
  }
}

// Decrease quantity
function decreaseQuantity(productId) {
  if (cart[productId]) {
    if (cart[productId].quantity > 1) {
      cart[productId].quantity -= 1;
    } else {
      delete cart[productId];
    }
    updateCartDisplay();
  }
}

// Calculate totals
function calculateTotals() {
  const total = Object.values(cart).reduce((sum, item) => {
    return sum + (parseFloat(item.price) * item.quantity);
  }, 0);
  document.getElementById('totalPrice').textContent = `£${total.toFixed(2)}`;
}

// Open cart
function openCart() {
  document.getElementById('cartModal').classList.remove('hidden');
}

// Close cart
function closeCart() {
  document.getElementById('cartModal').classList.add('hidden');
}

// Proceed to checkout
function proceedCheckout() {
  if (Object.keys(cart).length === 0) {
    alert('Your cart is empty');
    return;
  }
  console.log('Proceeding to checkout with:', cart);
  alert('Proceeding to checkout!');
}

// Load products when page loads
document.addEventListener('DOMContentLoaded', loadProducts);
