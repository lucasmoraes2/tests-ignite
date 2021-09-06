import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { IStatementsRepository } from "../../repositories/IStatementsRepository";
import { TransferOperationError } from "./TransferOperationError";

interface IRequest {
  sender_user_id: string;
  receiver_user_id: string;
  amount: number;
  description: string;
}

@injectable()
export class TransferOperationUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StatementsRepository')
    private statementsRepository: IStatementsRepository
  ) {}

  async execute({ sender_user_id, receiver_user_id, amount, description }: IRequest) {
    const sender_user = await this.usersRepository.findById(sender_user_id);

    if(!sender_user) {
      throw new TransferOperationError.SenderUserNotFound();
    }

    const receiver_user = await this.usersRepository.findById(receiver_user_id);

    if(!receiver_user) {
      throw new TransferOperationError.ReceiverUserNotFound();
    }

    const { balance } = await this.statementsRepository.getUserBalance({ user_id: sender_user_id });

    if (balance < amount) {
      throw new TransferOperationError.InsufficientFunds()
    }

    const statementOperation = await this.statementsRepository.transfer({
      sender_user_id,
      receiver_user_id,
      amount,
      description
    });

    return statementOperation;
  }
}
