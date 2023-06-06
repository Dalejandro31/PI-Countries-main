const request = require('supertest');
const app = require('../../src/routes/countriesRouter');

describe('Route Test', () => {
    it('GET /countries', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(2);
    });

    it('GET /activities', async () => {
        const response = await request(app).get('/activities');
        expect(response.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).ToBe(true);
    });
})