import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { TransferOperationUseCase } from './TransferOperationUseCase';

export class TransferOperationController {
  async execute(request: Request, response: Response) {
    const { id: sender_user_id } = request.user;
    const { receiver_user_id } = request.params;
    const { amount, description } = request.body;

    const transferOperation = container.resolve(TransferOperationUseCase);

    const statementOperation = await transferOperation.execute({
      sender_user_id,
      receiver_user_id,
      amount,
      description
    });

    return response.json(statementOperation);
  }
}
