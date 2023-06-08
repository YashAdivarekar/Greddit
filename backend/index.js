import express, { response } from "express";
import userRouter from "./routes/users.js";
import connectDB from "./utils/connectDB.js";
import cors from 'cors';
import User from "./models/users.js";
import Subgreddit from "./models/subgreddit.js"
import Post from "./models/posts.js";
import Report from "./models/report.js"
import Saved from "./models/saved.js"
import Comment from "./models/comments.js";


const app = express();
connectDB();
const PORT = 8000;
app.use(express.json())

app.use(cors());

app.use('/api/users', userRouter);

app.post('/api/signup', async (req, res) => {
    console.log(req.body)

    User.findOne({ email: req.body.email }, function (err, docs) {
        if (docs != null) {
            console.log('no')
            res.send(500, { error: err });
        }
        else {
            const { firstname, lastname, username, email, age, contact, password } = req.body
            const user = new User({ firstname, lastname, username, email, age, contact, password })
            try {
                user.save()
                console.log('done')
                res.send(user)
            }
            catch (err) {
                console.log(err)
                response.send(err)
            }
        }
    })



})

app.post('/api/edit', async (req, res) => {
    console.log(req.body)
    const { firstname, lastname, username, email, age, contact } = req.body
    User.updateOne({ email: email }, {
        firstname: firstname,
        lastname: lastname,
        username: username,
        age: age,
        contact: contact
    }, function (err, data) {
        if (err) { console.log(err) }
        else { console.log(data) }
    })
})



app.post('/api/newsubgrdform', async (req, res) => {
    const { name, description, tags, Bannedwords, modname, modmail, followers } = req.body;
    const user = new Subgreddit({ name, description, tags, Bannedwords, modname, modmail, followers });
    await user.save();
    // console.log("post request from /newsubgrdform");
    // console.log(user);
    res.send(user)
})

app.post('/api/getmysubgs', async (req, res) => {
    const data = req.body.data;
    console.log('here', data)
    Subgreddit.find({ modmail: data }, (err, docs) => {
        if (err) {
            res.send(err)
        }
        else {
            console.log(docs[0]);
            res.send(docs)
        }
    })
})

app.post("/api/deletesubg", async (req, res) => {
    // await Subgreddit.deleteOne({ _id: id })
    const id = req.body._id

    Comment.deleteMany({ postedinid: id }, (err, docs) => {
        if (err) {
            console.log(err)
        }
        else {

        }
    })
    Saved.deleteMany({ postedinid: id }, (err, docs) => {
        if (err) {
            console.log(err)
        }
        else {

        }
    })
    Report.deleteMany({ postedinid: id }, (err, docs) => {
        if (err) {
            console.log(err)
        }
        else {

        }
    })
    Post.deleteMany({ postedinid: id }, (err, docs) => {
        if (err) {
            console.log(err)
        }
        else {

        }
    })


    Subgreddit.deleteOne({ _id: id }, (err, docs) => {
        if (err) {
            res.send(err)
        }
        else {
            console.log(docs[0]);
            res.send(docs)
        }
    })
})

app.post("/api/usersunblockeddata", async (req, res) => {
    const id = req.body.id
    Subgreddit.findOne({ _id: id }, function (err, data) {
        if (err) {
            console.log(err)
        }
        else { res.send(data.unblocked) }
    })
})
app.post("/api/usersblockeddata", async (req, res) => {
    const id = req.body.id
    Subgreddit.findOne({ _id: id }, function (err, data) {
        if (err) {
            console.log(err)
        }
        else { res.send(data.left) }
    })
})


app.post("/api/getallsubg", async (req, res) => {
    Subgreddit.find((err, data) => {
        if (err) {
            res.send(err)
        }
        else {
            // console.log(data);
            res.send(data)
        }
    })
})

app.post("/api/getsubgdata", async (req, res) => {
    Subgreddit.find({ _id: req.body.id }, (err, data) => {
        if (err) {
            res.send(err)
        }
        else {
            // console.log(data);
            res.send(data)
        }
    })
})

app.post('/api/newpost', async (req, res) => {
    const { postername, postedby, postedin, postedinid, text, upvotes, downvotes } = req.body;
    const post = new Post({ postername, postedby, postedin, postedinid, text, upvotes, downvotes });
    await post.save();
    // console.log("post request from /newsubgrdform");
    console.log(post);
})

app.post("/api/getallposts", async (req, res) => {
    Post.find({ postedinid: req.body.id }, (err, data) => {
        if (err) {
            res.send(err)
        }
        else {
            // console.log(data);
            res.send(data)
        }
    })
})

app.post("/api/upvotes", async (req, res) => {
    Post.find({ _id: req.body.id }, (err, data) => {
        if (err) {
            res.send(err)
        }
        else {
            // console.log(data);
            let val = data[0].upvotes
            val = val + 1
            Post.updateOne({ _id: req.body.id }, { upvotes: val }, (error, datas) => {
                if (err) {
                    res.send(err)
                }
                else {
                    res.send(datas)
                }
            })
        }
    })
})

app.post("/api/downvotes", async (req, res) => {
    Post.find({ _id: req.body.id }, (err, data) => {
        if (err) {
            res.send(err)
        }
        else {
            // console.log(data);
            let val = data[0].downvotes
            val = val + 1
            Post.updateOne({ _id: req.body.id }, { downvotes: val }, (error, datas) => {
                if (err) {
                    res.send(err)
                }
                else {
                    res.send(datas)
                }
            })
        }
    })
})

app.post('/api/savecomment', async (req, res) => {
    const { postedby, postedbymail, postid, postedinid, text } = req.body;
    const post = new Comment({ postedby, postedbymail, postid, postedinid, text });
    await post.save();
    res.send([1])
    console.log(post);
})

app.post("/api/getallcomments", async (req, res) => {
    Comment.find({ postid: req.body.id }, (err, data) => {
        if (err) {
            res.send(err)
        }
        else {
            // console.log("Comments recieved",data);
            res.send(data)
        }
    })
})

app.post("/api/follow", async (req, res) => {
    const followermail = req.body.followermail
    const followingmail = req.body.followingmail
    User.find({ email: followermail }, (err, data) => {
        if (err) {
            // res.send(err)
        }
        else {
            console.log("Follower recieved", data);
            if ((data[0].following).includes(followingmail)) {

                console.log("reachedd1")
                return res.send([1])
            }
            else {
                console.log("testing...")
                User.updateOne({ email: followermail }, { $push: { following: followingmail } }, (err2, data2) => {
                    if (err2) {
                        console.log(err2)
                    }
                    else {
                        console.log("reachedd2")
                        User.updateOne({ email: followingmail }, { $push: { followers: followermail } }, (err3, data3) => {
                            if (err3) {
                                console.log(err3)
                            }
                            else {
                                console.log("reachedd21")

                                console.log("success")
                                return res.send([0])
                            }
                        })
                    }
                })



            }
            // return res.send(data)
        }
    })
})

app.post('/api/savepost', async (req, res) => {
    const { postername, postedby, postedin, postedinid, text, upvotes, downvotes, email, postid } = req.body;
    Saved.find({ email: email, postid: postid }, (err, data) => {
        if (data.length === 0) {
            const saved = new Saved({ postername, postedby, postedin, postedinid, text, upvotes, downvotes, email, postid });
            saved.save();
            // console.log(saved);
            res.send([1])
        }
        else {
            // console.log("res", data)
            res.send([0])
        }
    })
})

app.post("/api/getsavedposts", async (req, res) => {
    Saved.find({ email: req.body.email }, (err, data) => {
        if (err) {
            res.send(err)
        }
        else {
            // console.log("Comments recieved",data);
            res.send(data)
        }
    })
})

app.post("/api/deletesavedposts", async (req, res) => {
    // await Subgreddit.deleteOne({ _id: id })
    const id = req.body.postid
    const mail = req.body.email

    Saved.deleteOne({ email: mail, postid: id }, (err, docs) => {
        if (err) {
            res.send(err)
        }
        else {
            console.log(docs[0]);
            res.send([1])
        }
    })
})


app.post('/api/savereport', async (req, res) => {
    const { postid, subgname, description, reporter, reported, postedinid } = req.body;
    const report = new Report({ postid, subgname, description, reporter, reported, postedinid });
    await report.save()
    res.send([1])

})

app.post('/api/joinreq', async (req, res) => {
    const id = req.body.id
    const mail = req.body.email
    console.log("mail", mail)
    Subgreddit.findOne({ _id: id }, (err1, data1) => {
        if (data1.joinreq.includes(mail)) {
            res.send([2])
        }
        else {
            Subgreddit.updateOne({ _id: id }, { $push: { joinreq: mail } }, (err2, data2) => {
                if (err2) {
                    console.log(err2)
                    res.send([0])
                }
                else {
                    res.send([1])
                }
            })
        }
    })



})

app.post('/api/joinreqdata', async (req, res) => {
    const id = req.body.id
    Subgreddit.findOne({ _id: id }, (err1, data1) => {
        if (err1) {
            res.send(err1)
        }
        else {
            res.send(data1.joinreq)
        }
    })

})

app.post('/api/finduser', async (req, res) => {
    const usrmail = req.body.email
    console.log("mail", usrmail)
    User.findOne({ email: usrmail }, (err1, data1) => {
        if (err1) {
            res.send(err1)
        }
        else {
            console.log(data1)
            res.send(data1)
        }
    })

})

app.post('/api/acceptjoin', async (req, res) => {
    const usrmail = req.body.email
    const id = req.body.id
    console.log("mail", usrmail)
    console.log(usrmail)
    console.log("id=", id)

    const set = await Subgreddit.findOne({ _id: id })
    console.log("set=", set)
    const ind = set.joinreq.indexOf(usrmail)
    if (ind === -1) {
        return res.status(401).send()
    }
    else {
        set.unblocked.push(usrmail)
        set.joinreq.splice(ind, 1)
        await set.updateOne(set)
        console.log("done")
    }

})

app.post('/api/rejectjoin', async (req, res) => {
    const usrmail = req.body.email
    const id = req.body.id
    console.log("mail", usrmail)
    console.log(usrmail)
    console.log("id=", id)

    const set = await Subgreddit.findOne({ _id: id })
    console.log("set=", set)
    const ind = set.joinreq.indexOf(usrmail)
    if (ind === -1) {
        return res.status(401).send()
    }
    else {
        set.joinreq.splice(ind, 1)
        await set.updateOne(set)
        console.log("done")
    }

})

app.post("/api/getfollowers", async (req, res) => {
    User.find({ email:req.body.email }, (err, data) => {
        if (err) {
            res.send(err)
        }
        else {
            console.log("Comments recieved",data);
            res.send(data)
        }
    })
})

app.post("/api/getfollowing", async (req, res) => {
    User.find({ email:req.body.email }, (err, data) => {
        if (err) {
            res.send(err)
        }
        else {
            console.log("Comments recieved",data);
            res.send(data)
        }
    })
})

app.post("/api/deletefollowing", async (req, res) => {
    const usrmail = req.body.useremail
    const newmail = req.body.newmail
    console.log("mail", usrmail)
    console.log(usrmail)
    // console.log("id=", id)

    const set = await User.findOne({ email: usrmail })
    console.log("set=", set)
    const ind = set.following.indexOf(newmail)
    if (ind === -1) {
        return res.status(401).send()
    }
    else {
        console.log("set",set)
        set.following.splice(ind, 1)
        console.log("set",set)
        await set.updateOne(set)
        console.log("done")
    }
    const set1 = await User.findOne({ email: newmail })
    console.log("set1=", set1)
    const ind1 = set1.followers.indexOf(usrmail)
    if (ind1 === -1) {
        return res.status(401).send()
    }
    else {
        set1.followers.splice(ind1, 1)
        await set1.updateOne(set1)
        console.log("done")
    }
})



app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
