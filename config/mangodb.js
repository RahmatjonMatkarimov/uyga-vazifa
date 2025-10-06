const mongo = require("mongoose")

const connect = async () => {
    try {
        await mongo.connect(process.env.MONGO_URI).then(() => console.log("connect to db")).catch((err) => console.log(err))
    } catch (error) {
        console.log(error);
    }
}

module.exports = connect