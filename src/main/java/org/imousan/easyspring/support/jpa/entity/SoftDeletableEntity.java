package org.imousan.easyspring.support.jpa.entity;

import javax.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class SoftDeletableEntity extends IdEntity {
    private static final long serialVersionUID = -6702881913974079253L;
    private Boolean removed = Boolean.FALSE;
    
    public Boolean getRemoved() {
        return removed;
    }
    public void setRemoved(Boolean removed) {
        this.removed = removed;
    }
    
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = super.hashCode();
        result = prime * result + ((removed == null) ? 0 : removed.hashCode());
        return result;
    }
    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (!super.equals(obj))
            return false;
        if (getClass() != obj.getClass())
            return false;
        SoftDeletableEntity other = (SoftDeletableEntity) obj;
        if (removed == null) {
            if (other.removed != null)
                return false;
        } else if (!removed.equals(other.removed))
            return false;
        return true;
    }
    
}
