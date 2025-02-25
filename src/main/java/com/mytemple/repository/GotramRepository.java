package com.mytemple.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mytemple.entity.Gotram;

@Repository
public interface GotramRepository extends JpaRepository<Gotram, Long> {
    // Custom query methods (if any)
}

