const dotenv = require('dotenv');
const mongoose = require('mongoose');


process.on('uncaughtException', err => {
    console.log("Uncaught Exception found. Shutting down....");
    console.log(err.name, err.message);
    process.exit(1);
})


dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(con => console.log("DB connection successfull!!")
);


const app = require('./app');

console.log(process.env.PORT)
const port = process.env.PORT;
const server = app.listen(port || 3000, () => {
    console.log(`App is running on port ${port}....`);
});

process.on('unhandledRejection', err => {
    console.log("Unhandled rejection found. Shutting down....");
    console.log(err);
    server.close(() => {
        process.exit(1);
    })
})
