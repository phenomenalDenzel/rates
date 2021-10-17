export const enum Route {
  LOGIN = '/login',
  LOGOUT = '/logout',
  REGISTER = '/account/register',
  ACTIVATE = '/account/activate/:key?',
  RESET_INIT = '/account/reset/request',
  RESET_FINISH = '/account/reset/finish',
  DASHBOARD = '/dashboard',
  ADMIN = '/admin',
  EXPLORE = '/explore',
  EXPLORE_DETAIL = '/explore/:id',
  LEARN = '/learn',
  ACCOUNT = '/account',
  OTP_ACTIVATION = '/activate-account',
  OTP = '/otp',
  BACKOFFICE = '/backoffice',
  USER_PROFILE = '/user-profile',
  INDEX = '/',
}

export const exploreDetail = (otpId: number) => {
  const id = otpId && otpId.toString();
  return Route.EXPLORE_DETAIL.replace(':id', id);
};

export const getOtp = (otpId: number) => {
  const id = otpId && otpId.toString();
  return `${Route.OTP}/:id`.replace(':id', id);
};

export const editOtp = (otpId: number) => {
  const id = otpId && otpId.toString();
  return `${Route.OTP}/:id/edit`.replace(':id', id);
};

export const deleteOtp = (otpId: number) => {
  const id = otpId && otpId.toString();
  return `${Route.OTP}/:id/delete`.replace(':id', id);
};
