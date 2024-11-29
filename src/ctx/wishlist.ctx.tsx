import React, { createContext, ReactNode, useContext, useState } from "react";
import useAPI from "../api/api-hook";
import { Wish } from "../common/types/types";
import sampleWishes from "../common/_test/data.test";

interface WishlistContextType {
	wishes: Wish[];
	filteredWishes: Wish[];
	loading: boolean;
	error: Error | null;
	fetchWishesByOwner: (ownerId: string) => Promise<void>;
	addWish: (wishData: Omit<Wish, "_id">) => Promise<void>;
	updateWish: (id: string, updatedData: Wish) => Promise<void>;
	deleteWish: (id: string) => Promise<void>;
	filterWishes: (query: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
	undefined
);

interface WishlistProviderProps {
	children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({
	children,
}) => {
	const [wishes, setWishes] = useState<Wish[]>([]);
	const [filteredWishes, setFilteredWishes] = useState<Wish[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const api = useAPI();

	const fetchWishesByOwner = async (ownerId: string): Promise<void> => {
		setLoading(true);
		setError(null);
		try {
			const fetchedWishes = await api.getWishesByOwnerId(ownerId);
			setWishes(fetchedWishes.data);
		} catch (err) {
			setError(err as Error);
		} finally {
			setLoading(false);
		}
	};

	const addWish = async (wishData: Omit<Wish, "_id">): Promise<void> => {
		try {
			const response = await api.createWish(wishData);
			setWishes((prevWishes) => [...prevWishes, response.data]);
		} catch (err) {
			setError(err as Error);
		}
	};

	const updateWish = async (id: string, updatedData: Wish): Promise<void> => {
		try {
			const response = await api.updateWishById(id, updatedData);
			setWishes((prevWishes) =>
				prevWishes.map((wish) => (wish._id === id ? response.data : wish))
			);
		} catch (err) {
			setError(err as Error);
		}
	};

	const deleteWish = async (id: string): Promise<void> => {
		try {
			await api.deleteWishById(id);
			setWishes((prevWishes) => prevWishes.filter((wish) => wish._id !== id));
		} catch (err) {
			setError(err as Error);
		}
	};

	const filterWishes = (query: string) => {
		if (query) {
			setFilteredWishes(
				wishes.filter((wish) =>
					wish.title.toLowerCase().includes(query.toLowerCase())
				)
			);
		} else {
			setFilteredWishes(wishes);
		}
	};

	return (
		<WishlistContext.Provider
			value={{
				wishes,
				loading,
				error,
				fetchWishesByOwner,
				addWish,
				updateWish,
				deleteWish,
				filterWishes,
				filteredWishes,
			}}
		>
			{children}
		</WishlistContext.Provider>
	);
};

export const useWishlistContext = (): WishlistContextType => {
	const context = useContext(WishlistContext);
	if (!context) {
		throw new Error("useWishlist must be used within a WishlistProvider");
	}
	return context;
};
