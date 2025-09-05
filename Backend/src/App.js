const cookieParser = require('cookie-parser')
const express = require('express')
const authRoutes = require('./routes/auth.routes')
const postRoutes = require('./routes/post.routes')
<<<<<<< HEAD
=======
const cors = require('cors')
>>>>>>> affe6b7 (project added)


const App = express()

<<<<<<< HEAD

=======
App.use(cors());
>>>>>>> affe6b7 (project added)
App.use(express.json())
App.use(cookieParser())
App.use('/api/auth', authRoutes)
App.use('/api/posts', postRoutes)



module.exports = App