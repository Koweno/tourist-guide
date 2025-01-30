let cart = [];

function addToCart(item) {
    cart.push(item);
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartDetails = document.getElementById("cart-details");
    cartDetails.innerHTML = cart.map(item => `
        <div class="cart-item">
            <h3>${item.name}</h3>
            <p>Type: ${item.type}</p>
        </div>
    `).join("");
}

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-cart")) {
        const item = {
            name: event.target.dataset.name,
            type: event.target.dataset.type
        };
        addToCart(item);
    }
});