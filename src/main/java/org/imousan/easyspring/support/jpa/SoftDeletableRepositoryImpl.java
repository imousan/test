package org.imousan.easyspring.support.jpa;

import java.io.Serializable;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.imousan.easyspring.support.jpa.entity.SoftDeletableEntity;
import org.imousan.easyspring.support.jpa.entity.SoftDeletableEntity_;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.JpaEntityInformationSupport;
import org.springframework.util.Assert;


/**
 * @author Roy Yang
 */
public class SoftDeletableRepositoryImpl<T extends SoftDeletableEntity, ID extends Serializable>
        extends EnhancedRepositoryImpl<T, ID> implements SoftDeletableRepository<T, ID>{

    private EntityManager em;
    private JpaEntityInformation<T, ?> entityInformation;

    public SoftDeletableRepositoryImpl(Class<T> domainClass, EntityManager em) {
        super(domainClass, em);
        this.entityInformation = JpaEntityInformationSupport.getMetadata(domainClass, em);
        this.em = em;
    }

    public SoftDeletableRepositoryImpl(JpaEntityInformation<T, ?> entityInformation, EntityManager em) {
        super(entityInformation, em);
        Assert.notNull(entityInformation);
        Assert.notNull(em);

        this.entityInformation = entityInformation;
        this.em = em;
    }

    private Specification<T> getNoRemovedSpec() {
        return new Specification<T>() {
            @Override
            public Predicate toPredicate(Root<T> root, CriteriaQuery<?> query,
                    CriteriaBuilder cb) {
                return cb.isFalse(root.get(SoftDeletableEntity_.removed));
            }
        };
    }

    private Specification<T> getByIdSpec(final ID id) {
        Assert.notNull(id, "The given id must not be null!");
        return new Specification<T>() {
            @Override
            public Predicate toPredicate(Root<T> root, CriteriaQuery<?> query,
                    CriteriaBuilder cb) {
                return cb.equal(root.get(SoftDeletableEntity_.id), id);
            }
        };
    }

    private Specification<T> getFinalAliveSpec(Specification<T> spec) {
        Specification<T> finalSpec = getNoRemovedSpec();
        if (spec != null) {
            finalSpec = Specifications.where(spec).and(getNoRemovedSpec());
        }
        return finalSpec;
    }

    @Override
    public long countAlive() {
        return count(getNoRemovedSpec());
    }

    @Override
    public long countAlive(Specification<T> spec) {
        return count(getFinalAliveSpec(spec));
    }

    @Override
    public List<T> findAllAlive() {
        return findAll(getNoRemovedSpec());
    }

    @Override
    public List<T> findAllAlive(Sort sort) {
        return findAll(getNoRemovedSpec(), sort);
    }

    @Override
    public Page<T> findAllAlive(Pageable pageable) {
        return findAll(getNoRemovedSpec(), pageable);
    }

    @Override
    public T findOneAlive(ID id) {
        return findOne(getFinalAliveSpec(getByIdSpec(id)));
    }

    @Override
    public List<T> findAllAlive(Specification<T> spec) {
        return findAll(getFinalAliveSpec(spec));
    }

    @Override
    public List<T> findAllAlive(Specification<T> spec, Sort sort) {
        return findAll(getFinalAliveSpec(spec), sort);
    }

    @Override
    public Page<T> findAllAlive(Specification<T> spec, Pageable pageable) {
        return findAll(getFinalAliveSpec(spec), pageable);
    }

    @Override
    public T findOneAlive(Specification<T> spec) {
        return findOne(getFinalAliveSpec(spec));
    }

    @Override
    public void softDelete(ID id) {
        Assert.notNull(id, "The given id must not be null!");

        if (!exists(id)) {
            throw new EmptyResultDataAccessException(String.format("No %s entity with id %s exists!",
                    entityInformation.getJavaType(), id), 1);
        }

        T entity = findOne(id);
        if (entity.getRemoved()) {
            return;
        }

        entity.setRemoved(Boolean.TRUE);
        em.merge(entity);
    }

    @Override
    public void softDelete(T entity) {
        Assert.notNull(entity, "The given entity must not be null!");
        entity.setRemoved(Boolean.TRUE);
        save(entity);
    }

    @Override
    public void softDelete(T... entities) {
        Assert.notNull(entities, "The given entities must not be null!");
        for (T entity : entities) {
            softDelete(entity);
        }
    }
}
