const cookieParser = require('cookie-parser')
const express = require('express')
const authRoutes = require('./routes/auth.routes')
const postRoutes = require('./routes/post.routes')


const App = express()


App.use(express.json())
App.use(cookieParser())
App.use('/api/auth', authRoutes)
App.use('/api/posts', postRoutes)



module.exports = App