const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middlewares
app.use(express.json());
app.use(cors());

// اتصال بقاعدة البيانات
mongoose.connect('mongodb://localhost:27017/shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// موديل المنتجات
const ProductSchema = new mongoose.Schema({
  name: String,
  desc: String,
  price: Number,
  img: String
});
const Product = mongoose.model('Product', ProductSchema);

// موديل الطلبات
const OrderSchema = new mongoose.Schema({
  items: Array,
  total: Number,
  createdAt: { type: Date, default: Date.now }
});
const Order = mongoose.model('Order', OrderSchema);

// موديل رسائل التواصل
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', ContactSchema);

// API لعرض المنتجات
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// API لإضافة منتج (للاختبار - يمكنك حذفه في الإنتاج)
app.post('/api/products', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

// API لإنشاء طلب جديد
app.post('/api/orders', async (req, res) => {
  const { items, total } = req.body;
  const order = new Order({ items, total });
  await order.save();
  res.json({ success: true, orderId: order._id });
});

// API لاستقبال رسائل التواصل
app.post('/api/contact', async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.json({ success: true, message: "تم استلام رسالتك!" });
});

// تشغيل الخادم
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});