package org.imousan.easyspring.support.jpa.entity.converter;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.Date;

/**
 * The JPA {@link javax.persistence.Converter} for {@link java.util.Date}, if application need support i18n, or is used in global, we'd better use this solution.
 * <pre>
 *     {@code
 *      &#064Entity
 *      public class EntityClass {
 *          &#064Convert(converter = JdkDateConverter.class)
 *          private Date updateTime;
 *
 *          // setters and getters
 *
*       }
 *     }
 * </pre>
 *
 * @author Roy Yang
 */

@Converter
public class JdkDateConverter implements AttributeConverter<Date, Long> {
    @Override
    public Long convertToDatabaseColumn(Date dateTime) {
        if (dateTime == null)
            return null;

        return dateTime.getTime();
    }

    @Override
    public Date convertToEntityAttribute(Long milliseconds) {
        if (milliseconds == null) {
            return null;
        }

        return new Date(milliseconds);
    }
}
