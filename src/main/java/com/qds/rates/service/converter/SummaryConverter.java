package com.qds.rates.service.converter;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import com.qds.rates.domain.enumeration.ApplicationStatus;
import com.qds.rates.service.CustomerService;
import com.qds.rates.service.WalletService;
import com.qds.rates.service.dto.ApplicationDTO;
import com.qds.rates.service.dto.CustomerDTO;
import com.qds.rates.service.dto.Summary;
import com.qds.rates.service.dto.WalletDTO;

@Component
public class SummaryConverter implements Converter<List<ApplicationDTO>, Summary> {

    private final Logger log = LoggerFactory.getLogger(SummaryConverter.class);

    private WalletService walletService;

    private CustomerService customerService;

    public SummaryConverter(WalletService walletService,CustomerService customerService) {
        this.walletService = walletService;
        this.customerService = customerService;
    }

    @Override
    public Summary convert(final List<ApplicationDTO> applications) {
        Optional<CustomerDTO> currentCustomer = customerService.getCurrentCustomer();
        CustomerDTO customer = currentCustomer.orElseThrow(() -> new IllegalStateException("Customer not logged in"));
        WalletDTO wallet = walletService.findWalletByCustomerId(customer.getId());
        if(wallet.getTotalArchived()==null){
            wallet.setTotalArchived(BigDecimal.ZERO);
            log.warn("totalArchived is null");
        }
        if(wallet.getTotalDeposit()==null){
            wallet.setTotalDeposit(BigDecimal.ZERO);
            log.warn("totalDeposit is null");
        }
        List<ApplicationDTO> filteredApplications = applications.stream()
                                                                .filter(element -> element.getStatus() == ApplicationStatus.COMPLETE || element.getStatus() == ApplicationStatus.REDEEMED)
                                                                .collect(Collectors.toList());
        Summary summary = Summary.aSummary()
                                 .totalDeposits(wallet.getTotalDeposit().add(wallet.getTotalArchived()))
                                 .totalInvestment(calculateTotalInvestmentForCompleteAndRedeemedApplications(filteredApplications))
                                 .earnings(calculateTotalEarningsForApplications(filteredApplications))
                                 .totalActivePortfolio(calculateTotalActivePortfolio(filteredApplications));
        return summary;
    }

    private BigDecimal calculateTotalInvestmentForCompleteAndRedeemedApplications(List<ApplicationDTO> applications) {
        return applications.stream()
                           .map(element -> element.getAmount())
                           .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private BigDecimal calculateTotalEarningsForApplications(List<ApplicationDTO> applications) {
        return applications.stream()
                           .map(element -> (element.getOpportunity()
                                                   .getInterestRate() / 100) * element.getAmount()
                                                                                      .doubleValue())
                           .map(BigDecimal::new)
                           .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private BigDecimal calculateTotalActivePortfolio(List<ApplicationDTO> applications) {
        return applications.stream()
                           .filter(element -> element.getStatus() == ApplicationStatus.COMPLETE)
                           .map(element -> element.getAmount())
                           .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
