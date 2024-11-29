import { Route, BrowserRouter, Routes } from "react-router-dom";
import LandingPage from "../pages/landing.page";
import LoginPage from "../pages/login.page";
import RegisterPage from "../pages/register.page";
import PrivateRoute from "./private-route";

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<PrivateRoute element={<LandingPage />} />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRouter;
