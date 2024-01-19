import { getEmptyTrisplit } from "../vm/intialData";
import { Expense, Member, Trisplit } from "../vm/vm";
import React, { Dispatch, PropsWithChildren, SetStateAction, createContext } from "react";

interface TrisplitContextEntity {
	trisplit: Trisplit;
	setTrisplit: Dispatch<SetStateAction<Trisplit>>;
	members: Member[];
	setMembers: (members: Member[]) => void;
	expenses: Expense[];
	setExpenses: (expenses: Expense[]) => void;
}

export const TrisplitContext = createContext<TrisplitContextEntity>({} as TrisplitContextEntity);

export const TrisplitContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [trisplit, setTrisplit] = React.useState<Trisplit>(getEmptyTrisplit());

	const [members] = React.useState(trisplit.members);
	const setMembers = (members: Member[]) => {
		setTrisplit({ ...trisplit, members: members });
	};

	const [expenses] = React.useState(trisplit.expenses);
	const setExpenses = (expenses: Expense[]) => {
		setTrisplit({ ...trisplit, expenses: expenses });
	};

	return (
		<TrisplitContext.Provider
			value={{ trisplit, setTrisplit, members, setMembers, expenses, setExpenses }}>
			{children}
		</TrisplitContext.Provider>
	);
};
