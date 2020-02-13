require("dotenv").config()
const User = require("./models/User")
const Admin = require("./models/Admin")
const mon = require("mongoose")
const jwt = require("jsonwebtoken")
const Datauri = require('datauri')
const datauri = new Datauri()
const mongoUrl = process.env.MONGO_URL + process.env.DB_NAME
const sha256 = require("sha256")

mon.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log("Connected to database")
})

exports.adminAuth = async (req, res) => {
    //console.log(req.body)
    try {
        let record = await Admin.findOne({ username: req.body.username, password: sha256(req.body.password) }), name
        if (record) {
            //console.log(record)
            name = record.name
            //console.log(record)
            record = JSON.stringify(record)
            record = JSON.parse(record)
            delete record["_id"]
            delete record["password"]
            delete record["name"]
            //console.log(record)
            let token = jwt.sign(record, process.env.JWT_SECRET)
            res.status(200).json({ token, name })
        } else {
            console.log(record)
            res.status(200).json({ message: "Invalid Credentials" })
            return
        }

    } catch (error) {
        res.status(404).json({ message: error })
        return
    }
}

exports.registerVoter = async (req, res) => {
    try {
        let image = req.files.image
        let base64 = datauri.format('.' + image.mimetype.split('/')[1], image.data)
        image = base64.content
        let userData = new User({
            fname: req.body.fname.toLowerCase(),
            lname: req.body.lname.toLowerCase(),
            sname: req.body.sname.toLowerCase(),
            dob: req.body.dob,
            gender: req.body.gender.toLowerCase(),
            houseAddress: req.body.houseAddress.toLowerCase(),
            district: req.body.district.toLowerCase(),
            state: req.body.state.toLowerCase(),
            image
        })
        let saved = await userData.save()
        res.status(200).json({ message: "Success", electoralId: saved['_id'] })
    } catch (er) {
        console.log(er)
        if (er) return res.status(400).json({ message: er })
    }
}

exports.findByName = async (req, res) => {
    try {
        let fname = `^${req.params.name.toLowerCase()}`
        let records = await User.find({ fname: {$regex: fname} })
        res.status(200).json({ data: records })
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

exports.findByDistrict = async (req, res) => {
    try {
        let district = `^${req.params.dist.toLowerCase()}`
        let records = await User.find({ district: {$regex: district} })
        res.status(200).json({ data: records })
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

exports.findById = async (req, res) => {
    try {
        let record = await User.findById( req.params.eid )
        //console.log(record)
        res.status(200).json({ data: record })
    } catch (error) {
        res.status(400).json({ message: error })
    }
}
