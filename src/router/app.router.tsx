import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateScene } from "../scenes/create.scene";
import { DetailScene } from "../scenes/detail.scene";
import { HomeScene } from "../scenes/home.scene";
import { ListScene } from "../scenes/list.scene";
import { switchRoutes } from "./routes";

export const AppRouter: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={switchRoutes.home} element={<HomeScene />} />
				<Route path={switchRoutes.create} element={<CreateScene />} />
				<Route path={switchRoutes.list} element={<ListScene />} />
				<Route path={switchRoutes.detail} element={<DetailScene />} />
				<Route path="*" element={<div>404! not found!</div>} />
			</Routes>
		</BrowserRouter>
	);
};
