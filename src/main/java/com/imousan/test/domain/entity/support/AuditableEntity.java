package com.imousan.test.domain.entity.support;

import org.imousan.easyspring.support.jpa.entity.SoftDeletableEntity;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.util.Date;

/**
 * @author Roy Yang
 */
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class AuditableEntity extends SoftDeletableEntity {
    private static final long serialVersionUID = -488403862865872215L;

    @Column
    @CreatedBy
    private String logCreatedBy;

    @CreatedDate
    private Date logCreatedDate;

    @Column
    @LastModifiedBy
    private String logLastModifiedBy;

    @LastModifiedDate
    private Date logLastModifiedDate;

}
