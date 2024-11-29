import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../ctx/auth.ctx";

interface PrivateRouteProps {
	element: React.ReactElement;
}

const PrivateRoute = ({ element }: PrivateRouteProps) => {
	const { isAuthenticated } = useAuthContext();

	useEffect(() => {
		console.log("auth ?: ", isAuthenticated);
	}, [isAuthenticated]);

	if (!isAuthenticated) {
		return <Navigate to="/login" />;
	}

	return element;
};

export default PrivateRoute;
