// منتجات مع تصنيفات وعروض وميزات
const products = [
  {
    id: 1,
    name: 'موقع شركة احترافي',
    desc: 'تصميم وبرمجة موقع تعريفي احترافي للشركات مع لوحة تحكم سهلة.',
    price: 2400,
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    category: 'مواقع ويب',
    offer: true,
    new: false,
    stars: 5,
    details: 'الموقع يشمل صفحات رئيسية، معلومات عن الشركة، معرض صور، تواصل مباشر، وتحسين لمحركات البحث.'
  },
  {
    id: 2,
    name: 'متجر إلكتروني متكامل',
    desc: 'متجر إلكتروني عصري مع سلة وتسديد إلكتروني ودعم التوصيل.',
    price: 3900,
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
    category: 'متاجر إلكترونية',
    offer: false,
    new: true,
    stars: 4,
    details: 'يتضمن لوحة تحكم منتجات، إدارة الطلبات، كوبونات خصم، تقارير، وخيارات دفع إلكتروني متعددة.'
  },
  {
    id: 3,
    name: 'شعار وهوية بصرية',
    desc: 'تصميم شعار احترافي مع هوية بصرية متكاملة (ألوان، خطوط).',
    price: 950,
    img: 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=400&q=80',
    category: 'تصميم شعارات',
    offer: false,
    new: false,
    stars: 4,
    details: '3 نماذج أولية للشعار + تسليم ملفات مفتوحة + دليل استخدام الألوان والخطوط.'
  },
  {
    id: 4,
    name: 'استشارة تقنية',
    desc: 'جلسة استشارية (60 دقيقة) لتحليل مشروعك وتقديم حلول تقنية.',
    price: 350,
    img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    category: 'استشارات',
    offer: false,
    new: false,
    stars: 5,
    details: 'جلسة عبر Zoom أو Google Meet مع تقديم تقرير مكتوب عن التوصيات.'
  },
  {
    id: 5,
    name: 'تطوير تطبيق موبايل بسيط',
    desc: 'برمجة تطبيق موبايل (أندرويد/آيفون) لنشاطك التجاري.',
    price: 4800,
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
    category: 'تطبيقات موبايل',
    offer: true,
    new: true,
    stars: 5,
    details: 'يشمل واجهات عصرية + ربط قاعدة بيانات + نشر التطبيق على المتاجر الرسمية.'
  },
  {
    id: 6,
    name: 'منتج نفد الكمية',
    desc: 'هذا منتج للتجربة وهو غير متوفر حالياً.',
    price: 999,
    img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80',
    category: 'مواقع ويب',
    offer: false,
    new: false,
    stars: 3,
    details: 'عينة على منتج غير متوفر (زر الشراء معطل).',
    outofstock: true
  }
];

const categories = ['الكل', ...Array.from(new Set(products.map(p=>p.category)))];

// رسم أزرار التصنيف
if(document.getElementById('filterBtns')) {
  const btns = document.getElementById('filterBtns');
  btns.innerHTML = '';
  categories.forEach(cat=>{
    const btn = document.createElement('button');
    btn.textContent = cat;
    btn.onclick = ()=>filterProducts(cat);
    if(cat === 'الكل') btn.classList.add('active');
    btns.appendChild(btn);
  });
}

// رسم المنتجات
function filterProducts(cat) {
  document.querySelectorAll('.filter-btns button').forEach(btn=>btn.classList.remove('active'));
  document.querySelectorAll('.filter-btns button').forEach(btn=>{
    if(btn.textContent===cat) btn.classList.add('active');
  });
  drawProducts(cat==='الكل'? products : products.filter(p=>p.category===cat));
}
function drawProducts(arr) {
  const productsContainer = document.getElementById('products');
  productsContainer.innerHTML = '';
  arr.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <div style="margin-bottom:7px;">
        ${product.offer?'<span class="badge-offer">عرض خاص</span>':''}
        ${product.new?'<span class="badge-new">جديد</span>':''}
      </div>
      <h3>${product.name}</h3>
      <div class="stars">${'★'.repeat(product.stars)}${'☆'.repeat(5-product.stars)}</div>
      <p>${product.desc}</p>
      <div class="price">${product.price} جنيه</div>
      <div style="display:flex;gap:0.5rem;">
        <button onclick="showDetails(${product.id})" style="background:#fbc02d;color:#1a237e;">تفاصيل</button>
        ${product.outofstock?'<button disabled style="background:#aaa;color:#fff;">غير متوفر</button>':'<button onclick="addToCart('+product.id+')">أضف للسلة</button>'}
      </div>
    `;
    productsContainer.appendChild(card);
  });
}
if(document.getElementById('products')) drawProducts(products);

// تفاصيل المنتج (Modal)
function showDetails(id) {
  const p = products.find(x=>x.id===id);
  document.getElementById('modalDetails').innerHTML = `
    <img src="${p.img}" alt="${p.name}" style="width:100%;border-radius:8px;margin-bottom:1rem;">
    <h3>${p.name}</h3>
    <div class="stars" style="margin-bottom:4px;">${'★'.repeat(p.stars)}${'☆'.repeat(5-p.stars)}</div>
    <div style="margin-bottom:9px;">
      ${p.offer?'<span class="badge-offer">عرض خاص</span>':''}
      ${p.new?'<span class="badge-new">جديد</span>':''}
      ${p.outofstock?'<span style="background:#aaa;color:#fff;padding:2px 7px;border-radius:7px;">غير متوفر</span>':''}
    </div>
    <p>${p.details || p.desc}</p>
    <div class="price" style="font-size:1.2rem;">${p.price} جنيه</div>
  `;
  document.getElementById('modalBg').style.display = 'block';
}
if(document.getElementById('closeModal')) {
  document.getElementById('closeModal').onclick = ()=>{document.getElementById('modalBg').style.display='none';};
  document.getElementById('modalBg').onclick = e=>{
    if(e.target.id==='modalBg') document.getElementById('modalBg').style.display='none';
  };
}

// إدارة السلة
function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}
function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}
function addToCart(productId) {
  const product = products.find(p=>p.id===productId);
  if(product.outofstock) return;
  let cart = getCart();
  const found = cart.find(item => item.id === productId);
  if (found) {
    found.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  setCart(cart);
  alert('تمت إضافة المنتج للسلة!');
}

// رسم السلة في cart.html
if (document.getElementById('cart-items')) drawCart();
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
        <button onclick="updateQty(${item.id}, 1)">+</button>
        <button onclick="updateQty(${item.id}, -1)">-</button>
        <button onclick="removeFromCart(${item.id})">حذف</button>
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
if (document.getElementById('checkout-btn')) {
  document.getElementById('checkout-btn').onclick = function() {
    alert('تم إتمام الطلب (تجريبي). شكرًا لك!');
    setCart([]);
    drawCart();
  };
}

// زر الرجوع للأعلى
const scrollBtn = document.getElementById('scrollToTopBtn');
if(scrollBtn){
  window.onscroll = function() {
    if (window.scrollY > 300) {
      scrollBtn.style.display = 'block';
    } else {
      scrollBtn.style.display = 'none';
    }
  };
  scrollBtn.onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
}

// إرسال نموذج التواصل (بدون باك اند حقيقي)
const contactForm = document.getElementById('contact-form');
if(contactForm) {
  contactForm.onsubmit = function(e) {
    e.preventDefault();
    document.getElementById('contact-result').innerText = 'تم إرسال رسالتك بنجاح! سيتم التواصل معك قريبًا.';
    contactForm.reset();
  }
}
