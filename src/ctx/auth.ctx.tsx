import { createContext, ReactNode, useContext, useState } from "react";
import { User, LoginFormData, RegisterFormData } from "../common/types/types";
import useAPI from "../api/api-hook";

interface AuthContextType {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
	isAuthenticated: boolean;
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
	login: (data: LoginFormData) => Promise<void>;
	register: (data: RegisterFormData) => Promise<void>;
	getUserInfos: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
	const api = useAPI();

	const login = async (data: LoginFormData) => {
		try {
			const response = await api.login(data);
			if (response.status === 200) {
				setIsAuthenticated(true);
				await getUserInfos();
			}
		} catch (err) {
			console.log("Erreur de login : ", err);
			setIsAuthenticated(false);
		}
	};

	const register = async (data: RegisterFormData) => {
		try {
			const response = await api.register(data);
			return response.data;
		} catch (err) {
			console.log("Erreur d'inscription : ", err);
			setIsAuthenticated(false);
		}
	};

	const getUserInfos = async () => {
		try {
			const response = await api.getUserInfos();
			console.log(response.data);
			setUser(response.data);
			setIsAuthenticated(true);
		} catch (err) {
			console.log(
				"Erreur lors de la récupération des infos utilisateur : ",
				err
			);
			setIsAuthenticated(false);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				isAuthenticated,
				setIsAuthenticated,
				login,
				register,
				getUserInfos,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuthContext must be used within an AuthProvider");
	}
	return context;
};
