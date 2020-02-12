require("dotenv").config()
const express = require("express")
const jwt = require("jsonwebtoken")
const app = express()
const mongo = require("./mongo")
const fu = require("express-fileupload")
const bp = require("body-parser")
const cors = require("cors")

app.use(cors())
app.use(bp.json())
app.use(fu({
    limits: { fileSize: 1000000 },
    abortOnLimit: true
  }))
app.use(express.static('public'))

//=======>Don't forget to bind this middlware to secure routes.<===========
const port = process.env.PORT || 4000
let authorizeJwt = (req, res, next) => {
    let auth = req.headers['authorization']
    if (auth) {
        let token = auth.split(" ")[1]
        if(token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if(err) return res.status(403).send({message: "Invalid Token"})
                req.user = user
                //console.log("Verfication Success!")
                next()
            })
        }
        else{
            res.sendStatus(401)
            return
        }
    } else {
        res.sendStatus(401)
        return
    }
}

app.post("/admin/login", (req, res) => {
    mongo.adminAuth(req, res)
})

app.post("/voter/add", authorizeJwt, (req, res) => {
    mongo.registerVoter(req, res)
})

app.get("/voter/search/name/:name", authorizeJwt, (req, res) => {
    //console.log(req.headers)
    mongo.findByName(req, res)
})

app.get("/voter/search/district/:dist", authorizeJwt, (req, res) => {
    //console.log(req.params)
    mongo.findByDistrict(req, res)
})

app.get("/voter/search/eid/:eid", authorizeJwt, (req, res) => {
    mongo.findById(req, res)
})

app.listen(port, () => {
    console.log("Running on 4000")
})
