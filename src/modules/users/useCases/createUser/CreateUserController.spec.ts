import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from 'typeorm';
import { v4 as uuidv4 } from "uuid";

import { app } from "../../../../app";
import databaseConnection from '../../../../database';

let connection: Connection;

describe("Create User Controller", () => {
  beforeAll(async () => {
    connection = await databaseConnection();
    await connection.runMigrations();

    // const id = uuidv4();
    // const password = await hash("admin", 8);

    // await connection.query(
    //   `INSERT INTO users(id, name, email, password, created_at, driver_license)
    //   VALUES ('${id}', 'admin', 'admin@rentx.com.br', '${password}', 'now()', 'XXXXXX')`
    // );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new user", async () => {
    // const responseToken = await request(app).post("/users").send({
    //   name: "admin",
    //   email: "admin@rentx.com.br",
    //   password: "admin",
    // });

    // const { refresh_token } = responseToken.body;

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
