const mon = require("mongoose")

const adminSchema = mon.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mon.model('Admins', adminSchema)