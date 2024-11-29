export type Wish = {
	title: string;
	message: string;
	fulfilled: boolean;
	owner: string;
	recipient: string;
};

export type User = {
	username: string;
	email: string;
	password: string;
	role: UserRole;
};

enum UserRole {
	ADMIN = "admin",
	USER = "user",
}
