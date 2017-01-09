package com.imousan.test.web;


import org.imousan.easyspring.support.resource.PropertiesProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.imousan.test.service.UserService;

@Controller
@RequestMapping("/")
public class EntryController {
    private static final Logger logger = LoggerFactory.getLogger(EntryController.class);

    @Autowired
    private UserService userService;

    @RequestMapping(value = "loginFailed", method = RequestMethod.GET)
    public String loginFailed() {
        return "redirect:" +  PropertiesProvider.getProperty("logoutURL");
    }

    @RequestMapping(value = "logout", method = RequestMethod.GET)
    public String logout() {
        return "redirect:/";
    }

    @RequestMapping("/")
    public ModelAndView getMain(ModelMap model){
        return new ModelAndView("index", model);
    }
}
