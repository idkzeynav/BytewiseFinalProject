
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import Chance from 'chance';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
const chance = new Chance();



const generateRandomImageUrl = () => {
    // Generate a random image URL with a random size and color
    const width = chance.integer({ min: 200, max: 800 });
    const height = chance.integer({ min: 200, max: 800 });
    return `https://picsum.photos/${width}/${height}`;
  };
  
  const seedProducts = async () => {
    try {
      await Product.deleteMany(); // Clear existing products
  
      const products = Array.from({ length: 20 }).map(() => ({
        name: chance.word({ syllables: 2 }),
        image: generateRandomImageUrl(), // Use the random image URL generator
        brand: chance.company(),
        quantity: chance.integer({ min: 1, max: 100 }),
        category: new mongoose.Types.ObjectId(), // Use 'new' to instantiate ObjectId
        description: chance.sentence(),
        reviews: Array.from({ length: 3 }).map(() => ({
          name: chance.name(),
          rating: chance.integer({ min: 1, max: 5 }),
          comment: chance.sentence(),
          user: new mongoose.Types.ObjectId(), // Use 'new' to instantiate ObjectId
        })),
        rating: chance.floating({ min: 0, max: 5, fixed: 1 }),
        numReviews: chance.integer({ min: 0, max: 100 }),
        price: chance.floating({ min: 1, max: 1000, fixed: 2 }),
        countInStock: chance.integer({ min: 0, max: 100 }),
      }));
  
      await Product.insertMany(products);
      console.log('Products seeded successfully');
    } catch (error) {
      console.error('Error seeding products:', error);
    }
  };
  
  const seedOrders = async () => {
    try {
      await Order.deleteMany(); // Clear existing orders
  
      const orders = Array.from({ length: 10 }).map(() => ({
        user: new mongoose.Types.ObjectId(), // Use 'new' to instantiate ObjectId
        orderItems: Array.from({ length: 3 }).map(() => ({
          name: chance.word({ syllables: 2 }),
          qty: chance.integer({ min: 1, max: 5 }),
          image: generateRandomImageUrl(), // Use the random image URL generator
          price: chance.floating({ min: 1, max: 1000, fixed: 2 }),
          product: new mongoose.Types.ObjectId(), // Use 'new' to instantiate ObjectId
        })),
        shippingAddress: {
          address: chance.address(),
          city: chance.city(),
          postalCode: chance.zip(),
          country: chance.country(),
        },
        paymentMethod: chance.pickone(['PayPal', 'Credit Card', 'Debit Card']),
        paymentResult: {
          id: chance.string(),
          status: chance.word(),
          update_time: chance.date().toISOString(),
          email_address: chance.email(),
        },
        itemsPrice: chance.floating({ min: 10, max: 1000, fixed: 2 }),
        taxPrice: chance.floating({ min: 1, max: 100, fixed: 2 }),
        shippingPrice: chance.floating({ min: 5, max: 50, fixed: 2 }),
        totalPrice: chance.floating({ min: 20, max: 1500, fixed: 2 }),
        isPaid: chance.bool(),
        paidAt: chance.bool() ? chance.date() : null,
        isDelivered: chance.bool(),
        deliveredAt: chance.bool() ? chance.date() : null,
      }));
  
      await Order.insertMany(orders);
      console.log('Orders seeded successfully');
    } catch (error) {
      console.error('Error seeding orders:', error);
    }
  };
  
  const seedDatabase = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('Database connected successfully');
  
      await seedProducts();
      await seedOrders();
      
      console.log('Database seeding completed');
      mongoose.connection.close();
    } catch (error) {
      console.error('Error seeding database:', error);
    }
  };
  
  seedDatabase();
