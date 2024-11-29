import AppRouter from "./components/router/app-router";
import { AuthProvider } from "./ctx/auth.ctx";
import { WishlistProvider } from "./ctx/wishlist.ctx";

const App = () => {
	return (
		<AuthProvider>
			<WishlistProvider>
				<AppRouter />
			</WishlistProvider>
		</AuthProvider>
	);
};

export default App;
