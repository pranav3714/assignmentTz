const mon = require("mongoose")

const userSchema = mon.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    sname: {
        type: String,
        retured: true
    },
    dob: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    houseAddress: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    createdAt: {
        type: Number,
        default: Date.now
    },
    image: {
        type: String,
        required: true
    }
})

module.exports = mon.model('Users', userSchema)