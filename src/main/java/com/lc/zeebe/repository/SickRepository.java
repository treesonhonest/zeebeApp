package com.lc.zeebe.repository;

import com.lc.zeebe.domain.Sick;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Sick entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SickRepository extends JpaRepository<Sick, Long> {
}
