package com.qds.rates.service.converter;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.qds.rates.domain.enumeration.ApplicationStatus;
import com.qds.rates.service.CustomerService;
import com.qds.rates.service.WalletService;
import com.qds.rates.service.dto.ApplicationDTO;
import com.qds.rates.service.dto.CustomerDTO;
import com.qds.rates.service.dto.OpportunityDTO;
import com.qds.rates.service.dto.Summary;
import com.qds.rates.service.dto.WalletDTO;

public class SummaryConverterTest {

    private final WalletService walletService = mock(WalletService.class);

    private final CustomerService customerService = mock(CustomerService.class);

    private SummaryConverter converter;

    @BeforeEach
    void setUp(){
        converter = new SummaryConverter(walletService, customerService);
    }

    @Test
    public void summaryConverter_ShouldReturnSummary_WhenPortfoliosIsPassed(){
        OpportunityDTO opportunity = new OpportunityDTO();
        opportunity.setInterestRate(1d);

        ApplicationDTO application1 = new ApplicationDTO();
        BigDecimal amount = new BigDecimal(10000);
        application1.setAmount(amount);
        application1.setOpportunity(opportunity);
        application1.setApplicationId("Random AppId");
        application1.setStatus(ApplicationStatus.REDEEMED);
        application1.setCustomerId(1l);

        ApplicationDTO application2 = new ApplicationDTO();
        application2.setAmount(new BigDecimal(10000));
        application2.setOpportunity(opportunity);
        application2.setApplicationId("Random AppId");
        application2.setStatus(ApplicationStatus.COMPLETE);
        application2.setCustomerId(1l);

        ApplicationDTO application3 = new ApplicationDTO();
        application3.setAmount(new BigDecimal(1000));
        application3.setOpportunity(opportunity);
        application3.setApplicationId("Random AppId");
        application3.setStatus(ApplicationStatus.PROCESSING);
        application3.setCustomerId(1l);

        ApplicationDTO application4 = new ApplicationDTO();
        application4.setAmount(new BigDecimal(1000));
        application4.setOpportunity(opportunity);
        application4.setApplicationId("Random AppId");
        application4.setStatus(ApplicationStatus.CANCELLED);
        application4.setCustomerId(1l);

        List<ApplicationDTO> applications = new ArrayList<>();
        applications.add(application1);
        applications.add(application2);
        applications.add(application3);
        applications.add(application4);

        CustomerDTO customer = new CustomerDTO();
        customer.setId(1l);
        when(customerService.getCurrentCustomer()).thenReturn(Optional.of(customer));

        WalletDTO wallet = new WalletDTO();
        wallet.setId(1l);
        wallet.setTotalArchived(new BigDecimal(20000));
        wallet.setTotalDeposit(new BigDecimal(20000));
        when(walletService.findWalletByCustomerId(customer.getId())).thenReturn(wallet);

        Summary summary = converter.convert(applications);
        assertThat(summary.getEarnings()).isEqualTo(new BigDecimal(200));
        assertThat(summary.getTotalInvestment()).isEqualTo(new BigDecimal(20000));
        assertThat(summary.getTotalActivePortfolio()).isEqualTo(new BigDecimal(10000));
        assertThat(summary.getTotalDeposits()).isEqualTo(new BigDecimal(40000));
    }

    @Test
    public void summaryConverter_ShouldReturnSummary_WhenCustomerHasNoActivePortfolio(){
        OpportunityDTO opportunity = new OpportunityDTO();
        opportunity.setInterestRate(1d);

        ApplicationDTO application1 = new ApplicationDTO();
        BigDecimal amount = new BigDecimal(10000);
        application1.setAmount(amount);
        application1.setOpportunity(opportunity);
        application1.setApplicationId("Random AppId");
        application1.setStatus(ApplicationStatus.REDEEMED);
        application1.setCustomerId(1l);

        ApplicationDTO application3 = new ApplicationDTO();
        application3.setAmount(new BigDecimal(1000));
        application3.setOpportunity(opportunity);
        application3.setApplicationId("Random AppId");
        application3.setStatus(ApplicationStatus.PROCESSING);
        application3.setCustomerId(1l);

        ApplicationDTO application4 = new ApplicationDTO();
        application4.setAmount(new BigDecimal(1000));
        application4.setOpportunity(opportunity);
        application4.setApplicationId("Random AppId");
        application4.setStatus(ApplicationStatus.CANCELLED);
        application4.setCustomerId(1l);

        List<ApplicationDTO> applications = new ArrayList<>();
        applications.add(application1);
        applications.add(application3);
        applications.add(application4);

        CustomerDTO customer = new CustomerDTO();
        customer.setId(1l);
        when(customerService.getCurrentCustomer()).thenReturn(Optional.of(customer));

        WalletDTO wallet = new WalletDTO();
        wallet.setId(1l);
        wallet.setTotalArchived(new BigDecimal(5000));
        wallet.setTotalDeposit(new BigDecimal(5000));
        when(walletService.findWalletByCustomerId(customer.getId())).thenReturn(wallet);

        Summary summary = converter.convert(applications);
        assertThat(summary.getEarnings()).isEqualTo(new BigDecimal(100));
        assertThat(summary.getTotalInvestment()).isEqualTo(new BigDecimal(10000));
        assertThat(summary.getTotalActivePortfolio()).isEqualTo(BigDecimal.ZERO);
        assertThat(summary.getTotalDeposits()).isEqualTo(new BigDecimal(10000));
    }

    @Test
    public void summaryConverter_ShouldReturnSummary_WhenCustomerHasOnlyCancelledPortfolio(){
        OpportunityDTO opportunity = new OpportunityDTO();
        opportunity.setInterestRate(1d);

        ApplicationDTO application4 = new ApplicationDTO();
        application4.setAmount(new BigDecimal(1000));
        application4.setOpportunity(opportunity);
        application4.setApplicationId("Random AppId");
        application4.setStatus(ApplicationStatus.CANCELLED);
        application4.setCustomerId(1l);

        List<ApplicationDTO> applications = new ArrayList<>();
        applications.add(application4);

        CustomerDTO customer = new CustomerDTO();
        customer.setId(1l);
        when(customerService.getCurrentCustomer()).thenReturn(Optional.of(customer));

        WalletDTO wallet = new WalletDTO();
        wallet.setId(1l);
        wallet.setTotalDeposit(new BigDecimal(5000));
        when(walletService.findWalletByCustomerId(customer.getId())).thenReturn(wallet);

        Summary summary = converter.convert(applications);
        assertThat(summary.getEarnings()).isEqualTo(BigDecimal.ZERO);
        assertThat(summary.getTotalInvestment()).isEqualTo(BigDecimal.ZERO);
        assertThat(summary.getTotalActivePortfolio()).isEqualTo(BigDecimal.ZERO);
        assertThat(summary.getTotalDeposits()).isEqualTo(new BigDecimal(5000));
    }

    @Test
    public void summaryConverter_ShouldReturnSummaryDefaultValues_WhenEmptyPortfoliosIsPassedAndTotalDepositsTotalArchivedAreNull(){
        List<ApplicationDTO> applications = new ArrayList<>();

        CustomerDTO customer = new CustomerDTO();
        customer.setId(1l);
        when(customerService.getCurrentCustomer()).thenReturn(Optional.of(customer));

        WalletDTO wallet = new WalletDTO();
        wallet.setId(1l);
        when(walletService.findWalletByCustomerId(customer.getId())).thenReturn(wallet);

        Summary summary = converter.convert(applications);
        assertThat(summary.getEarnings()).isEqualTo(BigDecimal.ZERO);
        assertThat(summary.getTotalInvestment()).isEqualTo(BigDecimal.ZERO);
        assertThat(summary.getTotalActivePortfolio()).isEqualTo(BigDecimal.ZERO);
        assertThat(summary.getTotalDeposits()).isEqualTo(BigDecimal.ZERO);
    }

    @Test
    public void summaryConverter_ShouldReturnSummary_WhenTotalDepositsIsNULL(){
        List<ApplicationDTO> applications = new ArrayList<>();

        CustomerDTO customer = new CustomerDTO();
        customer.setId(1l);
        when(customerService.getCurrentCustomer()).thenReturn(Optional.of(customer));

        WalletDTO wallet = new WalletDTO();
        wallet.setId(1l);
        wallet.setTotalArchived(BigDecimal.ZERO);
        wallet.setTotalDeposit(null);
        when(walletService.findWalletByCustomerId(customer.getId())).thenReturn(wallet);

        Summary summary = converter.convert(applications);
        assertThat(summary.getEarnings()).isEqualTo(BigDecimal.ZERO);
        assertThat(summary.getTotalInvestment()).isEqualTo(BigDecimal.ZERO);
        assertThat(summary.getTotalActivePortfolio()).isEqualTo(BigDecimal.ZERO);
        assertThat(summary.getTotalDeposits()).isEqualTo(BigDecimal.ZERO);
    }

    @Test
    public void summaryConverter_ShouldReturnSummary_WhenTotalArchiveIsNULL(){
        List<ApplicationDTO> applications = new ArrayList<>();

        CustomerDTO customer = new CustomerDTO();
        customer.setId(1l);
        when(customerService.getCurrentCustomer()).thenReturn(Optional.of(customer));

        WalletDTO wallet = new WalletDTO();
        wallet.setId(1l);
        wallet.setTotalArchived(null);
        wallet.setTotalDeposit(BigDecimal.ZERO);
        when(walletService.findWalletByCustomerId(customer.getId())).thenReturn(wallet);

        Summary summary = converter.convert(applications);
        assertThat(summary.getEarnings()).isEqualTo(BigDecimal.ZERO);
        assertThat(summary.getTotalInvestment()).isEqualTo(BigDecimal.ZERO);
        assertThat(summary.getTotalActivePortfolio()).isEqualTo(BigDecimal.ZERO);
        assertThat(summary.getTotalDeposits()).isEqualTo(BigDecimal.ZERO);
    }

    @Test
    public void summaryConverter_ShouldThrowIllegalException_WhenCustomerIsNotLoggedIn(){
        List<ApplicationDTO> applications = new ArrayList<>();

        when(customerService.getCurrentCustomer()).thenReturn(Optional.empty());

        Assertions.assertThrows(IllegalStateException.class,()->converter.convert(applications));
    }
}
