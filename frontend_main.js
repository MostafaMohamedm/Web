const API_URL = 'http://localhost:3001/api';

// رسم المنتجات في صفحة shop.html
if (document.getElementById('products')) {
    fetch(`${API_URL}/products`)
        .then(res => res.json())
        .then(products => {
            const productsContainer = document.getElementById('products');
            products.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.innerHTML = `
                    <img src="${product.img}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.desc}</p>
                    <div class="price">${product.price} جنيه</div>
                    <button onclick="addToCart('${product._id}', '${product.name}', ${product.price}, '${product.img}')">أضف للسلة</button>
                `;
                productsContainer.appendChild(card);
            });
        });
}

// إدارة السلة باستخدام localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}
function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(id, name, price, img) {
    let cart = getCart();
    const found = cart.find(item => item.id === id);
    if (found) {
        found.qty += 1;
    } else {
        cart.push({ id, name, price, img, qty: 1 });
    }
    setCart(cart);
    alert('تمت إضافة المنتج للسلة!');
}

// رسم السلة في cart.html
if (document.getElementById('cart-items')) {
    drawCart();
}

function drawCart() {
    const cartContainer = document.getElementById('cart-items');
    let cart = getCart();
    cartContainer.innerHTML = '';
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>السلة فارغة.</p>';
        document.getElementById('cart-total').textContent = 'الإجمالي: 0 جنيه';
        return;
    }
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.qty;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="cart-info">
                <h3>${item.name}</h3>
                <p>السعر: ${item.price} جنيه</p>
                <p>الكمية: <span>${item.qty}</span></p>
            </div>
            <div class="cart-actions">
                <button onclick="updateQty('${item.id}', 1)">+</button>
                <button onclick="updateQty('${item.id}', -1)">-</button>
                <button onclick="removeFromCart('${item.id}')">حذف</button>
            </div>
        `;
        cartContainer.appendChild(itemDiv);
    });
    document.getElementById('cart-total').textContent = `الإجمالي: ${total} جنيه`;
}

function updateQty(productId, delta) {
    let cart = getCart();
    const idx = cart.findIndex(item => item.id === productId);
    if (idx > -1) {
        cart[idx].qty += delta;
        if (cart[idx].qty <= 0) cart.splice(idx, 1);
        setCart(cart);
        drawCart();
    }
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    setCart(cart);
    drawCart();
}

// إرسال الطلب عند الضغط على زر "إتمام الشراء"
if (document.getElementById('checkout-btn')) {
    document.getElementById('checkout-btn').onclick = function() {
        let cart = getCart();
        if (cart.length === 0) {
            alert('سلة التسوق فارغة!');
            return;
        }
        const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
        fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                items: cart,
                total
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert('تم إتمام الطلب بنجاح! رقم الطلب: ' + data.orderId);
                setCart([]);
                drawCart();
            } else {
                alert('حدث خطأ أثناء تنفيذ الطلب');
            }
        });
    };
}

// تفعيل إرسال نموذج التواصل مع الباك اند
if (document.getElementById('contact-form')) {
    document.getElementById('contact-form').onsubmit = function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        fetch(`${API_URL}/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message })
        })
        .then(res => res.json())
        .then(data => {
            alert(data.message);
            document.getElementById('contact-form').reset();
        });
    };
}