package org.imousan.easyspring.support.jpa;

import java.io.Serializable;
import java.util.Collections;
import java.util.List;

import javax.annotation.Nullable;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaDelete;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import com.google.common.base.Function;
import com.google.common.collect.Lists;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.JpaEntityInformationSupport;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.util.Assert;

/**
 * @author Roy Yang
 */
public class EnhancedRepositoryImpl<T, ID extends Serializable>
        extends SimpleJpaRepository<T, ID> implements EnhancedRepository<T, ID> {
    private static final Logger LOGGER = LoggerFactory.getLogger(EnhancedRepositoryImpl.class);

    private EntityManager em;
    private JpaEntityInformation<T, ?> entityInformation;

    public EnhancedRepositoryImpl(Class<T> domainClass, EntityManager em) {
        super(domainClass, em);
        this.entityInformation = JpaEntityInformationSupport.getMetadata(domainClass, em);
        this.em = em;
    }

    public EnhancedRepositoryImpl(JpaEntityInformation<T, ?> entityInformation, EntityManager em) {
        super(entityInformation, em);
        Assert.notNull(entityInformation);
        Assert.notNull(em);

        this.entityInformation = entityInformation;
        this.em = em;
    }

    @Override
    public Object find(Specification spec) {
        Assert.notNull(spec, "Specification cannot be null!");
        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<Object> query = builder.createQuery();
        Root<T> root = query.from(entityInformation.getJavaType());
        Predicate predicate = spec.toPredicate(root, query, builder);
        if (predicate != null) {
            query.where(predicate);
        }

        return em.createQuery(query).getSingleResult();
    }

    @Override
    public List<Object> findSome(Specification spec) {
        Assert.notNull(spec, "Specification cannot be null!");
        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<Object> query = builder.createQuery();
        Root<T> root = query.from(entityInformation.getJavaType());
        Predicate predicate = spec.toPredicate(root, query, builder);
        if (predicate != null) {
            query.where(predicate);
        }

        return em.createQuery(query).getResultList();
    }

    @Override
    public List<Long> findIds(Specification spec) {
        Assert.notNull(spec, "Specification cannot be null!");
        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<Object> query = builder.createQuery();
        Root<T> root = query.from(entityInformation.getJavaType());
        query.multiselect(root.get("id"));
        Predicate predicate = spec.toPredicate(root, query, builder);
        if (predicate != null) {
            query.where(predicate);
        }

        List<Object> idsInObj = em.createQuery(query).getResultList();

        return Lists.transform(idsInObj, new Function<Object, Long>() {
            @Nullable
            @Override
            public Long apply(@Nullable Object idInObj) {
                return (Long) idInObj;
            }
        });
    }

    @Override
    public void delete(Specification spec) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaDelete<T> criteriaDelete = cb.createCriteriaDelete(entityInformation.getJavaType());
        Root<T> root = criteriaDelete.from(entityInformation.getJavaType());
        if (spec != null) {
            criteriaDelete.where(spec.toPredicate(root, null, cb));
        } else {
            LOGGER.info("There is no predicate for this delete operation.");
        }

        int i = em.createQuery(criteriaDelete).executeUpdate();
        LOGGER.trace("{} entities has been delete from {}", i, entityInformation.getJavaType().getSimpleName());
    }

    @Override
    public void refresh(T entity) {
        Assert.notNull(entity, "The given entity must not be null!");
        em.refresh(entity);
    }

    @Override
    public void detach(T entity) {
        Assert.notNull(entity, "The given entity must not be null!");
        em.detach(entity);
    }

    /**
     * The reason why I overwrite this function is in MSSQL the count query with ORDER BY is not allowed.
     * @param spec specification
     * @return the count query without ORDER BY clause
     */
    @Override
    protected TypedQuery<Long> getCountQuery(Specification<T> spec) {

        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<Long> query = builder.createQuery(Long.class);

        Root<T> root = applySpecificationToCriteria(spec, query);

        if (query.isDistinct()) {
            query.select(builder.countDistinct(root));
        } else {
            query.select(builder.count(root));
        }

        query.orderBy(Collections.<Order>emptyList());

        return em.createQuery(query);
    }

    protected <S> Root<T> applySpecificationToCriteria(Specification<T> spec, CriteriaQuery<S> query) {

        Assert.notNull(query);
        Root<T> root = query.from(getDomainClass());

        if (spec == null) {
            return root;
        }

        CriteriaBuilder builder = em.getCriteriaBuilder();
        Predicate predicate = spec.toPredicate(root, query, builder);

        if (predicate != null) {
            query.where(predicate);
        }

        return root;
    }
}
