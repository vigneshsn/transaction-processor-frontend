import { Transaction } from "./Transaction";

export class TransactionStatementResult {
  duplicates: Transaction[];
  incorrectBalances: Transaction[];
}
