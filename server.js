const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// الاتصال بقاعدة البيانات
mongoose.connect('mongodb://localhost:27017/shop', { useNewUrlParser: true, useUnifiedTopology: true });

// نموذج المنتج
const Product = mongoose.model('Product', {
    name: String,
    desc: String,
    price: Number,
    img: String
});

// جلب كل المنتجات
app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// إضافة منتج جديد
app.post('/api/products', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
});

// حذف منتج
app.delete('/api/products/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

// استقبال رسالة تواصل
app.post('/api/contact', (req, res) => {
    // هنا يمكنك تخزين الرسالة أو إرسالها لبريدك...
    res.json({ success: true, message: 'تم استلام رسالتك!' });
});

app.listen(3001, () => console.log('Backend running on http://localhost:3001'));
