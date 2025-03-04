package com.mytemple.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mytemple.entity.SevaReceiptDetails;
@Repository
public interface SevaReceiptDetailsRepository extends JpaRepository<SevaReceiptDetails, Integer>{

    @Query(value = "SELECT receipt_no FROM t_seva_receipt_details ORDER BY receipt_no DESC LIMIT 1", nativeQuery = true)
    Long findLatestReceiptNumber();
    
    
}
