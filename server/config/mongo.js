const dotenv = require('dotenv');
const { ConnectionOptions } = require('mongoose');

dotenv.config({ path: '.env' });

const mongoOpts = {
    useNewUrlParser: true    
};

const mongoConfig = {
    url: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    configs: mongoOpts,
}

module.exports = mongoConfig;
