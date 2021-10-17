package com.qds.rates.web.rest;

import java.util.List;
import java.util.Optional;

import io.github.jhipster.web.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.qds.rates.service.ApplicationService;
import com.qds.rates.service.CustomerService;
import com.qds.rates.service.DashboardService;
import com.qds.rates.service.dto.ApplicationDTO;
import com.qds.rates.service.dto.CustomerDTO;
import com.qds.rates.service.dto.DashboardDTO;

/**
 * REST controller for managing {@link com.qds.rates.domain.Application} related to {@link com.qds.rates.domain.Customer}.
 */
@RestController
@RequestMapping("/api")
public class PortfolioResource {

    private final Logger log = LoggerFactory.getLogger(PortfolioResource.class);

    private static final String ENTITY_NAME = "customer_application";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CustomerService customerService;

    private final ApplicationService applicationService;

    private final DashboardService dashboardService;

    public PortfolioResource(final CustomerService customerService, final ApplicationService applicationService, final DashboardService dashboardService) {
        this.customerService = customerService;
        this.applicationService = applicationService;
        this.dashboardService = dashboardService;
    }

    /**
     * {@code GET  /applications} : get all the applications for customer.
     *
     * @param id the customer id
     * @param pageable the pagination information.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of applications in body.
     */
    @GetMapping("/customer/{id}/applications")
    @Transactional(readOnly = true)
    public ResponseEntity<List<ApplicationDTO>> getAllApplications(@PathVariable @NonNull Long id, Pageable pageable) {
        log.debug("REST request to get a page of Applications for customer with id : {}", id);

        Optional<CustomerDTO> customer = customerService.findOne(id);
        if (customer.isPresent()) {
            log.debug("REST request to get a page of Applications for customer with id : {}", id);
            Page<ApplicationDTO> page = applicationService.findAllByCustomerId(pageable, customer.get()
                                                                                                 .getId());
            HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
            return ResponseEntity.ok()
                                 .headers(headers)
                                 .body(page.getContent());
        } else {
            return ResponseEntity.ok().build();
        }
    }

    @GetMapping("/customer/dashboard")
    @Transactional(readOnly = true)
    public ResponseEntity<DashboardDTO> getDashboardForCustomer(){
        return ResponseEntity.ok(dashboardService.getDashboard());
    }
}
