const mongoose = require('mongoose');
const cities = require('./seeds/cities');
const { places, descriptors } = require('./seeds/seedHelpers');
const Campground = require('./models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/2184453',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non massa lectus. Quisque sed ex eu neque luctus varius. Phasellus pulvinar, purus eget lobortis imperdiet, libero quam luctus leo, vitae commodo ex libero vel elit. Vestibulum commodo sem magna, non hendrerit diam sagittis sit amet.',
            price: Math.floor(Math.random() * 20) + 10
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});