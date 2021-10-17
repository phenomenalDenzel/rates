package com.qds.rates.web.rest;

import com.qds.rates.RatesApp;
import com.qds.rates.domain.WalletOperation;
import com.qds.rates.domain.Wallet;
import com.qds.rates.repository.WalletOperationRepository;
import com.qds.rates.service.WalletOperationService;
import com.qds.rates.service.dto.WalletOperationDTO;
import com.qds.rates.service.mapper.WalletOperationMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.qds.rates.domain.enumeration.OperationType;
/**
 * Integration tests for the {@link WalletOperationResource} REST controller.
 */
@SpringBootTest(classes = RatesApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class WalletOperationResourceIT {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_AMOUNT = new BigDecimal(1);
    private static final BigDecimal UPDATED_AMOUNT = new BigDecimal(2);

    private static final OperationType DEFAULT_OPERATION = OperationType.FUND;
    private static final OperationType UPDATED_OPERATION = OperationType.WITHDRAW;

    @Autowired
    private WalletOperationRepository walletOperationRepository;

    @Autowired
    private WalletOperationMapper walletOperationMapper;

    @Autowired
    private WalletOperationService walletOperationService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restWalletOperationMockMvc;

    private WalletOperation walletOperation;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WalletOperation createEntity(EntityManager em) {
        WalletOperation walletOperation = new WalletOperation()
            .description(DEFAULT_DESCRIPTION)
            .amount(DEFAULT_AMOUNT)
            .operation(DEFAULT_OPERATION);
        // Add required entity
        Wallet wallet;
        if (TestUtil.findAll(em, Wallet.class).isEmpty()) {
            wallet = WalletResourceIT.createEntity(em);
            em.persist(wallet);
            em.flush();
        } else {
            wallet = TestUtil.findAll(em, Wallet.class).get(0);
        }
        walletOperation.setWallet(wallet);
        return walletOperation;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WalletOperation createUpdatedEntity(EntityManager em) {
        WalletOperation walletOperation = new WalletOperation()
            .description(UPDATED_DESCRIPTION)
            .amount(UPDATED_AMOUNT)
            .operation(UPDATED_OPERATION);
        // Add required entity
        Wallet wallet;
        if (TestUtil.findAll(em, Wallet.class).isEmpty()) {
            wallet = WalletResourceIT.createUpdatedEntity(em);
            em.persist(wallet);
            em.flush();
        } else {
            wallet = TestUtil.findAll(em, Wallet.class).get(0);
        }
        walletOperation.setWallet(wallet);
        return walletOperation;
    }

    @BeforeEach
    public void initTest() {
        walletOperation = createEntity(em);
    }

    @Test
    @Transactional
    public void createWalletOperation() throws Exception {
        int databaseSizeBeforeCreate = walletOperationRepository.findAll().size();

        // Create the WalletOperation
        WalletOperationDTO walletOperationDTO = walletOperationMapper.toDto(walletOperation);
        restWalletOperationMockMvc.perform(post("/api/wallet-operations").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(walletOperationDTO)))
            .andExpect(status().isCreated());

        // Validate the WalletOperation in the database
        List<WalletOperation> walletOperationList = walletOperationRepository.findAll();
        assertThat(walletOperationList).hasSize(databaseSizeBeforeCreate + 1);
        WalletOperation testWalletOperation = walletOperationList.get(walletOperationList.size() - 1);
        assertThat(testWalletOperation.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testWalletOperation.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testWalletOperation.getOperation()).isEqualTo(DEFAULT_OPERATION);
    }

    @Test
    @Transactional
    public void createWalletOperationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = walletOperationRepository.findAll().size();

        // Create the WalletOperation with an existing ID
        walletOperation.setId(1L);
        WalletOperationDTO walletOperationDTO = walletOperationMapper.toDto(walletOperation);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWalletOperationMockMvc.perform(post("/api/wallet-operations").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(walletOperationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the WalletOperation in the database
        List<WalletOperation> walletOperationList = walletOperationRepository.findAll();
        assertThat(walletOperationList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = walletOperationRepository.findAll().size();
        // set the field null
        walletOperation.setAmount(null);

        // Create the WalletOperation, which fails.
        WalletOperationDTO walletOperationDTO = walletOperationMapper.toDto(walletOperation);

        restWalletOperationMockMvc.perform(post("/api/wallet-operations").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(walletOperationDTO)))
            .andExpect(status().isBadRequest());

        List<WalletOperation> walletOperationList = walletOperationRepository.findAll();
        assertThat(walletOperationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkOperationIsRequired() throws Exception {
        int databaseSizeBeforeTest = walletOperationRepository.findAll().size();
        // set the field null
        walletOperation.setOperation(null);

        // Create the WalletOperation, which fails.
        WalletOperationDTO walletOperationDTO = walletOperationMapper.toDto(walletOperation);

        restWalletOperationMockMvc.perform(post("/api/wallet-operations").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(walletOperationDTO)))
            .andExpect(status().isBadRequest());

        List<WalletOperation> walletOperationList = walletOperationRepository.findAll();
        assertThat(walletOperationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllWalletOperations() throws Exception {
        // Initialize the database
        walletOperationRepository.saveAndFlush(walletOperation);

        // Get all the walletOperationList
        restWalletOperationMockMvc.perform(get("/api/wallet-operations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(walletOperation.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].operation").value(hasItem(DEFAULT_OPERATION.toString())));
    }

    @Test
    @Transactional
    public void getWalletOperation() throws Exception {
        // Initialize the database
        walletOperationRepository.saveAndFlush(walletOperation);

        // Get the walletOperation
        restWalletOperationMockMvc.perform(get("/api/wallet-operations/{id}", walletOperation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(walletOperation.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.intValue()))
            .andExpect(jsonPath("$.operation").value(DEFAULT_OPERATION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingWalletOperation() throws Exception {
        // Get the walletOperation
        restWalletOperationMockMvc.perform(get("/api/wallet-operations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWalletOperation() throws Exception {
        // Initialize the database
        walletOperationRepository.saveAndFlush(walletOperation);

        int databaseSizeBeforeUpdate = walletOperationRepository.findAll().size();

        // Update the walletOperation
        WalletOperation updatedWalletOperation = walletOperationRepository.findById(walletOperation.getId()).get();
        // Disconnect from session so that the updates on updatedWalletOperation are not directly saved in db
        em.detach(updatedWalletOperation);
        updatedWalletOperation
            .description(UPDATED_DESCRIPTION)
            .amount(UPDATED_AMOUNT)
            .operation(UPDATED_OPERATION);
        WalletOperationDTO walletOperationDTO = walletOperationMapper.toDto(updatedWalletOperation);

        restWalletOperationMockMvc.perform(put("/api/wallet-operations").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(walletOperationDTO)))
            .andExpect(status().isOk());

        // Validate the WalletOperation in the database
        List<WalletOperation> walletOperationList = walletOperationRepository.findAll();
        assertThat(walletOperationList).hasSize(databaseSizeBeforeUpdate);
        WalletOperation testWalletOperation = walletOperationList.get(walletOperationList.size() - 1);
        assertThat(testWalletOperation.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testWalletOperation.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testWalletOperation.getOperation()).isEqualTo(UPDATED_OPERATION);
    }

    @Test
    @Transactional
    public void updateNonExistingWalletOperation() throws Exception {
        int databaseSizeBeforeUpdate = walletOperationRepository.findAll().size();

        // Create the WalletOperation
        WalletOperationDTO walletOperationDTO = walletOperationMapper.toDto(walletOperation);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWalletOperationMockMvc.perform(put("/api/wallet-operations").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(walletOperationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the WalletOperation in the database
        List<WalletOperation> walletOperationList = walletOperationRepository.findAll();
        assertThat(walletOperationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteWalletOperation() throws Exception {
        // Initialize the database
        walletOperationRepository.saveAndFlush(walletOperation);

        int databaseSizeBeforeDelete = walletOperationRepository.findAll().size();

        // Delete the walletOperation
        restWalletOperationMockMvc.perform(delete("/api/wallet-operations/{id}", walletOperation.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<WalletOperation> walletOperationList = walletOperationRepository.findAll();
        assertThat(walletOperationList).hasSize(databaseSizeBeforeDelete - 1);
    }

}
