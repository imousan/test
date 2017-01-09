package org.imousan.easyspring.support;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public class AppCtxUtils implements ApplicationContextAware {
    private static ApplicationContext ac;
    
    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
       
        AppCtxUtils.ac = applicationContext;
    }
    
    public static <T> T getBean(Class<T> clazz) {
        return ac.getBean(clazz);
    }
}
