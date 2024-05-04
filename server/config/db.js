const mongoose = require('mongoose');

const config = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI;
        console.log(MONGO_URI);

        // Validate MONGO_URI
        if (!MONGO_URI) throw new mongoose.Error('Please provide MONGO_URI in .env file');

        await mongoose.connect(MONGO_URI);
        console.log(`⚡[server] Database connected successfully`);
    } catch (err) {
        console.error(`⚡[server] Database connection failed :: ${err}`);
        process.exit(1);
    }
};

module.exports = {
    config
};;