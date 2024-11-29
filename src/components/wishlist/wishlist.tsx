import CreateWishForm from "./create-wish-form";
import Wishcard from "./wishcard";
import useWishlist from "./wishlist-hook";

const Wishlist = () => {
	const { wishes } = useWishlist();
	return (
		<div>
			<CreateWishForm />
			{wishes &&
				wishes.map((wish, index) => <Wishcard key={index} wish={wish} />)}
		</div>
	);
};

export default Wishlist;
