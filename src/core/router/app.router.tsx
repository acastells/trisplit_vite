import { BrowserRouter, Route, Routes } from "react-router-dom";
import { switchRoutes } from "./routes";
import { HomeScene, CreateScene, ListScene, DetailScene } from "@/scenes";
import { TrisplitContextProvider } from "../providers/trisplitContext.component";

export const AppRouter: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={switchRoutes.home} element={<HomeScene />} />
				<Route path={switchRoutes.create} element={<CreateScene />} />
				<Route path={switchRoutes.list} element={<ListScene />} />
				<Route
					path={switchRoutes.detail}
					element={
						<TrisplitContextProvider>
							<DetailScene />
						</TrisplitContextProvider>
					}
				/>
				<Route path="*" element={<div>404! not found!</div>} />
			</Routes>
		</BrowserRouter>
	);
};
