import { Grid } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LayoutToolbar } from "../layouts/LayoutToolbar";
import { ExpensesTable, BalanceTable, MembersTable } from "./subcomponents";
import { getTrisplit, saveTrisplit } from "../core/storage/storage";
import { Trisplit } from "../vm/vm";
import { TrisplitContext } from "../core/providers/trisplitContext.component";

export const DetailScene: React.FC = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { trisplit, setTrisplit } = React.useContext(TrisplitContext);

	// Check if ID in URL is in LocalStorage, if not, navigate to home
	React.useEffect(() => {
		const newTrisplit = getTrisplit(Number(id));
		if (newTrisplit) {
			setTrisplit(newTrisplit as Trisplit);
		} else {
			navigate("/");
		}
	}, [id]);

	// If any expenses or members have been added, save the current state of the trisplit to LocalStorage
	React.useEffect(() => {
		if (trisplit.id === Number(id)) {
			saveTrisplit(trisplit);
		}
	}, [trisplit.expenses, trisplit.members]);

	return (
		<LayoutToolbar>
			{trisplit && (
				<Grid container flexDirection="column" justifyContent={"center"} sx={{ p: 2 }}>
					<p>
						{trisplit.name.toString()}{" "}
						<i>{new Date(trisplit.dateCreated).toLocaleDateString()}</i>
					</p>
					<span>{trisplit.description.toString()}</span>

					<ExpensesTable />

					<Grid container flexDirection={"row"} spacing={2}>
						<Grid item xs={8}>
							<BalanceTable />
						</Grid>
						<Grid item xs={4}>
							<MembersTable />
						</Grid>
					</Grid>
				</Grid>
			)}
		</LayoutToolbar>
	);
};
