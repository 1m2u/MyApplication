package com.mytemple.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mytemple.entity.SevaReceiptDetails;
import com.mytemple.repository.SevaReceiptDetailsRepository;

@Service
public class SevaReceiptDetailsService {

	@Autowired
	SevaReceiptDetailsRepository sevaReceiptDetailsRepository;
	
	public SevaReceiptDetails saveReceiptDetails(SevaReceiptDetails receiptDetails) {
        return sevaReceiptDetailsRepository.save(receiptDetails);
    }
	@Transactional
    public void saveSevaData(List<SevaReceiptDetails> sevaDataList) {
		sevaReceiptDetailsRepository.saveAll(sevaDataList);
    }
	
	public String getLatestReceiptNumber() {
	    Long latestReceiptNo = sevaReceiptDetailsRepository.findLatestReceiptNumber();
	    
	    // Check if the returned value is null or an invalid value (like 0)
	    if (latestReceiptNo == null || latestReceiptNo <= 0) {
	        System.out.println("No receipt found, returning default Receipt No: 01");
	        return "1";
	    } else {
	        latestReceiptNo++; // Increment receipt number
	        System.out.println("Receipt No:- " + latestReceiptNo);
	        return String.valueOf(latestReceiptNo); // Return incremented number as string
	    }
	}
	
	 public SevaReceiptDetails findByMobileNumber(String mobileNo) {
	        if (mobileNo == null || mobileNo.isEmpty()) {
	            return null;
	        }
	        
	        // Get only the first record (most recent one) using PageRequest
	        List<SevaReceiptDetails> results = 
	            sevaReceiptDetailsRepository.findByMobileNoOrderByIdDesc(mobileNo, PageRequest.of(0, 1));
	        
	        return results.isEmpty() ? null : results.get(0);
	    }

	
	

	    
	


}
