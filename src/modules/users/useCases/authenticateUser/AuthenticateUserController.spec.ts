import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from 'typeorm';
import { v4 as uuidv4 } from "uuid";

import { app } from "../../../../app";
import databaseConnection from '../../../../database';

let connection: Connection;

describe("Authenticate User Controller", () => {
  beforeAll(async () => {
    connection = await databaseConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to authenticate user", async () => {
    await request(app)
      .post("/api/v1/users")
      .send({
        name: "Randy Gonzalez",
        email: "RandyGonzalez@email.com",
        password: "859362"
      });

    const response = await request(app)
      .post("/api/v1/sessions")
      .send({
        email: "RandyGonzalez@email.com",
        password: "859362"
      });

    expect(response.body).toHaveProperty("token");
    expect(response.status).toBe(200);
  });
});
