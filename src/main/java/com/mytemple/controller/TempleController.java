package com.mytemple.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mytemple.entity.GotramNameDTO;
import com.mytemple.entity.LoginRequest;
import com.mytemple.entity.Occasion;
import com.mytemple.entity.SevaDetails;
import com.mytemple.entity.SevaReceiptDetails;
import com.mytemple.service.AuthService;
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
    private AuthService authService;


//	    @PostMapping("/login")
//	    public String login(@RequestBody Map<String, String> payload) {
//	        String userid = payload.get("userid");
//	        String password = payload.get("password");
//
//	        return userRepository.findByUseridAndPassword(userid, password)
//	                .map(user -> "Login successful")
//	                .orElse("Invalid credentials");
//	    }
//	    
	 
    @PostMapping("/login")
    public boolean verifyUser(@RequestBody Map<String, String> request) {
        String userid = request.get("email");
        String password = request.get("password");
//        System.out.println("userid: "+userid);
//        System.out.println("password: "+password);
        return authService.checkUser(userid, password);
    }
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
	   System.out.println(receiptDetails.toString());
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
   @GetMapping("/lookup/{mobileNo}")
   public ResponseEntity<SevaReceiptDetails> lookupByMobile(@PathVariable String mobileNo) {
       SevaReceiptDetails devotee = sevaReceiptDetailsService.findByMobileNumber(mobileNo);
       
       if (devotee != null) {
           // Return the found record with 200 OK status
           return ResponseEntity.ok(devotee);
       } else {
           // Return 404 Not Found if no record exists with this mobile number
           return ResponseEntity.ok(null);
       }
   }
}
