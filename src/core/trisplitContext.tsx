import { getEmptyTrisplit } from "../vm/intialData";
import { Expense, Member, Trisplit } from "../vm/vm";
import React, { Dispatch, PropsWithChildren, SetStateAction, createContext } from "react";

interface TrisplitContextEntity {
	trisplit: Trisplit;
	setTrisplit: Dispatch<SetStateAction<Trisplit>>;
	setMembers: (members: Member[]) => void;
	setExpenses: (expenses: Expense[]) => void;
}

export const TrisplitContext = createContext<TrisplitContextEntity>({} as TrisplitContextEntity);

export const TrisplitContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [trisplit, setTrisplit] = React.useState<Trisplit>(getEmptyTrisplit());
	const setMembers = (members: Member[]) => {
		setTrisplit({ ...trisplit, members: members });
	};
	const setExpenses = (expenses: Expense[]) => {
		setTrisplit({ ...trisplit, expenses: expenses });
	};

	return (
		<TrisplitContext.Provider
			value={{ trisplit, setTrisplit, setMembers, setExpenses }}>
			{children}
		</TrisplitContext.Provider>
	);
};
