package com.qds.rates.service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.qds.rates.domain.Location;
import com.qds.rates.repository.LocationRepository;
import com.qds.rates.service.dto.LocationDTO;
import com.qds.rates.service.mapper.LocationMapper;

/**
 * Service Implementation for managing {@link Location}.
 */
@Service
@Transactional
public class LocationService {

    private final Logger log = LoggerFactory.getLogger(LocationService.class);

    private final LocationRepository locationRepository;

    private final LocationMapper locationMapper;

    public LocationService(LocationRepository locationRepository, LocationMapper locationMapper) {
        this.locationRepository = locationRepository;
        this.locationMapper = locationMapper;
    }

    /**
     * Save a location.
     *
     * @param locationDTO the entity to save.
     * @return the persisted entity.
     */
    public LocationDTO save(LocationDTO locationDTO) {
        log.debug("Request to save Location : {}", locationDTO);
        Location location = locationMapper.toEntity(locationDTO);
        location = locationRepository.save(location);
        LocationDTO result = locationMapper.toDto(location);
        return result;
    }

    /**
     * Get all the locations.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<LocationDTO> findAll() {
        log.debug("Request to get all Locations");
        return locationRepository.findAll().stream()
            .map(locationMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one location by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<LocationDTO> findOne(Long id) {
        log.debug("Request to get Location : {}", id);
        return locationRepository.findById(id)
            .map(locationMapper::toDto);
    }

    /**
     * Delete the location by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Location : {}", id);
        locationRepository.deleteById(id);
    }

}
