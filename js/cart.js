let cart = JSON.parse(localStorage.getItem("cart")) || [];

// сохранить корзину
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// добавить товар
function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  alert("Товар добавлен в корзину!");
  renderCart();
}

// увеличить количество
function increaseQty(id) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty++;
    saveCart();
    renderCart();
  }
}

// уменьшить количество
function decreaseQty(id) {
  const item = cart.find(i => i.id === id);
  if (item) {
    if (item.qty > 1) {
      item.qty--;
    } else {
      cart = cart.filter(i => i.id !== id); // если 1 → удалить
    }
    saveCart();
    renderCart();
  }
}

// удалить товар
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
}

// отрисовать корзину
function renderCart() {
  const container = document.getElementById("cart-items");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = "<p>Корзина пуста</p>";
    document.getElementById("total").textContent = 0;
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-card">
      <div class="img"><img src="${item.img}" alt="${item.name}"></div>
      <div class="content">
        <h3 class="title">${item.name}</h3>
        <div class="price">${item.price} ₸</div>

        <div class="qty-control">
          <button class="btn" onclick="decreaseQty('${item.id}')">−</button>
          <span>${item.qty}</span>
          <button class="btn" onclick="increaseQty('${item.id}')">+</button>
        </div>

        <div class="subtotal">Итого: ${item.price * item.qty} ₸</div>
        <button class="btn danger" onclick="removeFromCart('${item.id}')">Удалить</button>
      </div>
    </div>
  `).join("");

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  document.getElementById("total").textContent = total;
}

// при загрузке
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const product = {
        id: btn.dataset.id,
        name: btn.dataset.name,
        price: Number(btn.dataset.price),
        img: btn.dataset.img
      };
      addToCart(product);
    });
  });

  renderCart();
});
