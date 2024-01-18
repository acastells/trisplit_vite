export interface Trisplit {
	id: number,
	name: string,
	description: string,
	dateCreated: Date,
	members: Member[]
	expenses: Expense[]
}

export interface Member {
	id: number
	name: string
}

export interface Expense {
	id: number
	amount: number,
	whoPayed: Member,
	toWhomPayed: Member[]
}