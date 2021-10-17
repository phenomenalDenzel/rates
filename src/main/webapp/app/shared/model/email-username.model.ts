export interface IValidation {
  email?: string;
  login?: string;
}

export interface IValidationResponse {
  emailExists?: boolean;
  usernameExists?: boolean;
}
