import { LoginFormData, Wish } from "../common/types/types";
import { http } from "./http";

const useAPI = () => {
	return {
		login: async (data: LoginFormData) => {
			const response = await http.post(`/login`, data);
			return response;
		},

		register: async (data: any) => {
			const response = await http.post(`/register`, data);
			return response;
		},

		getUserInfos: async () => {
			const response = await http.get("/user");
			console.log("user infos: ", response);
			return response;
		},

		getWishById: async (id: string) => {
			const response = await http.get(`/christmaswish/${id}`);
			return response;
		},

		getWishesByOwnerId: async (ownerId: string) => {
			const response = await http.get(`/${ownerId}/wishes`);
			return response;
		},

		createWish: async (wish: Omit<Wish, "_id">) => {
			const response = await http.post("/christmaswish", wish);
			return response;
		},

		updateWishById: async (id: string, update: Wish) => {
			const response = await http.put(`/wish/${id}`, update);
			return response;
		},

		deleteWishById: async (id: string) => {
			const response = await http.delete(`/wish/${id}`);
			return response;
		},
	};
};

export default useAPI;
