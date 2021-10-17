package com.qds.rates.web.rest;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.qds.rates.service.CustomerService;
import com.qds.rates.service.dto.CustomerDTO;
import com.qds.rates.web.rest.converter.CustomerProfileVMMapper;
import com.qds.rates.web.rest.errors.BadRequestAlertException;
import com.qds.rates.web.rest.vm.CustomerProfileVM;

/**
 * REST controller for managing {@link com.qds.rates.domain.Customer}.
 */
@RestController
@RequestMapping("/api")
public class CustomerResource {

    private final Logger log = LoggerFactory.getLogger(CustomerResource.class);

    private static final String ENTITY_NAME = "customer";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CustomerService customerService;

    private final CustomerProfileVMMapper customerProfileVMMapper;

    public CustomerResource(CustomerService customerService, final CustomerProfileVMMapper customerProfileVMMapper) {
        this.customerService = customerService;
        this.customerProfileVMMapper = customerProfileVMMapper;
    }

    /**
     * {@code POST  /customers} : Create a new customer.
     *
     * @param customerDTO the customerDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new customerDTO, or with status {@code 400 (Bad Request)} if the customer has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/customers")
    public ResponseEntity<CustomerDTO> createCustomer(@Valid @RequestBody CustomerDTO customerDTO) throws URISyntaxException {
        log.debug("REST request to save Customer : {}", customerDTO);
        if (customerDTO.getId() != null) {
            throw new BadRequestAlertException("A new customer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        if (Objects.isNull(customerDTO.getUserId())) {
            throw new BadRequestAlertException("Invalid association value provided", ENTITY_NAME, "null");
        }
        final CustomerDTO result = customerService.registerCustomer(customerDTO);
        return ResponseEntity.created(new URI("/api/customers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /customers} : Updates an existing customer.
     *
     * @param customerDTO the customerDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated customerDTO,
     * or with status {@code 400 (Bad Request)} if the customerDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the customerDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/customers")
    public ResponseEntity<CustomerDTO> updateCustomer(@Valid @RequestBody CustomerDTO customerDTO) throws URISyntaxException {
        log.debug("REST request to update Customer : {}", customerDTO);
        if (customerDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CustomerDTO result = customerService.save(customerDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, customerDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /customers} : get all the customers.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of customers in body.
     */
    @GetMapping("/customers")
    public List<CustomerDTO> getAllCustomers(@RequestParam(required = false) String filter) {
        if ("employmentdetails-is-null".equals(filter)) {
            log.debug("REST request to get all Customers where employmentDetails is null");
            return customerService.findAllWhereEmploymentDetailsIsNull();
        }
        if ("wallet-is-null".equals(filter)) {
            log.debug("REST request to get all Customers where wallet is null");
            return customerService.findAllWhereWalletIsNull();
        }
        log.debug("REST request to get all Customers");
        return customerService.findAll();
    }

    /**
     * {@code GET  /customers/:id} : get the "id" customer.
     *
     * @param id the id of the customerDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the customerDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/customers/{id}")
    public ResponseEntity<CustomerDTO> getCustomer(@PathVariable Long id) {
        log.debug("REST request to get Customer : {}", id);
        Optional<CustomerDTO> customerDTO = customerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(customerDTO);
    }

    /**
     * {@code DELETE  /customers/:id} : delete the "id" customer.
     *
     * @param id the id of the customerDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/customers/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
        log.debug("REST request to delete Customer : {}", id);
        customerService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code GET  /customers/profile} : get the profile of the logged in customer.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK}.
     */
    @GetMapping("/customers/profile")
    public ResponseEntity<CustomerProfileVM> getCustomerProfile(){
        Optional<CustomerDTO> customerProfile = customerService.getCustomerProfile();
        if(customerProfile.isPresent()) {
            CustomerProfileVM customerProfileVM = customerProfileVMMapper.toDto(customerProfile.get());
            return ResponseEntity.ok().body(customerProfileVM);
        }
        return  ResponseEntity.notFound().build();
    }

    /**
     * {@code PUT  /customers/profile} : edit the profile for the logged in user.
     *
     * @param customerProfileVM the profile to be edited.
     * @return the {@link ResponseEntity} with status {@code 200 (OK}.
     */
    @PutMapping("/customers/profile")
    public ResponseEntity<CustomerProfileVM> updateCustomerProfile(@Valid @RequestBody CustomerProfileVM customerProfileVM){
        CustomerDTO customerDTO = customerProfileVMMapper.toEntity(customerProfileVM);

        CustomerDTO updatedCustomer = customerService.updateCustomerProfile(customerDTO);

        return ResponseEntity.ok().body(customerProfileVMMapper.toDto(updatedCustomer));
    }
}
