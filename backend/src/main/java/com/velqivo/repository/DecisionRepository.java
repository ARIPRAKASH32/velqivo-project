package com.velqivo.repository;

import com.velqivo.model.Decision;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DecisionRepository extends JpaRepository<Decision, Long> {

    @Query("SELECT d FROM Decision d WHERE " +
           "LOWER(d.decisionText) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           "LOWER(d.reason) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           "LOWER(d.relatedTask) LIKE LOWER(CONCAT('%', :q, '%'))")
    List<Decision> search(@Param("q") String query);

    List<Decision> findByStatus(String status);

    List<Decision> findByOwner(String owner);
}
