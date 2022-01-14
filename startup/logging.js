const winston = require('winston');
const config = require('config');

module.exports = function () {
    winston.add(winston.transports.File, { filename: './logs/logfile.log' });

    winston.handleExceptions(
        new winston.transports.File({ filename: './logs/unCaughtExceptions.log' })
    );

    process.on('unhandledRejection', (ex) => {
        throw new Error(ex);
    });
    
    if (!config.get('private')) {
        winston.info('Private key not defined');
        console.log('private key not defined..');
        process.exit(1);
    }

}