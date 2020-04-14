/* eslint-disable class-methods-use-this */
/* eslint-disable func-names */
import Transaction from '../models/Transaction';

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface List {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): List {
    const incomes = this.transactions.filter(transaction =>
      transaction.type === 'income' ? transaction : null,
    );

    const outcomes = this.transactions.filter(transaction =>
      transaction.type === 'outcome' ? transaction : null,
    );

    const income = this.getBalance(incomes, 'income');
    const outcome = this.getBalance(outcomes, 'outcome');
    return {
      transactions: this.transactions,
      balance: {
        income,
        outcome,
        total: income - outcome,
      },
    };
  }

  public getBalance(tsc: Transaction[], type: string): number {
    if (type === 'income') {
      const incomeTotal = tsc.reduce(function (acc, value) {
        return acc + value.value;
      }, 0);
      return incomeTotal;
    }
    const outcomeTotal = tsc.reduce(function (acc, value) {
      return acc + value.value;
    }, 0);
    return outcomeTotal;
  }

  public create({ title, type, value }: CreateTransaction): Transaction {
    const transaction = new Transaction({
      title,
      type,
      value,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
