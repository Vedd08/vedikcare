const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const products = [
  {
    name: 'Diabetic Protein Powder',
    price: 599,
    category: 'Diabetic Care',
    description: 'Ayurvedic plant protein enriched with Jamun Seed, Karela, Vijaysar & Gudmar to support healthy blood sugar levels and daily strength.',
    image: '/image/chocolate_diabetic_protein.png',
    badge: 'Coming Soon',
    ingredients: 'Pea Protein, Jamun Seed, Karela, Vijaysar, Gudmar, Cinnamon, Stevia',
    benefits: 'Controls glucose spikes, builds strength, 100% plant-based, zero added sugar.',
    stock: 50,
    isComingSoon: true,
    nutrition: [
      { label: 'Serving Size',    value: 30,   unit: 'g',   percent: null },
      { label: 'Calories',        value: 112,  unit: 'kcal',percent: null },
      { label: 'Protein',         value: 20,   unit: 'g',   percent: 40  },
      { label: 'Total Carbs',     value: 6,    unit: 'g',   percent: 2   },
      { label: 'Dietary Fibre',   value: 1.5,  unit: 'g',   percent: 5   },
      { label: 'Total Fat',       value: 2,    unit: 'g',   percent: 3   },
      { label: 'Saturated Fat',   value: 0.4,  unit: 'g',   percent: 2   },
      { label: 'Sodium',          value: 85,   unit: 'mg',  percent: 4   },
      { label: 'Calcium',         value: 120,  unit: 'mg',  percent: 12  },
      { label: 'Iron',            value: 2.8,  unit: 'mg',  percent: 16  },
      { label: 'Vitamin B12',     value: 1.2,  unit: 'mcg', percent: 50  },
      { label: 'Magnesium',       value: 45,   unit: 'mg',  percent: 11  },
      { label: 'Potassium',       value: 280,  unit: 'mg',  percent: 6   },
      { label: 'Added Sugars',    value: 0,    unit: 'g',   percent: 0   },
    ]
  }
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
