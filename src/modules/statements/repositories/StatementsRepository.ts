import { getRepository, Repository } from "typeorm";

import { OperationType, Statement } from "../entities/Statement";
import { ICreateStatementDTO } from "../useCases/createStatement/ICreateStatementDTO";
import { IGetBalanceDTO } from "../useCases/getBalance/IGetBalanceDTO";
import { IGetStatementOperationDTO } from "../useCases/getStatementOperation/IGetStatementOperationDTO";
import { ITransferOperationDTO } from "../useCases/transferOperation/ITransferOperationDTO";
import { IStatementsRepository } from "./IStatementsRepository";

export class StatementsRepository implements IStatementsRepository {
  private repository: Repository<Statement>;

  constructor() {
    this.repository = getRepository(Statement);
  }

  async create({
    user_id,
    amount,
    description,
    type
  }: ICreateStatementDTO): Promise<Statement> {
    const statement = this.repository.create({
      user_id,
      amount,
      description,
      type
    });

    return this.repository.save(statement);
  }

  async findStatementOperation({ statement_id, user_id }: IGetStatementOperationDTO): Promise<Statement | undefined> {
    return this.repository.findOne(statement_id, {
      where: { user_id }
    });
  }

  async getUserBalance({ user_id, with_statement = false }: IGetBalanceDTO):
    Promise<
      { balance: number } | { balance: number, statement: Statement[] }
    >
  {
    const statement = await this.repository.find({
      where: { user_id }
    });

    let balance = statement.reduce((acc, operation) => {
      if (operation.type === 'deposit') {
        return Number(acc) + Number(operation.amount);
      } else {
        return Number(acc) - Number(operation.amount);
      }
    }, 0)

    const transfersReceived = await this.repository.find({
      where: { receiver_id: user_id }
    });

    const totalValueOfTransfersReceived = transfersReceived.reduce((acc, operation) => {
      return acc + operation.amount;
    }, 0)

    balance = Number(balance) + Number(totalValueOfTransfersReceived);

    if (with_statement) {
      return {
        statement,
        balance
      }
    }

    return { balance }
  }

  async transfer({ sender_user_id, receiver_user_id, amount, description }: ITransferOperationDTO) {
    const statement = this.repository.create({
      user_id: sender_user_id,
      receiver_id: receiver_user_id,
      amount,
      description,
      type: OperationType.TRANSFER
    });

    return this.repository.save(statement);
  }
}
