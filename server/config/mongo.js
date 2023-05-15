const dotenv = require('dotenv');
const { ConnectionOptions } = require('mongoose');
//const yenv = require('yenv')

//let env = yenv('env.yml')

 dotenv.config({ path: '.env' });

const mongoOpts = {
    useNewUrlParser: true    
};

const mongoConfig = {
    //url: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
     //url: `mongodb://${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`,
    //url: `mongodb://mongo/${process.env.DB_NAME}`,
    url: `mongodb://mongo/${env.DB_NAME}`,
    configs: mongoOpts,
}

module.exports = mongoConfig;
