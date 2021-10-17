export interface ICustomerDashboard {
  summary?: {
    totalActivePortfolio?: number;
    earnings?: number;
    totalInvestment?: number;
    totalDeposits?: number;
  };
}

export const defaultICustomerDashboard: ICustomerDashboard = {};
