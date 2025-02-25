package com.mytemple.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mytemple.entity.Occasion;
@Repository
public interface OccasionRepository extends JpaRepository<Occasion, Integer> {
//    List<String> findAllBy();

}
