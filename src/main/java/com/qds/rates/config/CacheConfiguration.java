package com.qds.rates.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.boot.info.BuildProperties;
import org.springframework.boot.info.GitProperties;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import io.github.jhipster.config.cache.PrefixedKeyGenerator;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

import com.qds.rates.repository.ApplicationRepository;
import com.qds.rates.repository.CustomerRepository;
import com.qds.rates.repository.LocalGovtRepository;

@Configuration
@EnableCaching
public class CacheConfiguration {
    private GitProperties gitProperties;
    private BuildProperties buildProperties;
    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.qds.rates.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.qds.rates.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.qds.rates.domain.User.class.getName());
            createCache(cm, com.qds.rates.domain.Authority.class.getName());
            createCache(cm, com.qds.rates.domain.User.class.getName() + ".authorities");
            createCache(cm, com.qds.rates.domain.PersistentToken.class.getName());
            createCache(cm, com.qds.rates.domain.User.class.getName() + ".persistentTokens");
            createCache(cm, com.qds.rates.domain.LocalGovt.class.getName());
            createCache(cm, LocalGovtRepository.ACTIVE_LOCAL_GOVTS_BY_STATE);
            createCache(cm, com.qds.rates.domain.Location.class.getName());
            createCache(cm, com.qds.rates.domain.Verification.class.getName());
            createCache(cm, CustomerRepository.CUSTOMERS_BY_LOGIN_CACHE);
            createCache(cm, com.qds.rates.domain.Customer.class.getName());
            createCache(cm, com.qds.rates.domain.Customer.class.getName() + ".accountVerifications");
            createCache(cm, com.qds.rates.domain.Customer.class.getName() + ".nextOfKins");
            createCache(cm, com.qds.rates.domain.Customer.class.getName() + ".addresses");
            createCache(cm, com.qds.rates.domain.Customer.class.getName() + ".applications");
            createCache(cm, com.qds.rates.domain.NextOfKin.class.getName());
            createCache(cm, com.qds.rates.domain.Wallet.class.getName());
            createCache(cm, com.qds.rates.domain.Wallet.class.getName() + ".transactions");
            createCache(cm, com.qds.rates.domain.WalletOperation.class.getName());
            createCache(cm, com.qds.rates.domain.Provider.class.getName());
            createCache(cm, com.qds.rates.domain.Provider.class.getName() + ".opportunities");
            createCache(cm, com.qds.rates.domain.Opportunity.class.getName());
            createCache(cm, com.qds.rates.domain.Opportunity.class.getName() + ".documents");
            createCache(cm, com.qds.rates.domain.OpportunityDocument.class.getName());
            createCache(cm, ApplicationRepository.APPLICATIONS_BY_CUSTOMERS_CACHE);
            createCache(cm, com.qds.rates.domain.Application.class.getName());
            createCache(cm, com.qds.rates.domain.EmploymentDetails.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache == null) {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }

    @Autowired(required = false)
    public void setGitProperties(GitProperties gitProperties) {
        this.gitProperties = gitProperties;
    }

    @Autowired(required = false)
    public void setBuildProperties(BuildProperties buildProperties) {
        this.buildProperties = buildProperties;
    }

    @Bean
    public KeyGenerator keyGenerator() {
        return new PrefixedKeyGenerator(this.gitProperties, this.buildProperties);
    }
}
