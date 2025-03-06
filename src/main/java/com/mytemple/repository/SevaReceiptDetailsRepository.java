package com.mytemple.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mytemple.entity.SevaReceiptDetails;
@Repository
public interface SevaReceiptDetailsRepository extends JpaRepository<SevaReceiptDetails, Integer>{

    @Query(value = "SELECT receipt_no FROM t_seva_receipt_details ORDER BY CAST(receipt_no AS SIGNED) DESC LIMIT 1;", nativeQuery = true)
    Long findLatestReceiptNumber();
    
    @Query("SELECT s FROM SevaReceiptDetails s WHERE s.mobile_no = :mobileNo ORDER BY s.id DESC")
    List<SevaReceiptDetails> findByMobileNoOrderByIdDesc(@Param("mobileNo") String mobileNo, Pageable pageable);
    

    
}
