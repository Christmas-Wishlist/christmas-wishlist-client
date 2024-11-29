import { useForm } from "react-hook-form";
import { WishFormData } from "../../common/types/types";
import useWishlist from "./wishlist-hook";

const CreateWishForm = () => {
	const { addWish } = useWishlist();
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
		<form onSubmit={handleSubmit(onSubmit)}>
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
					{...register("recipient", { required: "Le destinataire est requis" })}
				/>
				{errors.recipient && <p>{errors.recipient.message}</p>}
			</div>

			<div>
				<label htmlFor="fulfilled">
					<input type="checkbox" id="fulfilled" {...register("fulfilled")} />
					Wish Fulfilled
				</label>
			</div>

			<div>
				<button type="submit">Créer Wish</button>
			</div>
		</form>
	);
};

export default CreateWishForm;
