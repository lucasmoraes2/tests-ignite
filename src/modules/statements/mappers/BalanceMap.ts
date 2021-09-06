import { Statement } from "../entities/Statement";

export class BalanceMap {
  static toDTO({statements, balance}: { statements: Statement[], balance: number}) {
    const parsedStatement = statements.map(statement => {
      if (statement.type === "transfer") {
        return {
          id: statement.id,
          sender_id: statement.user_id,
          amount: Number(statement.amount),
          description: statement.description,
          type: statement.type,
          created_at: statement.created_at,
          updated_at: statement.updated_at
        }
      } else {
        return {
          id: statement.id,
          amount: Number(statement.amount),
          description: statement.description,
          type: statement.type,
          created_at: statement.created_at,
          updated_at: statement.updated_at
        }
      }
    });


    return {
      statement: parsedStatement,
      balance: Number(balance)
    }
  }
}
