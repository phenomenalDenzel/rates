package com.qds.rates.service;

import com.qds.rates.domain.Provider;
import com.qds.rates.repository.ProviderRepository;
import com.qds.rates.service.dto.ProviderDTO;
import com.qds.rates.service.mapper.ProviderMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Provider}.
 */
@Service
@Transactional
public class ProviderService {

    private final Logger log = LoggerFactory.getLogger(ProviderService.class);

    private final ProviderRepository providerRepository;

    private final ProviderMapper providerMapper;

    public ProviderService(ProviderRepository providerRepository, ProviderMapper providerMapper) {
        this.providerRepository = providerRepository;
        this.providerMapper = providerMapper;
    }

    /**
     * Save a provider.
     *
     * @param providerDTO the entity to save.
     * @return the persisted entity.
     */
    public ProviderDTO save(ProviderDTO providerDTO) {
        log.debug("Request to save Provider : {}", providerDTO);
        Provider provider = providerMapper.toEntity(providerDTO);
        provider = providerRepository.save(provider);
        ProviderDTO result = providerMapper.toDto(provider);
        return result;
    }

    /**
     * Get all the providers.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<ProviderDTO> findAll() {
        log.debug("Request to get all Providers");
        return providerRepository.findAll().stream()
            .map(providerMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one provider by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ProviderDTO> findOne(Long id) {
        log.debug("Request to get Provider : {}", id);
        return providerRepository.findById(id)
            .map(providerMapper::toDto);
    }

    /**
     * Delete the provider by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Provider : {}", id);
        providerRepository.deleteById(id);
    }
}
