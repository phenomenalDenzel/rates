package com.qds.rates.service.converter;

import java.util.List;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import com.qds.rates.service.ApplicationService;
import com.qds.rates.service.dto.ApplicationDTO;
import com.qds.rates.service.dto.CustomerDTO;
import com.qds.rates.service.dto.DashboardDTO;
import com.qds.rates.service.dto.Summary;

@Component
public class DashboardConverter implements Converter<CustomerDTO, DashboardDTO> {

    private ApplicationService applicationService;

    private SummaryConverter summaryConverter;

    public DashboardConverter(ApplicationService applicationService, SummaryConverter summaryConverter) {
        this.applicationService = applicationService;
        this.summaryConverter = summaryConverter;
    }

    @Override
    public DashboardDTO convert(final CustomerDTO customerDTO) {
        List<ApplicationDTO> applications = applicationService.findAllApplicationsByCustomerIdOrderByCreatedDateDesc(customerDTO.getId());
        Summary summary = summaryConverter.convert(applications);
        return DashboardDTO.aDashboard()
                           .summary(summary)
                           .portfolio(applications);
    }
}
