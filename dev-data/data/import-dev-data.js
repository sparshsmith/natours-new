const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs')

const Tour = require('./../../models/tourModel')
const User = require('./../../models/userModel')
const Review = require('./../../models/reviewModel')

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    debug: true
}).then(con => {
    console.log("DB connection successful!!");
}).catch(err => {
    console.error("Error connecting to the database:", err);
});




const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const user = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));

const importData = async () => {
    try {
        console.log('importing data...')
        await Tour.create(tours);
        await User.create(user);
        await Review.create(reviews);
        console.log('Data succeffully loaded')

    } catch (error) {
        console.log(error)
    }
};

const deleteData = async () => {
    try {
        console.log('deleting data...')
        await Tour.deleteMany();
        await User.deleteMany();
        await Reviews.deleteMany();
        console.log('Data deleted ')
    } catch (error) {
        console.log(error)
    }
}

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData()
}

process.exit();