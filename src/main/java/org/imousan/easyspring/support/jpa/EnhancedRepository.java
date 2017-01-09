package org.imousan.easyspring.support.jpa;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.NoRepositoryBean;

/**
 * I can be used instead of {@link JpaRepository}.
 * <p>
 * Require JPA 2.1 and above.
 * </p>
 *
 * @author Roy Yang
 */
@NoRepositoryBean
public interface EnhancedRepository<T, ID extends Serializable>
        extends JpaRepository<T, ID>, JpaSpecificationExecutor<T> {

    /**
     * A query method to return single customized result.
     * @param spec the specification, cannot be null
     * @return the single customized result
     */
    public Object find(Specification spec);

    /**
     * A query method to return multiple customized result.
     * @param spec the specification, cannot be null
     * @return the multiple customized result
     */
    public List<Object> findSome(Specification spec);

    /**
     * Find the entity id(s), generally, this is used to update bulk of data, and JPA do not want to load all data
     * one time.
     * @param spec the specification, cannot be null
     * @return the id(s)
     */
    public List<Long> findIds(Specification spec);

    /**
     * Support JPA 2.1 bulk delete operation.
     * @param spec in the {@link Specification#toPredicate(javax.persistence.criteria.Root, javax.persistence.criteria.CriteriaQuery, javax.persistence.criteria.CriteriaBuilder)},
     *             the {@link org.hibernate.criterion.CriteriaQuery} parameter would always be <code>null</code>.
     */
    public void delete(Specification spec);

    void refresh(T entity);

    void detach(T entity);
}
