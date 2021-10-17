export interface IValidation {
  bvn?: number;
}

export interface IBvnValidationResponse {
  bvnExists?: boolean;
}
export const defaultIBVN: IBvnValidationResponse = {};
