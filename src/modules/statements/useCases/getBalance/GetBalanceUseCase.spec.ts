import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";

import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { GetBalanceUseCase } from "./GetBalanceUseCase";

import { ICreateUserDTO } from "../../../users/useCases/createUser/ICreateUserDTO";

let inMemoryStatementsRepository: InMemoryStatementsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let getBalanceUseCase: GetBalanceUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Get Balance", () => {

  beforeEach(() => {
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    getBalanceUseCase = new GetBalanceUseCase(inMemoryStatementsRepository, inMemoryUsersRepository);
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to get balance", async () => {
    const user: ICreateUserDTO = {
      email: "eje@lej.pg",
      name: "Henrietta Bass",
      password: "186577"
    };

    const newUser = await createUserUseCase.execute(user);

    const result = await getBalanceUseCase.execute({ user_id: newUser.id as string});

    expect(result).toHaveProperty("statement");
    expect(result).toHaveProperty("balance");
  });
});
