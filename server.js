const express = require('express')
const session = require('express-session')
const app = express()
const port = process.env.PORT || 3001

const cors = require('cors')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

app.use(session({
    secret:'keyboard cat',
    resave:true,
    saveUninitialized:false
}))
app.use(express.json())
app.use(cors())
app.use(passport.initialize())
app.use(passport.session())

const UserModel = require('./model/UserModel')

app.post('/register',(req,res,next)=>{
    let newUser = new UserModel(req.body)
    newUser.save()
    console.log('added user to database')
})

app.get('/get_user',(req,res,next)=>{
    UserModel.find((err,result)=>{
        res.send(result)
    })
})

app.post('/login',passport.authenticate('local'),(req,res,next)=>{
    console.log('login success')
    res.send(req.user)
})

passport.use(new LocalStrategy((username,password,done)=>{
    UserModel.findOne({username:username},(err,user)=>{
        if(!user){
            console.log('cannot find user')
            return done(err)
        }else{
            return done(null,user)
        }
    })
}))

passport.serializeUser((user,done)=>done(null,user.id))
passport.deserializeUser((id,done)=>{
    UserModel.findById(id,(err,user)=>{
        return done(null,user)
    })
})

app.listen(port,()=>console.log(`app is listen on port ${port}`))