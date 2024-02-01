import { Trisplit, Member, Expense } from "@/vm/vm";
import { Dispatch, SetStateAction } from "react";

export interface TrisplitContextEntity {
	trisplit: Trisplit;
	setTrisplit: Dispatch<SetStateAction<Trisplit>>;
	setMembers: (members: Member[]) => void;
	setExpenses: (expenses: Expense[]) => void;
}