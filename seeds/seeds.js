const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedhelpers')
const Campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "Connection error:"));
db.once('open', () => {
  console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];
const price = Math.floor(Math.random() * 20) + 10;

const seedDB = async() => {
  await Campground.deleteMany({});
  for(let i = 0; i < 50; i++){
    const random500 = Math.floor(Math.random() * 500);
    const camp = new Campground({
      author: '60b70997996c88131181caee',
      location: `${cities[random500].city}, ${cities[random500].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      price,
      images:[
  {
    url: 'https://res.cloudinary.com/da2x7zkqw/image/upload/v1622931061/YelpCamp/qiyuarscewvb85zahhpo.png',
    filename: 'YelpCamp/qiyuarscewvb85zahhpo'
  },
  {
    url: 'https://res.cloudinary.com/da2x7zkqw/image/upload/v1622931064/YelpCamp/qw5coc4awm1htli9bfnv.png',
    filename: 'YelpCamp/qw5coc4awm1htli9bfnv'
  }
]

    });
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
});
