import { Wish } from "../common/types/types";
import { http } from "./http";

const useAPI = () => {
	return {
		getWishById: async (id: string) => {
			const response = await http.get(`/christmaswish/${id}`);
			return response.data;
		},

		getWishesByOwnerId: async (ownerId: string) => {
			const response = await http.get(`/christmaswish/${ownerId}`);
			return response.data;
		},

		createWish: async (wish: Omit<Wish, "id">): Promise<Wish> => {
			const response = await http.post("/christmaswish", wish);
			return response.data;
		},

		updateWishById: async (id: string, update: Wish) => {
			const response = await http.put(`/wish/${id}`, update);
			return response.data;
		},

		deleteWishById: async (id: string) => {
			const response = await http.delete(`/wish/${id}`);
			return response.data;
		},
	};
};

export default useAPI;
