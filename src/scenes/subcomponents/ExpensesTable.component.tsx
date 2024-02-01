import { Expense, Member } from "@/vm/vm";
import DeleteIcon from "@mui/icons-material/Delete";
import {
	Button,
	Chip,
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	TextField,
} from "@mui/material";
import React from "react";
import { TrisplitContext } from "../../core/providers/trisplitContext.component";

const getInitialNewExpense = (members: Member[]) => {
	return {
		id: Date.now(),
		amount: 0,
		whoPayed: members[0],
		toWhomPayed: [],
	};
};

export const ExpensesTable = () => {
	const { trisplit, setExpenses } = React.useContext(TrisplitContext);
	const [newExpense, setNewExpense] = React.useState<Expense>();

	React.useEffect(() => {
		if (trisplit.members.length > 0) {
			setNewExpense(getInitialNewExpense(trisplit.members));
		}
	}, [trisplit.members]);

	const handleAddNewExpense = () => {
		if (newExpense && newExpense.amount > 0 && newExpense.toWhomPayed.length > 0) {
			setExpenses([...trisplit.expenses, newExpense as Expense]);
			setNewExpense(getInitialNewExpense(trisplit.members));
		} else {
			alert("Please check your new expense");
		}
	};

	const handleDeleteExpense = (expense: Expense) => {
		const newExpenses = trisplit.expenses.filter((item) => item.id !== expense.id);
		setExpenses(newExpenses);
	};

	return (
		<>
			<p>
				<b>Expenses</b>
			</p>

			<TableContainer component={Paper}>
				<Table>
					<TableBody>
						{newExpense && (
							<TableRow>
								<TableCell>
									<TextField
										fullWidth
										type="number"
										value={newExpense.amount}
										onChange={(e) =>
											setNewExpense({
												...newExpense,
												amount: Number(e.target.value),
											})
										}
										sx={{ width: 150 }}
										InputProps={{
											endAdornment: <p>€</p>,
										}}
									/>
								</TableCell>
								<TableCell>
									<FormControl fullWidth>
										<InputLabel id="who-payed-label-id">Who Payed</InputLabel>
										<Select
											fullWidth
											labelId="who-payed-label-id"
											value={newExpense.whoPayed.id}
											label="Who payed"
											sx={{ width: 150 }}
											onChange={(e) =>
												setNewExpense({
													...newExpense,
													whoPayed: trisplit.members.find(
														(item) => item.id === Number(e.target.value)
													) as Member,
												})
											}>
											{trisplit.members.map((member) => (
												<MenuItem key={member.id} value={member.id}>
													{member.name}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</TableCell>
								<TableCell>
									<FormControl fullWidth>
										<InputLabel id="to-whom-label-id">To Whom</InputLabel>
										<Select
											fullWidth
											multiple
											sx={{ width: 300 }}
											labelId="to-whom-label-id"
											value={newExpense.toWhomPayed.map((item) => item.id)}
											label="Who payed"
											onChange={(e) =>
												setNewExpense({
													...newExpense,
													toWhomPayed: trisplit.members.filter((member) =>
														(e.target.value as Array<number>).includes(
															member.id
														)
													) as Member[],
												})
											}>
											{trisplit.members.map((member) => (
												<MenuItem key={member.id} value={member.id}>
													{member.name}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</TableCell>
								<TableCell>
									{" "}
									<Button
										variant="contained"
										color="primary"
										onClick={handleAddNewExpense}>
										+
									</Button>
								</TableCell>
							</TableRow>
						)}
						{trisplit.expenses.map((expense) => (
							<TableRow key={expense.id}>
								<TableCell>{expense.amount}</TableCell>
								<TableCell>{expense.whoPayed.name}</TableCell>
								<TableCell>
									{expense.toWhomPayed.map((member) => (
										<Chip key={member.id} label={member.name} sx={{ mr: 1 }} />
									))}
								</TableCell>
								<TableCell>
									<Button
										color="error"
										onClick={() => handleDeleteExpense(expense)}>
										<DeleteIcon />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};
