import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";

import { ICreateUserDTO } from "../createUser/ICreateUserDTO";

let inMemoryUsersRepository: InMemoryUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository);
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      email: "eje@lej.pg",
      name: "Henrietta Bass",
      password: "186577"
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: "eje@lej.pg",
      password: "186577"
    });

    expect(result).toHaveProperty("token");
  });
});
