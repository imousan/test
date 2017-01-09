package com.imousan.test.domain.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.imousan.test.domain.entity.support.AuditableEntity;

@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"id"}))
public class User extends AuditableEntity {
    private static final long serialVersionUID = -4493586407128335117L;

    @Column
    private String id;
    @Column
    private String name;
    @Column(length = 100)
    private String email;

    private User() {
    }

    public User(String eid, String name, String email) {
        this.id = eid;
        this.name = name;
        this.email = email;
    }

    public String getEid() {
        return id;
    }

    public void setEid(String eid) {
        this.id = eid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
