package com.imousan.test.repo;

import org.springframework.stereotype.Repository;

import com.imousan.test.domain.entity.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Roy Yang
 * 6/5/2015
 */
@Repository
public class UserRepoPureJpa {
    @PersistenceContext
    private EntityManager em;

    public User find(Long id) {
        return em.find(User.class, id);
    }

    public List<User> findAll() {
//        CriteriaQuery<User> query = em.getCriteriaBuilder().createQuery(User.class);
//        Root<User> root = query.from(User.class);
//        query.select(root);
//        return em.createQuery(query).getResultList();
        return em.createQuery("from User", User.class).getResultList();
    }

    public void add(User user) {
        if (user.isNew()) {
            em.persist(user);
        } else {
            em.merge(user);
        }
    }

    public void delete(Long id) {
        User user = find(id);
        if (user == null) {
            throw new RuntimeException(String.format("No User with %s exists.", id));
        }
        em.remove(user);
    }
}
