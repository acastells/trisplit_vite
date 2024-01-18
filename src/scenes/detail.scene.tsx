import { Trisplit } from "@/vm/vm";
import { Grid } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTrisplit } from "../core/storage";
import { LayoutToolbar } from "../layouts/LayoutToolbar";

export const DetailScene: React.FC = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [trisplit, setTrisplit] = React.useState<Trisplit>();

	React.useEffect(() => {
		const newTrisplit = getTrisplit(Number(id));
		if (newTrisplit) {
			setTrisplit(newTrisplit as Trisplit);
		} else {
			navigate("/");
		}
	}, [id]);

	return (
		<LayoutToolbar>
			<Grid container flexDirection="column" justifyContent={"center"} sx={{ p: 2 }}>
				<p>{trisplit?.id.toString()}</p>
				<p>{trisplit?.name.toString()}</p>
				<p>{trisplit?.description.toString()}</p>
				<p>{trisplit?.dateCreated.toString()}</p>
				<p>{trisplit?.members.toString()}</p>
				<p>{trisplit?.expenses.toString()}</p>
			</Grid>
		</LayoutToolbar>
	);
};
