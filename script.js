let cart = [];

// Add to cart function
function addToCart(productName, price) {
  let existing = cart.find(item => item.name === productName);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name: productName, price: price, quantity: 1 });
  }
  updateCartCount();
  renderCart();
}

// Update cart count
function updateCartCount() {
  let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").innerText = totalItems;
}

// Attach event to Add to Cart buttons
document.querySelectorAll(".product-card button").forEach((btn) => {
  btn.addEventListener("click", () => {
    let product = btn.parentElement;
    let name = product.querySelector("h3").innerText;
    let price = product.querySelector("p").innerText;
    addToCart(name, price);
  });
});

// Modal handling
const cartLink = document.getElementById("cart-link");
const cartModal = document.getElementById("cart-modal");
const closeBtn = document.querySelector(".close-btn");

cartLink.addEventListener("click", (e) => {
  e.preventDefault();
  renderCart();
  cartModal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  cartModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === cartModal) {
    cartModal.style.display = "none";
  }
});

function renderCart() {
  const cartItemsDiv = document.getElementById("cart-items");
  cartItemsDiv.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach((item, index) => {
      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <span>${item.name}</span>
        <div class="cart-actions">
          <button class="decrease-btn" data-index="${index}">-</button>
          <span>${item.quantity}</span>
          <button class="increase-btn" data-index="${index}">+</button>
          <button class="remove-btn" data-index="${index}">❌</button>
        </div>
        <span>₹${parseFloat(item.price.replace("₹", "")) * item.quantity}</span>
      `;
      cartItemsDiv.appendChild(div);

      total += parseFloat(item.price.replace("₹", "")) * item.quantity;
    });

    // Attach increase event
    document.querySelectorAll(".increase-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        let idx = btn.getAttribute("data-index");
        cart[idx].quantity += 1;
        updateCartCount();
        renderCart();
      });
    });

    // Attach decrease event
    document.querySelectorAll(".decrease-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        let idx = btn.getAttribute("data-index");
        if (cart[idx].quantity > 1) {
          cart[idx].quantity -= 1;
        } else {
          cart.splice(idx, 1);
        }
        updateCartCount();
        renderCart();
      });
    });

    // Attach remove event
    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        let idx = btn.getAttribute("data-index");
        cart.splice(idx, 1);
        updateCartCount();
        renderCart();
      });
    });
  }

  document.getElementById("cart-total").innerText = total;
}