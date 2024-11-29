import { Wish } from "../../common/types/types";
import "./wishcard.css";
import { CheckCircle, XCircle } from "lucide-react";

interface WishcardProps {
	wish: Wish;
}

const Wishcard: React.FC<WishcardProps> = ({ wish }) => {
	return (
		<div className="wishcard-wrapper">
			<div className="wishcard-header">
				<h3 className="wishcard-title">{wish.title}</h3>
				<i className="wishcard-status">
					{wish.fulfilled ? (
						<CheckCircle color="green" size={24} />
					) : (
						<XCircle color="red" size={24} />
					)}
				</i>
			</div>

			<p className="wishcard-message">{wish.message}</p>
			<div className="wishcard-footer">
				<strong>Propriétaire:</strong> {wish.owner}
				<strong>Destinataire:</strong> {wish.recipient}
			</div>
		</div>
	);
};

export default Wishcard;
