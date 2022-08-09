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
            // YOUR USER ID
            author: '62ef37bf0087c4e73bdb82e7',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${randArr(descriptors)} ${randArr(places)}`,
            description: 'blabblablablabalbalahs',
            price: price,
            images:
                [
                    {
                        url: 'https://res.cloudinary.com/dkveh9x59/image/upload/v1660072766/YelpCamp/uivnuhnegg4d35haznzg.jpg',
                        filename: 'YelpCamp/uivnuhnegg4d35haznzg'
                    },
                    {
                        url: 'https://res.cloudinary.com/dkveh9x59/image/upload/v1660072914/YelpCamp/f1mzkseruflxtdud41ma.jpg',
                        filename: 'YelpCamp/f1mzkseruflxtdud41ma'
                    }
                ],
            geometry: {
                type: 'Point', coordinates: [-122.330062, 47.603832]
            }
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})