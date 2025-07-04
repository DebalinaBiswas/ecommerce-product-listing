const productList = document.getElementById("product-list");
let currentCategory = 'All'; // Tracks selected category

function displayProducts(items) {
  productList.innerHTML = ""; // Clear previous
  items.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
   card.innerHTML = `
  <a href="product.html?id=${product.id}" style="text-decoration: none; color: inherit;">
    <img loading="lazy" src="${product.image}" alt="${product.name}">

    <h3>${product.name}</h3>
    <p class="price">₹${product.price}</p>
    <p class="category">${product.category}</p>
  </a>
  <button onclick="addToCart(${product.id})" class="add-to-cart">Add to Cart</button>
`;

    productList.appendChild(card);
  });
}

// Show all products on page load
displayProducts(products);

// Filter by category
function filterProducts(category) {
  currentCategory = category; // Remember selected category

  let filtered = category === "All"
    ? products
    : products.filter(p => p.category === category);

  displayProducts(filtered);
}

// Filter by price range (with current category)
function applyPriceFilter() {
  const min = parseInt(document.getElementById("min-price").value) || 0;
  const max = parseInt(document.getElementById("max-price").value) || Infinity;

  let filtered = products.filter(p => {
    const inCategory = currentCategory === "All" || p.category === currentCategory;
    return inCategory && p.price >= min && p.price <= max;
  });

  displayProducts(filtered);
}
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = products.find(p => p.id === productId);
  
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  // ✅ Redirect to cart.html
  window.location.href = "cart.html";
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCount = document.getElementById("cart-count");
  if (cartCount) cartCount.textContent = count;
}

// Call this function when the page loads
updateCartCount();
