// Inicializar carrito vacío si no existe en localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Verificar si es la primera vez que la página se carga en esta sesión
if (!sessionStorage.getItem("carritoInicializado")) {
    // Si es una nueva sesión, guardar el carrito actual en localStorage y marcar como inicializado
    localStorage.setItem("carrito", JSON.stringify(carrito));
    sessionStorage.setItem("carritoInicializado", "true");
}

// Función para actualizar el total y la cantidad de productos en el carrito en el HTML
function actualizarCarrito() {
    const total = carrito.reduce((acc, item) => acc + item.price, 0);
    document.getElementById("cart-count").textContent = carrito.length;
    document.getElementById("cart-total").textContent = total.toFixed(2);

    // Mostrar el carrito en la página "Carrito"
    const cartItemsContainer = document.getElementById("cart-items");
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = ""; // Limpiar antes de actualizar

        if (carrito.length === 0) {
            cartItemsContainer.innerHTML = "<p>No hay productos en tu carrito.</p>";
        } else {
            carrito.forEach(item => {
                const productElement = document.createElement("div");
                productElement.classList.add("cart-item");
                productElement.innerHTML = `
                    <h4>${item.name}</h4>
                    <p>Precio: $${item.price.toFixed(2)}</p>
                `;
                cartItemsContainer.appendChild(productElement);
            });
        }

        // Actualizar el total en la página "Carrito"
        document.getElementById("cart-total-page").textContent = total.toFixed(2);
    }
}

// Función para agregar un producto al carrito
function agregarAlCarrito(event) {
    const productElement = event.target.closest(".product");
    const productId = productElement.getAttribute("data-id");
    const productName = productElement.getAttribute("data-name");
    const productPrice = parseFloat(productElement.getAttribute("data-price"));

    // Agregar el producto al carrito
    carrito.push({ id: productId, name: productName, price: productPrice });
    localStorage.setItem("carrito", JSON.stringify(carrito)); // Guardar en localStorage
    actualizarCarrito();
}

// Asignar la función de agregar al carrito a cada botón en la página actual
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", agregarAlCarrito);
});

// Actualizar el carrito al cargar la página
actualizarCarrito();

