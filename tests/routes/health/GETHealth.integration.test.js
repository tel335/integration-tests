import request from 'supertest'
import app from '../../../src/index'

describe('GET /health', () => {
    afterAll(() => {
        app.close()
    })

    test('responds ok', async () => {
        const response = await request(app.callback()).get('/health')
        expect(response.status).toBe(200)
        expect(response.body).toEqual({ message: 'ok' })
    })
})
