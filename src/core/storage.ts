import { Trisplit } from "@/vm/vm";

export const getTrisplit = (id?: number): Trisplit | Trisplit[] | null => {
	const trisplits_str = localStorage.getItem("trisplits");
	if (!trisplits_str) {
		return null;
	}

	const trisplits_arr: Trisplit[] = JSON.parse(trisplits_str);
	if (typeof id === "number") {
		console.log("here")
		const result = trisplits_arr.find((item) => item.id === id);
		if (result) {
			return result;
		} else {
			return null;
		}
	} else {
		console.log("here2", id)
		return trisplits_arr;
	}
};

export const saveTrisplit = (trisplit: Trisplit) => {
	const trisplits_str = localStorage.getItem("trisplits");
	let trisplits_arr: Trisplit[] = [];

	if (trisplits_str) {
		trisplits_arr = JSON.parse(trisplits_str);
		const existingIndex = trisplits_arr.findIndex((item) => item.id === trisplit.id);

		if (existingIndex !== -1) {
			trisplits_arr[existingIndex] = trisplit;
		} else {
			trisplits_arr.push(trisplit);
		}
	} else {
		trisplits_arr.push(trisplit);
	}

	localStorage.setItem("trisplits", JSON.stringify(trisplits_arr));
};
