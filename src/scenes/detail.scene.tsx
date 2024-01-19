import { Trisplit } from "../vm/vm";
import { Grid } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTrisplit, saveTrisplit } from "../core/storage";
import { LayoutToolbar } from "../layouts/LayoutToolbar";
import { BalanceTable } from "../subcomponents/BalanceTable.component";
import { ExpensesTable } from "../subcomponents/ExpensesTable.component";
import { MembersTable } from "../subcomponents/MembersTable.component";
import { TrisplitContext } from "../core/trisplitContext";

export const DetailScene: React.FC = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const {trisplit, setTrisplit} = React.useContext(TrisplitContext);

	React.useEffect(() => {
		const newTrisplit = getTrisplit(Number(id));
		if (newTrisplit) {
			setTrisplit(newTrisplit as Trisplit);
		} else {
			navigate("/");
		}
	}, [id]);

	React.useEffect(() => {
		if (trisplit) {
			saveTrisplit(trisplit);
		}
	}, [trisplit]);

	return (
			<LayoutToolbar>
				{trisplit && (
					<Grid container flexDirection="column" justifyContent={"center"} sx={{ p: 2 }}>
						<p>
							{trisplit.name.toString()}{" "}
							<i>{new Date(trisplit.dateCreated).toLocaleDateString()}</i>
						</p>
						<span>{trisplit.description.toString()}</span>
						<p>{trisplit.members.toString()}</p>

						<ExpensesTable/>
						<BalanceTable/>
						<MembersTable/>
					</Grid>
				)}
			</LayoutToolbar>
	);
};
