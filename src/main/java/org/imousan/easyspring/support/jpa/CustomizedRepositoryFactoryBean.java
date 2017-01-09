package org.imousan.easyspring.support.jpa;

import java.io.Serializable;

import javax.persistence.EntityManager;

import org.imousan.easyspring.support.jpa.entity.SoftDeletableEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.support.JpaRepositoryFactory;
import org.springframework.data.jpa.repository.support.JpaRepositoryFactoryBean;
import org.springframework.data.repository.core.RepositoryMetadata;
import org.springframework.data.repository.core.support.RepositoryFactorySupport;

/**
 * I can generate new customized {@link JpaRepository} implementation(s).
 * @author Roy Yang
 */
public class CustomizedRepositoryFactoryBean<R extends JpaRepository<T, I>, T, I extends Serializable>
        extends JpaRepositoryFactoryBean<R, T, I> {
    protected RepositoryFactorySupport createRepositoryFactory(EntityManager
                                                                       entityManager) {
        return new CustomizedRepositoryFactory(entityManager);
    }

    private static class CustomizedRepositoryFactory<T, I extends Serializable>
            extends JpaRepositoryFactory {

        private EntityManager em;

        public CustomizedRepositoryFactory(EntityManager em) {
            super(em);
            this.em = em;
        }

        protected Object getTargetRepository(RepositoryMetadata metadata) {
            Object repository = null;
            if (SoftDeletableEntity.class.isAssignableFrom(metadata.getDomainType())) {
                repository= new SoftDeletableRepositoryImpl((Class<T>) metadata.getDomainType(),
                        em);
            }

            if (repository == null) {
                repository = new EnhancedRepositoryImpl(metadata.getDomainType(), em);
            }

            return repository;
        }

        protected Class<?> getRepositoryBaseClass(RepositoryMetadata metadata) {
            return SoftDeletableRepository.class;
        }
    }
}
