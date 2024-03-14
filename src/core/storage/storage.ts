import { Trisplit } from "@/vm/vm";
import axios from "axios";

const url = "http://localhost:3000/api/trisplit"

export const getTrisplits = async (): Promise<Trisplit[]> => {
	const trisplits = await axios.get(url)
	return trisplits.data as Trisplit[]
}

export const getTrisplitById = async (id: number): Promise<Trisplit | null> => {
	const trisplit = await axios.get(`${url}/${id}`)
	return trisplit.data as Trisplit
}

export const removeTrisplit = async (id: number) => {
	axios.delete(`${url}/${id}`)
};

export const createTrisplit = async (trisplit: Trisplit) => {
	await axios.post(`${url}`, trisplit)
};

export const saveTrisplit = async (trisplit: Trisplit) => {
	await axios.patch(`${url}/${trisplit.id}`, trisplit)
};
