// Cart functionality
const cart = [];

// Function to add product to cart
function addToCart(productName, price) {
    const product = {
        name: productName,
        price: price,
        quantity: 1,
    };

    // Check if product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.name === productName);
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1; // Increment quantity
    } else {
        cart.push(product); // Add new product to cart
    }

    updateCartInLocalStorage();
    alert(`${productName} has been added to your cart!`);
}

// Function to update cart in localStorage
function updateCartInLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to load cart from localStorage
function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart.push(...JSON.parse(storedCart));
    }
}

// Function to display cart items
function displayCart() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: $${item.price.toFixed(2)}</p>
            <p>Quantity: ${item.quantity}</p>
        `;
        cartContainer.appendChild(itemElement);
    });

    const totalElement = document.createElement('div');
    totalElement.className = 'cart-total';
    totalElement.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
    cartContainer.appendChild(totalElement);
}

// Event listener for the DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromLocalStorage();
    displayCart();
});

// Expose addToCart function to global scope for button clicks
window.addToCart = addToCart;
