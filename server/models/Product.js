const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    default: 0
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Diabetic Care', 'Detox', 'Immunity', 'Wellness', 'Other']
  },
  image: {
    type: String,
    default: 'no-photo.jpg'
  },
  ingredients: {
    type: String,
    required: true
  },
  benefits: {
    type: String,
    required: true
  },
  badge: {
    type: String,
    default: ''
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  isComingSoon: {
    type: Boolean,
    default: false
  },
  nutrition: [
    {
      label: { type: String },
      value: { type: Number },
      unit:  { type: String },
      percent: { type: Number }   // % daily value, optional
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
