package com.imousan.test.web;

import com.imousan.test.domain.entity.User;
import com.imousan.test.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Roy Yang
 * 6/5/2015
 */
@RestController
@RequestMapping("users")
public class UserController {
    @Autowired
    private UserService service;

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public User getUser(@PathVariable Long id) {
        return service.get(id);
    }

    @RequestMapping(value = "me", method = RequestMethod.GET)
    public User me() {
        return new User("123","wang","test@test.com");
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<User> getNonOrdinaryUsers(@RequestParam(required = false) String filter) {

        return service.getAll();
    }
}
