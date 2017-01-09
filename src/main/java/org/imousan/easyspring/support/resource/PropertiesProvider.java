package org.imousan.easyspring.support.resource;

import com.google.common.collect.Maps;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;

import java.util.HashSet;
import java.util.Map;
import java.util.Properties;

/**
 * @author Roy Yang
 */
public class PropertiesProvider extends PropertyPlaceholderConfigurer {
    private static Map<String, String> propertiesMap = Maps.newHashMap();

    @Override
    protected void processProperties(ConfigurableListableBeanFactory beanFactory,
                                     Properties props) throws BeansException {
        super.processProperties(beanFactory, props);

        for (Object key : props.keySet()) {
            String keyStr = key.toString();
            propertiesMap.put(keyStr, parseStringValue(props.getProperty(keyStr),
                    props, new HashSet()));
        }
    }

    public static String getProperty(String name) {
        return propertiesMap.get(name);
    }
}
