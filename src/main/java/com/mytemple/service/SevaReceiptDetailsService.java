package com.mytemple.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mytemple.entity.SevaReceiptDetails;
import com.mytemple.repository.SevaReceiptDetailsRepository;

@Service
public class SevaReceiptDetailsService {

	@Autowired
	SevaReceiptDetailsRepository sevaReceiptDetailsRepository;
	
	public SevaReceiptDetails saveReceiptDetails(SevaReceiptDetails receiptDetails) {
        return sevaReceiptDetailsRepository.save(receiptDetails);
    }
	
	public String getLatestReceiptNumber() {
	    Long latestReceiptNo = sevaReceiptDetailsRepository.findLatestReceiptNumber();
	    
	    // Check if the returned value is null or an invalid value (like 0)
	    if (latestReceiptNo == null || latestReceiptNo <= 0) {
	        System.out.println("No receipt found, returning default Receipt No: 01");
	        return "01";
	    } else {
	        latestReceiptNo++; // Increment receipt number
	        System.out.println("Receipt No:- " + latestReceiptNo);
	        return String.valueOf(latestReceiptNo); // Return incremented number as string
	    }
	}

	    
	


}
