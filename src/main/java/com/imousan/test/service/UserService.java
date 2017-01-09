package com.imousan.test.service;

import com.imousan.test.domain.entity.User;
import com.imousan.test.repo.UserRepo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Roy Yang
 * 6/5/2015
 */
@Service
public class UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepo repo;

    public List<User> getAll() {
        return repo.findAll();
    }

    public User get(Long id){
        return repo.findOne(id);
    }

}
