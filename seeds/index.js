const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

const randArr = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const price = Math.floor(Math.random() * 20) + 10;
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            author: '62ef37bf0087c4e73bdb82e7',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${randArr(descriptors)} ${randArr(places)}`,
            description: 'blabblablablabalbalahs',
            price: price,
            images:
                [
                    {
                        url: 'https://res.cloudinary.com/dkveh9x59/image/upload/v1659986648/YelpCamp/i1zfoolpketbjql9lpnq.png',
                        filename: 'YelpCamp/i1zfoolpketbjql9lpnq',
                    },
                    {
                        url: 'https://res.cloudinary.com/dkveh9x59/image/upload/v1659986647/YelpCamp/g6cbbav2nv9324grhjfj.png',
                        filename: 'YelpCamp/g6cbbav2nv9324grhjfj',
                    }
                ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})