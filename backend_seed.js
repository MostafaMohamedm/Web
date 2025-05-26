const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Product = mongoose.model('Product', {
  name: String,
  desc: String,
  price: Number,
  img: String
});

const products = [
  {
    name: "تصميم صفحة هبوط",
    desc: "صفحة هبوط احترافية قابلة للتخصيص لتسويق منتجك أو خدمتك.",
    price: 800,
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "متجر إلكتروني صغير",
    desc: "متجر إلكتروني بسيط لإطلاق مشروعك التجاري بسرعة.",
    price: 1900,
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "تصميم شعار احترافي",
    desc: "شعار مميز يعبر عن هوية مشروعك.",
    price: 500,
    img: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "دعم فني لمدة شهر",
    desc: "دعم فني شامل لأي تعديل أو مشكلة.",
    price: 300,
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
  }
];

Product.insertMany(products).then(() => {
  console.log("Products added!");
  mongoose.disconnect();
});