import { Transaction } from './Transaction';

export class TransactionStatementResult {
    duplicates: Transaction[];
    incorrectBalance: Transaction[]
}