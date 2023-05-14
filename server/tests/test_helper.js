const mongoose = require('mongoose')
const UserInfo = require('../userDetails')


const initialUsers = [
    {
        'email': 'abc@abc.com',
        'password': 'abcd',
        'watchlist': ["bitcoin","ethereum"]
    },
    {
        'email': 'xyz@xyz.com',
        'password': 'xyz',
        'watchlist': ["bitcoin"]
    }
]

const usersInDb = async () => {
    const users = await UserInfo.find({})
    return users.map(user => user.toJSON())
}

module.exports = {initialUsers, usersInDb}