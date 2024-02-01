import React, { PropsWithChildren, createContext } from "react";
import { TrisplitContextEntity } from "./trisplitContext.vm";
import { getEmptyTrisplit } from "@/vm/intialData";
import { Trisplit, Member, Expense } from "@/vm/vm";

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
		<TrisplitContext.Provider value={{ trisplit, setTrisplit, setMembers, setExpenses }}>
			{children}
		</TrisplitContext.Provider>
	);
};
