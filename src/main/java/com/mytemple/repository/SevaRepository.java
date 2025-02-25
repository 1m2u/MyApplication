package com.mytemple.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mytemple.entity.SevaDetails;
@Repository
public interface SevaRepository extends JpaRepository<SevaDetails, String>{

}
