import request from "supertest";
import { Connection } from 'typeorm';

import { app } from "../../../../app";
import databaseConnection from '../../../../database';

let connection: Connection;

describe("Create User Controller", () => {
  beforeAll(async () => {
    connection = await databaseConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new user", async () => {
    const response = await request(app)
      .post("/api/v1/users")
      .send({
        name: "Randy Gonzalez",
        email: "RandyGonzalez@email.com",
        password: "859362"
      });

    expect(response.status).toBe(201);
  });
});
