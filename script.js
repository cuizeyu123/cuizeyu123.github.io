// script.js
let cart = [];
let totalPrice = 0;

function addToCart(item, price) {
    cart.push({item, price});
    totalPrice += price;
    updateCart();
}

function updateCart() {
    const cartElement = document.getElementById('cart');
    const totalElement = document.getElementById('total');
    cartElement.innerHTML = '';
    cart.forEach((cartItem, index) => {
        const li = document.createElement('li');
        li.textContent = `${cartItem.item} - ¥${cartItem.price}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = '移除';
        removeButton.onclick = () => removeFromCart(index);
        li.appendChild(removeButton);
        cartElement.appendChild(li);
    });
    totalElement.textContent = `总价: ¥${totalPrice}`;
}

function removeFromCart(index) {
    totalPrice -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}

function placeOrder() {
    if (cart.length === 0) {
        alert('购物车为空');
        return;
    }
    alert(`订单已下: 总价 ¥${totalPrice}`);
    cart = [];
    totalPrice = 0;
    updateCart();
}

document.getElementById('contact-form').addEventListener('submit', (event) => {
    event.preventDefault();
    alert('感谢您的留言，我们会尽快回复您。');
    event.target.reset();
});
