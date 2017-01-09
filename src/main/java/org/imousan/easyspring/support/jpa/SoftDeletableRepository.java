package org.imousan.easyspring.support.jpa;

import java.io.Serializable;
import java.util.List;

import org.imousan.easyspring.support.jpa.entity.SoftDeletableEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface SoftDeletableRepository<T extends SoftDeletableEntity, ID extends Serializable>
        extends EnhancedRepository<T, ID>, JpaSpecificationExecutor<T> {
    public List<T> findAllAlive();
    public List<T> findAllAlive(Sort sort);
    public Page<T> findAllAlive(Pageable pageable);
    public T findOneAlive(ID id);
    
    public List<T> findAllAlive(Specification<T> spec);
    public List<T> findAllAlive(Specification<T> spec, Sort sort);
    public Page<T> findAllAlive(Specification<T> spec, Pageable pageable);
    public T findOneAlive(Specification<T> spec);
    
    public void softDelete(ID id);
    public void softDelete(T entity);
    public void softDelete(T... entities);

    public long countAlive(Specification<T> spec);

    public long countAlive();
}
