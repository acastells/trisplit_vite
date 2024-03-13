import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { AppRouter } from "./core/router";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

function App() {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<AppRouter />
		</ThemeProvider>
	);
}

export default App;
