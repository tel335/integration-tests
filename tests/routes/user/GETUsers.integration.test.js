import request from 'supertest'
import { server, app } from '../../../src/index'
import sinon from 'sinon'
import userActions from '../../../src/actions/user/user'

/**
 * El objetivo de este test de integración es probar
 * el endpoint para listar todos los usuarios
 */
describe('GET /api/users', () => {
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

    test('should respond an empty array if there are no users', async () => {
        const response = await request(app.callback()).get('/api/users')
        expect(response.status).toBe(200)
        expect(response.body).toEqual([])
    })

    test('should respond an array with users if that data exists', async () => {
        /**
         * La función stub permite mockear la respuesta, en este caso,
         * de la función getUsers. Permite que esta función en efecto responda
         * con el arreglo:
         *  [
                {
                    name: 'Alfredo',
                    rol: '1111-1'
                },
                {
                    name: 'Susana',
                    rol: '2222-2'
                }
            ]
         */
        sinon.stub(userActions, 'getUsers').returns(getMockUsers())
        const response = await request(app.callback()).get('/api/users')
        expect(response.status).toBe(200)
        expect(response.body).toEqual(getMockUsers())
    })
})

function getMockUsers () {
    return [
        {
            name: 'Alfredo',
            rol: '1111-1'
        },
        {
            name: 'Susana',
            rol: '2222-2'
        }
    ]
}
