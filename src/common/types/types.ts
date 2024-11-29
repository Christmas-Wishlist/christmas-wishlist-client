export type Wish = {
	_id: string;
	title: string;
	message: string;
	fulfilled: boolean;
	owner: string;
	recipient: string;
};

export type User = {
	_id: string;
	username: string;
	email: string;
	role: UserRole;
};

enum UserRole {
	ADMIN = "admin",
	USER = "user",
}

export type WishFormData = Omit<Wish, "id">;

export type LoginFormData = {
	email: string;
	password: string;
};

export type RegisterFormData = {
	username: string;
	email: string;
	password: string;
};
