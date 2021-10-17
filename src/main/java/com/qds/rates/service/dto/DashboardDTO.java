package com.qds.rates.service.dto;

import java.util.List;

public class DashboardDTO {
    private Summary summary;
    private List<ApplicationDTO> portfolio;

    public static DashboardDTO aDashboard(){
        return new DashboardDTO();
    }

    public Summary getSummary() {
        return summary;
    }

    public DashboardDTO summary(final Summary summary) {
        this.summary = summary;
        return this;
    }

    public List<ApplicationDTO> getPortfolio() {
        return portfolio;
    }

    public DashboardDTO portfolio(final List<ApplicationDTO> portfolio) {
        this.portfolio = portfolio;
        return this;
    }
}
