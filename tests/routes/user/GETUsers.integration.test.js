import request from 'supertest'
import app from '../../../src/index'
import sinon from 'sinon'
import userActions from '../../../src/actions/user/user'

describe('GET /api/users', () => {
    beforeEach(() => {
        sinon.restore()
    })

    afterAll(() => {
        app.close()
    })

    test('should responds ok with the user list', async () => {
        sinon.stub(userActions, 'getUsers').returns(getMockUsers())
        const response = await request(app.callback()).get('/api/users')
        expect(response.status).toBe(200)
        expect(response.body).toEqual(getMockUsers())
    })
})

function getMockUsers () {
    return [
        {
            name: 'Diego',
            rol: '1111-1'
        },
        {
            name: 'Paola',
            rol: '2222-2'
        }
    ]
}
