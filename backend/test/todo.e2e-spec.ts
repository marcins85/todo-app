import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "../src/app.module";

describe('TodoController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        if (app) {
            await app.close();
        }
        // await repository.clear();
    });

    it('/todos (GET) powinno zwrócić listę zadań', async () => {
        const res = await request(app.getHttpServer())
            .get('/todos');

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('/todos (POST) powinno dodać zadanie', async () => {
        const res = await request(app.getHttpServer())
            .post('/todos')
            .send({ title: 'Testowe zadanie' });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.text).toBe('Testowe zadanie');
    });
});