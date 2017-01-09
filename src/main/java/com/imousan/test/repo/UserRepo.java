package com.imousan.test.repo;

import org.imousan.easyspring.support.jpa.EnhancedRepository;
import org.springframework.stereotype.Repository;

import com.imousan.test.domain.entity.User;

/**
 * Roy Yang
 * 6/12/2015
 */
@Repository
public interface UserRepo extends EnhancedRepository<User, Long>{
    User findByEidIgnoreCase(String eid);
}
