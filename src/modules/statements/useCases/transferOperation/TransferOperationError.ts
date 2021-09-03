import { AppError } from "../../../../shared/errors/AppError";

export namespace TransferOperationError {
  export class SenderUserNotFound extends AppError {
    constructor() {
      super('Sender user not found', 404);
    }
  }

  export class ReceiverUserNotFound extends AppError {
    constructor() {
      super('Receiver user not found', 404);
    }
  }

  export class StatementNotFound extends AppError {
    constructor() {
      super('Statement not found', 404);
    }
  }
}
