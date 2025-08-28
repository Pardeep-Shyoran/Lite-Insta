require('dotenv').config()
const app = require('./src/App')
const connectDB = require('./src/db/db')


connectDB();

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})