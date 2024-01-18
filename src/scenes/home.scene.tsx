import { Button, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { LayoutToolbar } from "../layouts/LayoutToolbar";

export const HomeScene: React.FC = () => {
	return (
		<LayoutToolbar>
			<Grid container flexDirection="column" justifyContent={"center"} sx={{ p: 2 }}>
				<Button component={RouterLink} to="/create">
					Create Trisplit
				</Button>
				<Button component={RouterLink} to="/list">
					See existing Trisplits
				</Button>
			</Grid>
		</LayoutToolbar>
	);
};
