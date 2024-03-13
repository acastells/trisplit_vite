import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Grid, Tab } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TrisplitContext } from "../core/providers/trisplitContext.component";
import { getTrisplit, saveTrisplit } from "../core/storage/storage";
import { LayoutToolbar } from "../layouts/LayoutToolbar";
import { Trisplit } from "../vm/vm";
import { BalanceTable, ExpensesTable, MembersTable } from "./subcomponents";

export const DetailScene: React.FC = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { trisplit, setTrisplit } = React.useContext(TrisplitContext);

	const [tabSelected, setTabSelected] = React.useState("1");

	const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
		setTabSelected(newValue);
	};

	// Check if ID in URL is in LocalStorage, if not, navigate to home
	React.useEffect(() => {
		const newTrisplit = getTrisplit(Number(id));
		if (newTrisplit) {
			setTrisplit(newTrisplit as Trisplit);
		} else {
			navigate("/");
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	// If any expenses or members have been added, save the current state of the trisplit to LocalStorage
	React.useEffect(() => {
		if (trisplit.id === Number(id)) {
			saveTrisplit(trisplit);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [trisplit.expenses, trisplit.members]);

	return (
		<LayoutToolbar>
			{trisplit && (
				<Grid container flexDirection="column" justifyContent={"center"} sx={{ p: 2, pt:0 }}>
					<p>
						{trisplit.name.toString()}{" "}
						<i>{new Date(trisplit.dateCreated).toLocaleDateString()}</i>
					</p>
					<span>{trisplit.description.toString()}</span>

					<Box>
						<TabContext value={tabSelected}>
							<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
								<TabList onChange={handleChange}>
									<Tab label="Expenses" value="1" />
									<Tab label="Balance" value="2" />
									<Tab label="Members" value="3" />
								</TabList>
							</Box>
							<TabPanel value="1" sx={{p:0, pt:2}}><ExpensesTable /></TabPanel>
							<TabPanel value="2" sx={{p:0, pt:2}}><BalanceTable /></TabPanel>
							<TabPanel value="3" sx={{p:0, pt:2}}><MembersTable /></TabPanel>
						</TabContext>
					</Box>
				</Grid>
			)}
		</LayoutToolbar>
	);
};
