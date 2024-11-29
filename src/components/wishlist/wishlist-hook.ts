import { useState } from "react";
import useAPI from "../../api/api-hook";
import { Wish } from "../../common/types/types";

const useWishlist = () => {
	const [wishes, setWishes] = useState<Wish[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const api = useAPI();

	const fetchWishesByOwner = async (ownerId: string): Promise<void> => {
		setLoading(true);
		setError(null);
		try {
			const fetchedWishes = await api.getWishesByOwnerId(ownerId);
			setWishes(fetchedWishes);
		} catch (err) {
			setError(err as Error);
		} finally {
			setLoading(false);
		}
	};

	const addWish = async (wishData: Omit<Wish, "id">): Promise<void> => {
		try {
			const newWish = await api.createWish(wishData);
			setWishes((prevWishes) => [...prevWishes, newWish]);
		} catch (err) {
			setError(err as Error);
		}
	};

	const updateWish = async (id: string, updatedData: Wish): Promise<void> => {
		try {
			const updatedWish = await api.updateWishById(id, updatedData);
			setWishes((prevWishes) =>
				prevWishes.map((wish) => (wish.id === id ? updatedWish : wish))
			);
		} catch (err) {
			setError(err as Error);
		}
	};

	const deleteWish = async (id: string): Promise<void> => {
		try {
			await api.deleteWishById(id);
			setWishes((prevWishes) => prevWishes.filter((wish) => wish.id !== id));
		} catch (err) {
			setError(err as Error);
		}
	};

	return {
		wishes,
		loading,
		error,
		fetchWishesByOwner,
		addWish,
		updateWish,
		deleteWish,
	};
};

export default useWishlist;
