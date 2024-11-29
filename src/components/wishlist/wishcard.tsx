import { Wish } from "../../common/types/types";

interface WishcardProps {
	wish: Wish;
}

const Wishcard: React.FC<WishcardProps> = ({ wish }) => {
	return (
		<div>
			<p>{wish.title}</p>
			<p>{wish.message}</p>
			<p>{wish.owner}</p>
			<p>{wish.fulfilled}</p>
			<p>{wish.recipient}</p>
		</div>
	);
};

export default Wishcard;
