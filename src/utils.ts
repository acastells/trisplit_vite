import { Balance, Expense, Member } from "./vm/vm";

export function calculateBalancedTransactions(expenses: Expense[], allMembers: Member[]) {
	// Dict to monitor all expenses of every person
	const expenses_aux: Record<string, number> = {};

	allMembers.forEach((member) => {
		expenses_aux[member.name] = 0;
	});

	// Calculate total expenses for every person
	expenses.forEach((expense) => {
		const amount = expense.amount;
		const person = expense.whoPayed.name;
		expenses_aux[person] += amount;

		// Split the amount for the expense among the members
		const splitAmount = amount / expense.toWhomPayed.length;
		expense.toWhomPayed.forEach((member) => {
			expenses_aux[member.name] -= splitAmount;
		});
	});	
	
	// Find debtors and creditors
	const finalBalances = expenses_aux;
	const people = Object.keys(expenses_aux);
	const debtors: Record<string, number> = {};
	const creditors: Record<string, number> = {};

	people.forEach((person) => {
		const balance = finalBalances[person];

		if (balance < 0) {
			// person is debtor
			debtors[person] = balance;
		} else if (balance > 0) {
			// person is creditor
			creditors[person] = balance;
		}
	});

	// Calculate balanced transactions
	const balancedTransactions: Balance[] = [];

	const getMember = (memberName: string): Member => {
		return allMembers.find((member) => member.name === memberName) as Member;
	};

	while (Object.keys(debtors).length > 0 && Object.keys(creditors).length > 0) {
		const debtor = Object.keys(debtors).reduce((a, b) => (debtors[a] < debtors[b] ? a : b));
		const creditor = Object.keys(creditors).reduce((a, b) =>
			creditors[a] > creditors[b] ? a : b
		);
		const amountDebt = Math.abs(debtors[debtor]);
		const amountCreditor = Math.abs(creditors[creditor]);

		if (amountDebt < amountCreditor) {
			const transaction: Balance = {
				from: getMember(debtor) as Member,
				to: getMember(creditor) as Member,
				amount: amountDebt,
			};
			delete debtors[debtor];
			creditors[creditor] = amountCreditor - amountDebt;
			balancedTransactions.push(transaction);
		} else {
			const transaction: Balance = {
				from: getMember(debtor) as Member,
				to: getMember(creditor) as Member,
				amount: amountCreditor,
			};
			delete creditors[creditor];
			debtors[debtor] = amountDebt - amountCreditor;
			balancedTransactions.push(transaction);
		}
	}

	balancedTransactions.forEach((transaction) => {
		transaction.amount = Math.round(transaction.amount * 100) / 100;
	});

	return balancedTransactions;
}
