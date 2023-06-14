import request from 'supertest'
import { server, app } from '../../../src/index'
import sinon from 'sinon'
import userActions from '../../../src/actions/user/user'

/**
 * El objetivo de este test de integración es probar
 * el endpoint para agregar usuarios
 */
describe('PUT /api/users', () => {
    /**
     * beforeEach
     * afterEach
     * beforeAll
     * afterAll
     */
    beforeEach(() => {
        sinon.restore()
    })

    afterAll(() => {
        server.close()
    })

    test('should respond with status 400 if user is null or undefined', async () => {
        const response = await request(app.callback()).put('/api/user')
        expect(response.status).toBe(400)
        expect(response.body).toEqual({ message: 'User data is missing' })
    })

    test('should respond with OK message when user was created', async () => {
        const response = await request(app.callback()).put('/api/user').send(getMockUser())
        expect(response.status).toBe(200)
        expect(response.body).toEqual({ message: 'User was created' })
    })

    test('should put a user over the data structure when we call the endpoint', async () => {
        /**
         * Se agrega una función espía sobre removeUser. Lo que permite hacer
         * esto es entender qué le llega a la función como parámetros, si ha
         * sido llamada, etc
         */
        const addUserSpy = sinon.spy(userActions, 'addUser')
        await request(app.callback()).put('/api/user').send(getMockUser())
        
        /**
         * El espía valida si la función ha sido llamada alguna vez
         * Los argumentos siempre se ubican en [0][x], siendo x la posición 
         * del argumento, en este caso, el primer argumento de la función
         */
        expect(addUserSpy.called).toBe(true)
        expect(addUserSpy.args[0][0]).toEqual(getMockUser())
    })
})

function getMockUser () {
    return {
        name: 'Susana',
        rol: '2222-2'
    }
}
