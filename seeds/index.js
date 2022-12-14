require('dotenv').config();

const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
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
    for (let i = 0; i < 300; i++) {
        const price = Math.floor(Math.random() * 20) + 10;
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            // YOUR USER ID
            // author: '62ef37bf0087c4e73bdb82e7',
            author: '62f586ad04d1a74df2dcac82',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${randArr(descriptors)} ${randArr(places)}`,
<<<<<<< HEAD
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi a perspiciatis dignissimos eius vel nihil error consequatur, nemo repellat natus facere ducimus porro numquam iste voluptatem saepe illo nobis quam!',
=======
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex fugit, consectetur voluptatem nemo odit ipsa nulla alias debitis odio consequatur numquam modi harum impedit, soluta ipsum asperiores architecto. Non, animi.',
>>>>>>> 801ddf511fa866452d5f691ab99161342452dd98
            price: price,
            images:
                [
                    {
                        url: 'https://res.cloudinary.com/dkveh9x59/image/upload/v1660182974/YelpCamp/Camping_3-camping-Camping_0_a3crbq.jpg',
                        filename: 'YelpCamp/Camping_3-camping-Camping_0_a3crbq'
                    },
                    {
                        url: 'https://res.cloudinary.com/dkveh9x59/image/upload/v1660182974/YelpCamp/Camp-fire-smores_c6eure.jpg',
                        filename: 'YelpCamp/Camp-fire-smores_c6eure'
                    }
                ],
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            }
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})