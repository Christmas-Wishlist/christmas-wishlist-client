import { useEffect, useState } from "react";
import CreateWishForm from "./create-wish-form";

import Wishcard from "./wishcard";

import { PlusCircle } from "lucide-react";
import "./wishlist.css";
import { useAuthContext } from "../../ctx/auth.ctx";
import { useWishlistContext } from "../../ctx/wishlist.ctx";

const Wishlist = () => {
	const { fetchWishesByOwner, wishes } = useWishlistContext();
	const [toggleForm, setToggleForm] = useState(false);
	const { user } = useAuthContext();

	useEffect(() => {
		console.log(user);
		if (user) fetchWishesByOwner(user._id);
	}, []);

	useEffect(() => {
		console.log("wishes: ", wishes);
	}, [wishes]);

	// const handleSearch = (query: string) => filterWishes(query);

	return (
		<div className="wishlist-wrapper">
			<h2 className="wishlist-title">Ma Wishlist de Noël</h2>
			{/* <SearchBar onSearch={handleSearch} /> */}
			<button
				className="open-modal-btn"
				onClick={() => setToggleForm(!toggleForm)}
			>
				<PlusCircle size={24} />
			</button>

			<div className="wishlist-list">
				{wishes &&
					wishes.map((wish, index) => (
						<div key={index} className="wishcard-wrapper">
							<Wishcard wish={wish} />
						</div>
					))}
			</div>
			{toggleForm && <CreateWishForm onClose={() => setToggleForm(false)} />}
		</div>
	);
};

export default Wishlist;
