import {
	Button,
	Grid,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	TextField,
} from "@mui/material";
import React from "react";
import { TrisplitContext } from "../../core/providers/trisplitContext.component";
import { Member } from "../../vm/vm";

export const MembersTable = () => {
	const { trisplit, setMembers } = React.useContext(TrisplitContext);
	const [newMember, setNewMember] = React.useState<Member>({ id: Date.now(), name: "" });

	const addNewMember = () => {
		if (newMember.name === "") {
			alert("The member must have a name");
			return;
		}
		setMembers([...trisplit.members, newMember]);
		setNewMember({ id: Date.now(), name: "" });
	};

	const handleNewMemberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewMember({ ...newMember, name: e.target.value });
	};

	return (
		<>
			<TableContainer component={Paper}>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>
								<Grid container flexDirection={"column"}>
									<TextField
										value={newMember.name}
										onChange={handleNewMemberChange}
										InputProps={{
											endAdornment: (
												<Button
													variant="contained"
													color="primary"
													onClick={addNewMember}>
													+
												</Button>
											),
										}}
									/>
								</Grid>
							</TableCell>
						</TableRow>
						{trisplit.members.map((row: Member) => (
							<TableRow key={row.id}>
								<TableCell>{row.name}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};
