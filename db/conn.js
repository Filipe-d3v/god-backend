const mongoose = require('mongoose')

async function main() {
     
    await mongoose.connect(process.env.REACT_APP_CONN_DB)
    console.log('Connected to DB!')
}
main().catch(err => console.log(err))

module.exports = mongoose