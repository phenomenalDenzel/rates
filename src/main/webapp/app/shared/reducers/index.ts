import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
import sessions, { SessionsState } from 'app/modules/account/sessions/sessions.reducer';
import localGovt, { LocalGovtState } from 'app/entities/local-govt/local-govt.reducer';
import location, { LocationState } from 'app/entities/location/location.reducer';
import verification, { VerificationState } from 'app/entities/verification/verification.reducer';
import customer, { CustomerState } from 'app/entities/customer/customer.reducer';
import nextOfKin, { NextOfKinState } from 'app/entities/next-of-kin/next-of-kin.reducer';
import wallet, { WalletState } from 'app/entities/wallet/wallet.reducer';
import walletOperation, { WalletOperationState } from 'app/entities/wallet-operation/wallet-operation.reducer';
import provider, { ProviderState } from 'app/entities/provider/provider.reducer';
import opportunity, { OpportunityState } from 'app/entities/opportunity/opportunity.reducer';
import opportunityDocument, { OpportunityDocumentState } from 'app/entities/opportunity-document/opportunity-document.reducer';
import application, { ApplicationState } from 'app/entities/application/application.reducer';
import employmentDetails, { EmploymentDetailsState } from 'app/entities/employment-details/employment-details.reducer';
import otp, { OtpState } from 'app/entities/otp/otp.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly sessions: SessionsState;
  readonly localGovt: LocalGovtState;
  readonly location: LocationState;
  readonly verification: VerificationState;
  readonly customer: CustomerState;
  readonly nextOfKin: NextOfKinState;
  readonly wallet: WalletState;
  readonly walletOperation: WalletOperationState;
  readonly provider: ProviderState;
  readonly opportunity: OpportunityState;
  readonly opportunityDocument: OpportunityDocumentState;
  readonly application: ApplicationState;
  readonly employmentDetails: EmploymentDetailsState;
  readonly otp: OtpState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  sessions,
  localGovt,
  location,
  verification,
  customer,
  nextOfKin,
  wallet,
  walletOperation,
  provider,
  opportunity,
  opportunityDocument,
  application,
  employmentDetails,
  otp,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
