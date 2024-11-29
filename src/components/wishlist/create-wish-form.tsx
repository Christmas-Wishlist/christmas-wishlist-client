import { useForm } from "react-hook-form";
import { WishFormData } from "../../common/types/types";
import "./create-wish-form.css";
import { useWishlistContext } from "../../ctx/wishlist.ctx";

interface CreateWishFormProps {
	onClose: () => void;
}

const CreateWishForm: React.FC<CreateWishFormProps> = ({ onClose }) => {
	const { addWish } = useWishlistContext();
	const {
		register,
		formState: { errors },
		reset,
		handleSubmit,
	} = useForm<WishFormData>();

	const onSubmit = async (data: WishFormData) => {
		console.log(data);
		await addWish(data);
		reset();
	};

	return (
		<div className="modal-overlay">
			<form onSubmit={handleSubmit(onSubmit)}>
				<button className="close-modal-btn" type="button" onClick={onClose}>
					×
				</button>
				<div>
					<label htmlFor="title">Titre</label>
					<input
						id="title"
						{...register("title", { required: "Le titre est requis" })}
					/>
					{errors.title && <p>{errors.title.message}</p>}
				</div>

				<div>
					<label htmlFor="message">Message</label>
					<textarea
						id="message"
						{...register("message", { required: "Le message est requis" })}
					/>
					{errors.message && <p>{errors.message.message}</p>}
				</div>

				<div>
					<label htmlFor="recipient">Destinataire</label>
					<input
						id="recipient"
						{...register("recipient", {
							required: "Le destinataire est requis",
						})}
					/>
					{errors.recipient && <p>{errors.recipient.message}</p>}
				</div>

				<div>
					<button type="submit">Créer Wish</button>
				</div>
			</form>
		</div>
	);
};

export default CreateWishForm;
