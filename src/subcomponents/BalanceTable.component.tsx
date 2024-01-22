import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import React from "react";
import { TrisplitContext } from "../core/trisplitContext";
import { calculateBalancedTransactions } from "../utils";
import { Balance } from "@/vm/vm";

export const BalanceTable = () => {
	const { trisplit } = React.useContext(TrisplitContext);
	const [balance, setBalance] = React.useState<Balance[]>([]);

	React.useEffect(() => {
		setBalance(calculateBalancedTransactions(trisplit.expenses, trisplit.members));
	}, [trisplit]);

	return (
		<>
			{balance.length > 0 && (
				<>
					<p>
						<b>Balance</b>
					</p>

					<TableContainer component={Paper}>
						<Table>
							<TableBody>
								<TableRow>
									<TableCell></TableCell>
									<TableCell>From</TableCell>
									<TableCell>To</TableCell>
								</TableRow>
								{balance.map((entry, index) => (
									<TableRow key={index}>
										<TableCell>{entry.amount}</TableCell>
										<TableCell>{entry.from.name}</TableCell>
										<TableCell>{entry.to.name}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</>
			)}
		</>
	);
};
