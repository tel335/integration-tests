import request from 'supertest'
import { server, app } from '../../../src/index'
import sinon from 'sinon'
import userActions from '../../../src/actions/user/user'

/**
 * El objetivo de este test de integración es probar
 * el endpoint para borrar usuarios
 */
describe('PUT /api/users', () => {
    /**
     * beforeEach
     * afterEach
     * beforeAll
     * afterAll
     */
    beforeEach(() => {
        /**
         * Antes de cada prueba generamos un entorno con los
         * datos limpios
         */
        sinon.restore()
        userActions.addUser(getMockUser1())
        userActions.addUser(getMockUser2())
        userActions.addUser(getMockUser3())
    })

    afterEach(() => {
        /**
         * Después de cada prueba borramos la lista para dejarla
         * limpia para la siguiente prueba
         */
        userActions.clearUsers()
    })

    afterAll(() => {
        // Cerramos el servidor
        server.close()
    })

    test('should respond with OK message when user was deleted', async () => {
        const response = await request(app.callback()).delete('/api/user/2222-2')
        expect(response.status).toBe(200)
        expect(response.body).toEqual({ message: 'User was removed' })
    })

    test('should remove a user over the data structure when we call the endpoint', async () => {
        /**
         * Se agrega una función espía sobre removeUser. Lo que permite hacer
         * esto es entender qué le llega a la función como parámetros, si ha
         * sido llamada, etc
         */
        const removeUserSpy = sinon.spy(userActions, 'removeUser')
        await request(app.callback()).delete('/api/user/3333-3') // Borro usuario
        const response = await request(app.callback()).get('/api/users') // Obtengo toda la lista

        /**
         * El espía valida si la función ha sido llamada alguna vez
         * Los argumentos siempre se ubican en [0][x], siendo x la posición 
         * del argumento, en este caso, el primer argumento de la función
         */
        expect(removeUserSpy.called).toBe(true)
        expect(removeUserSpy.args[0][0]).toEqual('3333-3')
        expect(response.body).toEqual([ getMockUser1(), getMockUser3() ])
    })
})

function getMockUser1 () {
    return {
        name: 'Susana',
        rol: '2222-2'
    }
}

function getMockUser2 () {
    return {
        name: 'Alfredo',
        rol: '3333-3'
    }
}

function getMockUser3 () {
    return {
        name: 'Javiera',
        rol: '4444-4'
    }
}
