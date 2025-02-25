package com.mytemple.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mytemple.entity.GotramNameDTO;
import com.mytemple.entity.Occasion;
import com.mytemple.entity.SevaDetails;
import com.mytemple.entity.SevaReceiptDetails;
import com.mytemple.repository.SevaReceiptDetailsRepository;
import com.mytemple.service.GotramService;
import com.mytemple.service.OccasionService;
import com.mytemple.service.SevaDetailsService;
import com.mytemple.service.SevaReceiptDetailsService;

@RestController
@RequestMapping("/mytemple")
public class TempleController {

	@Autowired
    private GotramService gotramService;
	@Autowired
	private OccasionService occasionService;
	@Autowired
	private SevaDetailsService sevaDetailsService;
	@Autowired
	private SevaReceiptDetailsService sevaReceiptDetailsService;
	 @Autowired
	private SevaReceiptDetailsRepository SevaReceiptDetailsRepository;

    @GetMapping("/gotrams")
    public List<GotramNameDTO> getGotramName() {
        return gotramService.getGotramName();
    }
    
   @GetMapping("/occasions")
    public List<String> getOccasions() {
        return occasionService.getAllOccasions().stream()
                .map(Occasion::getOccasionName)
                .collect(Collectors.toList());
    }
   
   @GetMapping("/sevadetails")
   public List<SevaDetails> getAllSevas() {
       return sevaDetailsService.getSevaDetails();
   }
   
   @PostMapping("/sevareceipt")
   public ResponseEntity<SevaReceiptDetails> addSevaReceiptDetails(@RequestBody SevaReceiptDetails receiptDetails) {
       SevaReceiptDetails savedDetails = sevaReceiptDetailsService.saveReceiptDetails(receiptDetails);
       return ResponseEntity.ok(savedDetails);
   }
   
   @GetMapping("/receiptno")
   public ResponseEntity<Map<String, String>> getLatestReceiptNumber() {
       String latestReceiptNo = sevaReceiptDetailsService.getLatestReceiptNumber(); 
       Map<String, String> response = new HashMap<>();
       response.put("receiptNo", latestReceiptNo); 
       return ResponseEntity.ok(response);
   }


}
