const { JsonWebTokenError } = require('jsonwebtoken')
const mongoose = require('mongoose')
const supertest = require('supertest')
const UserInfo = require('../userDetails')
const helper = require('./test_helper')
const app = ('../app')
const api = supertest(app)

beforeEach(async () => {
    // await UserInfo.remove({})
    // await UserInfo.insertMany(helper.initialUsers)
})

describe('login', () => {
    test('login successfully', async() => {
        const user = {
            'email': 'test@test.com',
            'password': 'test',
        }
        await api
            .post('/login-user')
            .send(user)
            .expect(204)
    
        // const users = await helper.userInDb()
        // expect(users).toHaveLength(helper.initialUsers.length +1)

        const email = users.map(user => user.email)
        expect(email).toContain('test@test.com')
    })
})

// describe('adding a new user', () => {
//     test('valid user is addes successfully', async() => {
//         // const user = {
//         //     'email': 'test@test.com',
//         //     'password': 'test',
//         //     'watchlist': ['testbitcoin']
//         // }
//         await api
//             .get('/register')
//             .send(user)
//             .expect(201)
    
//         // const users = await helper.userInDb()
//         // expect(users).toHaveLength(helper.initialUsers.length +1)

//         const email = users.map(user => user.email)
//         expect(email).toContain('test@test.com')
//     })
// })
// describe("SERVER REACHABI0LITY TEST", () => {
//     test("GET /", async () => {
//       await request(app)
//         .get("/")
//         .expect(200)
//         // .end((err, res) => {
//         //   if (err) return done(err);
//         //   return done();
//         // });
        
//     },100000);
//     test("GET /wrongendpoint", async () => {
//       await request(app)
//         .get("/wrongendpoint")
//         .send()
//         .expect(404)
//         // .then((res) => {
//         //   done();
//         // })
//         // .catch(done);
       
//     },10000);
  
//   });
afterAll(() => {
    mongoose.connection.close()
})