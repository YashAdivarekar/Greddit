import express from "express";
import User from "../models/users.js";

const router = express.Router();

router.post('/profile', async (req, res) => {

    console.log("hvcjwehjbhkbkwj")
    try {
        const mail = req.body.data;
        // console.log(req.body)
        const user1 = await User.findOne({ email: mail })
        const { firstname, lastname, username, email, age, contact, password } = user1;

        console.log(user1)
        res.send({ user1: user1 });
    }
    catch (err) {
        console.error("error:", err);
        res.status(500).send({ errors: [{ msg: "Server Error" }] });
    }
})

router.post('/login', async (req, res) => {
    console.log("in here -> ", req.body, req.body.password, req.body.email)
    User.findOne({ email: req.body.email }, function (err, docs) {
        if (err) {
            console.log("error is", err)
            res.send(err)
        }
        else {
            console.log(docs)
            if (docs == null) {
                console.log('null')

                res.send(500, { error: err });
            }
            else {
                console.log('success back', docs.password)
                if (docs.password == req.body.password) {
                    console.log('suc')
                    res.send(docs)
                }
                else {
                    console.log('no')
                    res.send(500, { error: err });
                }
            }
        }
    })
    // const filter = {email: req.body.email , password: req.body.password};
    //         Statdata.findOneAndUpdate(filter, { newusers: temp}, {upsert: true}, function(err, doc) {
    //           if (err) return res.send(500, {error: err});
    //           return res.send('Succesfully saved.');
    //         });

})


export default router;