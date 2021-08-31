import request from "supertest";
import { Connection } from 'typeorm';

import { app } from "../../../../app";
import databaseConnection from '../../../../database';

let connection: Connection;

describe("Get Balance Controller", () => {
  beforeAll(async () => {
    connection = await databaseConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to show user balance", async () => {
    await request(app)
      .post("/api/v1/users")
      .send({
        name: "Randy Gonzalez",
        email: "RandyGonzalez@email.com",
        password: "859362"
      });

    const authentication = await request(app)
      .post("/api/v1/sessions")
      .send({
        email: "RandyGonzalez@email.com",
        password: "859362"
      });

    const token = authentication.body.token;

    const response = await request(app)
      .get("/api/v1/statements/balance")
      .set('Authorization', 'Bearer ' + token);

    expect(response.status).toBe(200);
  });
});
