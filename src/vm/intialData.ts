import { Trisplit } from "./vm";

export const getEmptyTrisplit = (): Trisplit => {
	const newTrisplit: Trisplit = {
		id: Date.now(),
		name: "",
		description: "",
		dateCreated: new Date(),
		members: [],
		expenses: [],
	};
	return newTrisplit;
};
