import { Grid } from "@mui/material";
import { LayoutToolbar } from "../layouts/LayoutToolbar";

export const ListScene: React.FC = () => {
	return (
		<LayoutToolbar>
			<Grid container flexDirection="column" justifyContent={"center"} sx={{ p: 2 }}></Grid>
		</LayoutToolbar>
	);
};
