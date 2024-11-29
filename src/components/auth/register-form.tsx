import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterFormData } from "../../common/types/types";
import { useAuthContext } from "../../ctx/auth.ctx";

const RegisterForm = () => {
	const { register, handleSubmit } = useForm<RegisterFormData>();
	const auth = useAuthContext();

	const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
		return await auth.register(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<label htmlFor="username">Nom d'utilisateur:</label>
				<input id="username" type="text" {...register("username")} />
			</div>
			<div>
				<label htmlFor="email">Email:</label>
				<input id="email" type="email" {...register("email")} />
			</div>

			<div>
				<label htmlFor="password">Mot de passe:</label>
				<input id="password" type="password" {...register("password")} />
			</div>

			<button type="submit">S'inscrire</button>
		</form>
	);
};

export default RegisterForm;
