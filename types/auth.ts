export interface IAuthState {
  token: string | null;
  type: "admin" | "employee" | null;
}

export interface ILoginDTO {
  email: string;
  password: string;
}
