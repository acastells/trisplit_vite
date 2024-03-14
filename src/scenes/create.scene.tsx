import {
	Button,
	Grid,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { createTrisplit } from "../core/storage/storage";
import { LayoutToolbar } from "../layouts/LayoutToolbar";
import { getEmptyTrisplit } from "../vm/intialData";
import { Member, Trisplit } from "../vm/vm";

const emptyTrisplit = getEmptyTrisplit();

export const CreateScene: React.FC = () => {
	const navigate = useNavigate();
	const [newTrisplit, setNewTrisplit] = React.useState<Trisplit>(emptyTrisplit);
	const [members, setMembers] = React.useState<Member[]>(emptyTrisplit.members);
	const [newMember, setNewMember] = React.useState<Member>({ id: Date.now(), name: "" });

	const handleNewMemberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewMember({ ...newMember, name: e.target.value });
	};

	const addNewMember = () => {
		if (newMember.name === "") {
			alert("The member must have a name");
			return;
		}
		setMembers([...members, newMember]);
		setNewMember({ id: Date.now(), name: "" });
	};

	const handleCreateButton = async () => {
		const trisplitToSave = { ...newTrisplit, members: members };
		await createTrisplit(trisplitToSave);
		navigate("/" + newTrisplit.id.toString());
	};

	return (
		<LayoutToolbar>
			<Grid container flexDirection="column" justifyContent={"center"} sx={{ p: 2 }} gap={2}>
				<TextField
					label="Trisplit name"
					variant="outlined"
					value={newTrisplit.name}
					onChange={(e) => setNewTrisplit({ ...newTrisplit, name: e.target.value })}
				/>
				<TextField
					label="Description"
					multiline
					rows={2}
					value={newTrisplit.description}
					onChange={(e) =>
						setNewTrisplit({ ...newTrisplit, description: e.target.value })
					}
				/>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Members</TableCell>
							</TableRow>
						</TableHead>
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
							{members.map((row) => (
								<TableRow key={row.id}>
									<TableCell>{row.name}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<Button
					variant="contained"
					color="primary"
					onClick={handleCreateButton}
					disabled={newTrisplit.name === "" || members.length === 0}>
					Create Trisplit
				</Button>
			</Grid>
		</LayoutToolbar>
	);
};
