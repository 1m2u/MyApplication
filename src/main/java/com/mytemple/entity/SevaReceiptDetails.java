package com.mytemple.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="t_seva_receipt_details")
public class SevaReceiptDetails {



	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Integer id;
	
   @Column(name="receipt_no")
   private String receipt_no;
   
   @Column(name="mobile_no")
   private String mobile_no;
   
   @Column(name="first_name")
   private String first_name;
   
   @Column(name="last_name")
   private String last_name;
   
   @Column(name="address_line1")
   private String address_line1;
   
   @Column(name="address_line2")
   private String address_line2;
   
//   @Column(name="occasion")
//   private String occasion;
//   
   @Column(name="gotram")
   private String gotram;
   
   @Column(name="nakshtram")
   private String nakshtram;
   
//   @Column(name="raasi")
//   private String raasi;
   
   @Column(name="payment_mode")
   private String payment_mode;
   
   @Column(name="check_no")
   private String check_no;
   
   @Column(name="check_date")
   private String check_date;
   
   @Column(name="seva_name")
   private String seva_name;
   
   @Column(name="seva_date")
   private String seva_date;
   
   @Column(name="amount")
   private String amount;

public String getCheck_no() {
	return check_no;
}

public void setCheck_no(String check_no) {
	this.check_no = check_no;
}

public String getCheck_date() {
	return check_date;
}

public void setCheck_date(String check_date) {
	this.check_date = check_date;
}

public SevaReceiptDetails() {}



public SevaReceiptDetails(Integer id, String receipt_no, String mobile_no, String first_name, String last_name,
		String address_line1, String address_line2, String gotram, String nakshtram, String payment_mode,
		String check_no, String check_date, String seva_name, String seva_date, String amount) {
	super();
	this.id = id;
	this.receipt_no = receipt_no;
	this.mobile_no = mobile_no;
	this.first_name = first_name;
	this.last_name = last_name;
	this.address_line1 = address_line1;
	this.address_line2 = address_line2;
	this.gotram = gotram;
	this.nakshtram = nakshtram;
	this.payment_mode = payment_mode;
	this.check_no = check_no;
	this.check_date = check_date;
	this.seva_name = seva_name;
	this.seva_date = seva_date;
	this.amount = amount;
}

public int getId() {
	return id;
}

public void setId(int id) {
	this.id = id;
}

public String getReceipt_no() {
	return receipt_no;
}

public void setReceipt_no(String receipt_no) {
	this.receipt_no = receipt_no;
}

public String getMobile_no() {
	return mobile_no;
}

public void setMobile_no(String mobile_no) {
	this.mobile_no = mobile_no;
}

public String getFirst_name() {
	return first_name;
}

public void setFirst_name(String first_name) {
	this.first_name = first_name;
}

public String getLast_name() {
	return last_name;
}

public void setLast_name(String last_name) {
	this.last_name = last_name;
}

public String getAddress_line1() {
	return address_line1;
}

public void setAddress_line1(String address_line1) {
	this.address_line1 = address_line1;
}

public String getAddress_line2() {
	return address_line2;
}

public void setAddress_line2(String address_line2) {
	this.address_line2 = address_line2;
}

//public String getOccasion() {
//	return occasion;
//}
//
//public void setOccasion(String occasion) {
//	this.occasion = occasion;
//}

public String getGotram() {
	return gotram;
}

public void setGotram(String gotram) {
	this.gotram = gotram;
}

public String getNakshtram() {
	return nakshtram;
}

public void setNakshtram(String nakshtram) {
	this.nakshtram = nakshtram;
}

//public String getRaasi() {
//	return raasi;
//}
//
//public void setRaasi(String raasi) {
//	this.raasi = raasi;
//}

public String getPayment_mode() {
	return payment_mode;
}

public void setPayment_mode(String payment_mode) {
	this.payment_mode = payment_mode;
}

public String getSeva_name() {
	return seva_name;
}

public void setSeva_name(String seva_name) {
	this.seva_name = seva_name;
}

public String getSeva_date() {
	return seva_date;
}

public void setSeva_date(String seva_date) {
	this.seva_date = seva_date;
}

public String getAmount() {
	return amount;
}

public void setAmount(String amount) {
	this.amount = amount;
}

}
