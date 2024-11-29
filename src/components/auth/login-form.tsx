import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormData } from "../../common/types/types";
import { useAuthContext } from "../../ctx/auth.ctx";
import { useNavigate } from "react-router";

const LoginForm = () => {
	const { register, handleSubmit } = useForm<LoginFormData>();
	const auth = useAuthContext();
	const navigate = useNavigate();

	const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
		await auth.login(data);
		navigate("/");
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<label htmlFor="email">Email:</label>
				<input id="email" type="email" {...register("email")} />
			</div>

			<div>
				<label htmlFor="password">Mot de passe:</label>
				<input id="password" type="password" {...register("password")} />
			</div>

			<button type="submit">Se connecter</button>
		</form>
	);
};

export default LoginForm;
