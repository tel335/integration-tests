import userActions from '../../../src/actions/user/user'

/**
 * El objetivo del test unitario es probar el comportamiento específico
 * de cada función en userActions
 */
describe('Test user actions', () => {
    beforeEach(() => {
        // Para que cada prueba quede limpia, borrar los usuarios
        userActions.clearUsers()
    })

    /**
     * Agregamos un nuevo usuario
     */
    test('should add new user', async () => {
        userActions.addUser(getMockUser1())
        const users = userActions.getUsers()
        
        expect(users.length).toBe(1)
        expect(users[0]).toEqual(getMockUser1())
    })

    /**
     * Agregamos dos nuevos usuarios
     */
    test('should add correctly 2 new users', async () => {
        userActions.addUser(getMockUser1())
        userActions.addUser(getMockUser2())

        const users = userActions.getUsers()
        
        expect(users.length).toBe(2)
        expect(users[0]).toEqual(getMockUser1())
        expect(users[1]).toEqual(getMockUser2())
    })

    /**
     * Borramos dos usuarios
     */
    test('should remove correctly 2 users', async () => {
        userActions.addUser(getMockUser1())
        userActions.addUser(getMockUser2())
        userActions.addUser(getMockUser3())

        userActions.removeUser('3333-3')
        userActions.removeUser('2222-2')

        const users = userActions.getUsers()
        
        expect(users.length).toBe(1)
        expect(users[0]).toEqual(getMockUser3())
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
