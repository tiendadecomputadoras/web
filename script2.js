document.addEventListener('DOMContentLoaded', function() {
    let cart = [];
    let total = 0;

    // Función para añadir al carrito
    function addToCart(product) {
        cart.push(product);
        total += product.price;
        updateCartDisplay();
    }

    // Función para actualizar la visualización del carrito
    function updateCartDisplay() {
        document.getElementById('cart-count').innerText = cart.length;
        document.getElementById('cart-total').innerText = total.toFixed(2);
    }

    // Añadir eventos de clic a los botones
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productDiv = this.parentElement;
            const product = {
                id: productDiv.getAttribute('data-id'),
                name: productDiv.getAttribute('data-name'),
                price: parseFloat(productDiv.getAttribute('data-price'))
            };
            addToCart(product);
        });
    });
});
