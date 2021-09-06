import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";

import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { CreateStatementUseCase } from "./CreateStatementUseCase";

import { ICreateUserDTO } from "../../../users/useCases/createUser/ICreateUserDTO";
import { ICreateStatementDTO } from "./ICreateStatementDTO";

import { Statement } from "../../entities/Statement";

let inMemoryStatementsRepository: InMemoryStatementsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let createStatementUseCase: CreateStatementUseCase;
let createUserUseCase: CreateUserUseCase;

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  TRANSFER = 'transfer',
}

describe("Create Statement", () => {

  beforeEach(() => {
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createStatementUseCase = new CreateStatementUseCase(inMemoryUsersRepository, inMemoryStatementsRepository);
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to create a deposit", async () => {
    const user: ICreateUserDTO = {
      email: "eje@lej.pg",
      name: "Henrietta Bass",
      password: "186577"
    };

    const newUser = await createUserUseCase.execute(user);

    const statement: ICreateStatementDTO = {
      amount: 334721,
      description: "Statement Test",
      type: OperationType.DEPOSIT,
      user_id: newUser.id as string
    };

    const result = await createStatementUseCase.execute(statement);

    expect(result).toBeInstanceOf(Statement);
  });

  it("should be able to make a withdraw", async () => {
    const user: ICreateUserDTO = {
      email: "eje@lej.pg",
      name: "Henrietta Bass",
      password: "186577"
    };

    const newUser = await createUserUseCase.execute(user);

    const statementDeposit: ICreateStatementDTO = {
      amount: 30000,
      description: "Statement Test",
      type: OperationType.DEPOSIT,
      user_id: newUser.id as string
    };

    await createStatementUseCase.execute(statementDeposit);

    const statementWithdraw: ICreateStatementDTO = {
      amount: 20000,
      description: "Statement Test",
      type: OperationType.WITHDRAW,
      user_id: newUser.id as string
    };

    const result = await createStatementUseCase.execute(statementWithdraw);

    expect(result).toBeInstanceOf(Statement);
  });
});
