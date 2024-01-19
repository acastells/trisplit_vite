import DeleteIcon from "@mui/icons-material/Delete";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableRow,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getTrisplit, removeTrisplit } from "../core/storage";
import { LayoutToolbar } from "../layouts/LayoutToolbar";
import { Trisplit } from "../vm/vm";

export const ListScene: React.FC = () => {
	const navigate = useNavigate();
	const [trisplits, setTrisplits] = React.useState<Trisplit[]>();
	const [deleteConfirmationOpen, setDeleteConfirmationOpen] = React.useState<boolean>(false);
	const [itemIdToDelete, setItemIdToDelete] = React.useState<number | null>();

	React.useEffect(() => {
		const newTrisplits = getTrisplit();
		if (newTrisplits) {
			setTrisplits(newTrisplits as Trisplit[]);
		}
	}, []);

	const handleDelete = (id: number) => {
		setItemIdToDelete(id);
		setDeleteConfirmationOpen(true);
	};

	const confirmDelete = () => {
		if (itemIdToDelete) {
			removeTrisplit(itemIdToDelete);
			setTrisplits((prevTrisplits) =>
				(prevTrisplits as Trisplit[]).filter((item) => item.id !== itemIdToDelete)
			);
			setItemIdToDelete(null);
			setDeleteConfirmationOpen(false);
		}
	};

	const cancelDelete = () => {
		setItemIdToDelete(null);
		setDeleteConfirmationOpen(false);
	};

	const DeleteDialog = () => {
		return (
			<Dialog open={deleteConfirmationOpen} onClose={cancelDelete}>
				<DialogTitle>Confirm Deletion</DialogTitle>
				<DialogContent>Are you sure you want to delete this trisplit?</DialogContent>
				<DialogActions>
					<Button onClick={cancelDelete} color="primary">
						Cancel
					</Button>
					<Button onClick={confirmDelete} color="secondary">
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		);
	};

	return (
		<LayoutToolbar>
			<DeleteDialog />
			<Grid container flexDirection="column" justifyContent={"center"} sx={{ p: 2 }}>
				{trisplits?.map((item) => (
					<Table key={item.id}>
						<TableBody>
							<TableRow>
								<TableCell>
									<Button onClick={() => navigate("/" + item.id)}>
										{item.name}
									</Button>
								</TableCell>
								<TableCell>
									{new Date(item.dateCreated).toLocaleDateString()}
								</TableCell>
								<TableCell>
									{item.members.map((member) => member.name).join(", ")}
								</TableCell>
								<TableCell>
									<IconButton onClick={() => handleDelete(item.id)} color="error">
										<DeleteIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				))}
				<Grid
					container
					flexDirection="row"
					justifyContent={"center"}
					gap={4}
					sx={{ mt: 4 }}>
					<Button onClick={() => navigate("/create")}>Create one</Button>
				</Grid>
			</Grid>
		</LayoutToolbar>
	);
};
