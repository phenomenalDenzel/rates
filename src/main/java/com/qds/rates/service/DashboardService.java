package com.qds.rates.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.qds.rates.service.converter.DashboardConverter;
import com.qds.rates.service.dto.CustomerDTO;
import com.qds.rates.service.dto.DashboardDTO;

@Service
public class DashboardService {
    private CustomerService customerService;

    private DashboardConverter dashboardConverter;

    public DashboardService(CustomerService customerService,DashboardConverter dashboardConverter) {
        this.customerService = customerService;
        this.dashboardConverter = dashboardConverter;
    }

    public DashboardDTO getDashboard() {
        Optional<CustomerDTO> currentCustomer = customerService.getCurrentCustomer();
        CustomerDTO customerDTO = currentCustomer.orElseThrow(() -> new IllegalStateException("Customer not Logged " +
                                                                                              "in"));
        return dashboardConverter.convert(customerDTO);
    }

}

