package org.imousan.easyspring.support.jpa.entity.converter;

import org.joda.time.DateTime;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

/**
 * The JPA {@link Converter} for {@link org.joda.time.DateTime}, if application need support i18n, or is used in global, we'd better use this solution.
 * <pre>
 *     {@code
 *      &#064Entity
 *      public class EntityClass {
 *          &#064Convert(converter = JodaDateTimeConverter.class)
 *          private DateTime updateTime;
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
public class JodaDateTimeConverter implements AttributeConverter<DateTime, Long> {
    @Override
    public Long convertToDatabaseColumn(DateTime dateTime) {
        if (dateTime == null)
            return null;

        return dateTime.getMillis();
    }

    @Override
    public DateTime convertToEntityAttribute(Long milliseconds) {
        if (milliseconds == null) {
            return null;
        }

        return new DateTime(milliseconds);
    }
}
