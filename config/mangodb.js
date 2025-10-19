const mongo = require("mongoose");
const logger = require("../utils/logger");

const connect = async () => {
    try {
        await mongo.connect(process.env.MONGO_URI).then(() => logger.info("connect to db")).catch((err) => logger.error(err))
    } catch (error) {
        logger.error(error);
    }
}

module.exports = connect