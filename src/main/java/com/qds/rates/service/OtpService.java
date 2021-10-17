package com.qds.rates.service;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.google.common.base.Preconditions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.qds.rates.config.ApplicationProperties;
import com.qds.rates.domain.Otp;
import com.qds.rates.domain.User;
import com.qds.rates.domain.enumeration.OtpAction;
import com.qds.rates.repository.OtpRepository;
import com.qds.rates.service.dto.EmailContext;
import com.qds.rates.service.dto.OtpDTO;
import com.qds.rates.service.mapper.OtpMapper;

/**
 * Service Implementation for managing {@link Otp}.
 */
@Service
@Transactional
public class OtpService {

    private final Logger log = LoggerFactory.getLogger(OtpService.class);

    private final OtpRepository otpRepository;

    private final OtpMapper otpMapper;

    private final MailService mailService;

    private final ApplicationProperties properties;

    @Autowired
    public OtpService(OtpRepository otpRepository, OtpMapper otpMapper, MailService mailService, ApplicationProperties properties) {
        this.otpRepository = otpRepository;
        this.otpMapper = otpMapper;
        this.mailService = mailService;
        this.properties = properties;
    }

    /**
     * Save a otp.
     *
     * @param otpDTO the entity to save.
     * @return the persisted entity.
     */
    public OtpDTO save(OtpDTO otpDTO) {
        log.debug("Request to save Otp : {}", otpDTO);
        Otp otp = otpMapper.toEntity(otpDTO);
        otp = otpRepository.save(otp);
        return otpMapper.toDto(otp);
    }

    /**
     * Get all the otps.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<OtpDTO> findAll() {
        log.debug("Request to get all Otps");
        return otpRepository.findAll().stream()
            .map(otpMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one otp by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<OtpDTO> findOne(Long id) {
        log.debug("Request to get Otp : {}", id);
        return otpRepository.findById(id)
            .map(otpMapper::toDto);
    }

    /**
     * Delete the otp by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Otp : {}", id);
        otpRepository.deleteById(id);
    }

    /**
     * Generate and Save an otp.
     *
     * @param user the entity user generating otp for
     * @param action represents reason for OTP generation
     * @return The generated code for the OTP.
     */
    public OtpDTO sendGeneratedOtpCodeToUser(User user, OtpAction action) {
        Preconditions.checkArgument(user != null,"User not found");
        Preconditions.checkState(user.getEmail() != null,"Email not found");
        OtpDTO generatedOtpDTO = createOtp(user, action);
        EmailContext emailContext = new EmailContext()
                .otpDTO(generatedOtpDTO)
                .user(user);

        switch(action){
            case ACTIVATION:
                mailService.sendActivationEmailWithOtp(emailContext);
                break;
            case WITHDRAWAL:
                mailService.sendWithdrawalEmailOtp(emailContext);
                break;
            case RESET_PASSWORD:
                mailService.sendPasswordResetMailWithOtp(emailContext);
                break;
            default:
        }
        return generatedOtpDTO;
    }

    /**
     * Initializes and saves otp
     *
     * @param user the entity user generating otp for
     * @param action represents reason for OTP generation
     * @return otpDTO
     */
    private OtpDTO createOtp(User user, OtpAction action){
        Otp otp = new Otp()
                .action(action)
                .code(generateCode())
                .email(user.getEmail())
                .used(false);
        Otp generatedOtp = otpRepository.save(otp);

        OtpDTO generatedOtpDTO = otpMapper.toDto(generatedOtp);
        return generatedOtpDTO;
    }

    /**
     * Generates a secure random 6 digit number String
     * @return the generated String
     */
    private String generateCode() {
        SecureRandom secureRandom;
        try {
            secureRandom = SecureRandom.getInstance("NativePRNG");
        }catch (NoSuchAlgorithmException ex){
            secureRandom = new SecureRandom();
        }
        StringBuilder otpCode = new StringBuilder();

        for (int i = 0; i < properties.getOtpLength(); i++) {
            otpCode.append(secureRandom.nextInt(9));
        }

        return otpCode.toString();
    }

    /**
     * Validates a given otp code against requester and action
     * @return the outcome of validation
     */
    public boolean useOtp(OtpDTO otpDTO){
        Instant validityTime = Instant.now().minusMillis(properties.getOtpValidityMinutes() * 60 * 1000);

        Optional<Otp> recentOtp =
                otpRepository.findFirstByActionAndEmailAndCreatedTimeGreaterThanEqualOrderByCreatedTimeDesc(otpDTO.getAction(), otpDTO.getEmail(), validityTime);
        if (!recentOtp.isPresent()) return false;

        Otp otp = recentOtp.get();
        if(otp.isUsed()) return false;

        otp.setUsed(true);
        otpRepository.save(otp);

        return true;
    }

    @Scheduled(cron = "0 0 3 * * ?")
    public void cleanUpUsedOtps() {
        Instant validityTime = Instant.now().minus(24l, ChronoUnit.HOURS);
        List<Otp> usedOtps = otpRepository.findAllByCreatedTimeLessThanEqual(validityTime);
        otpRepository.deleteAll(usedOtps);
    }

}
