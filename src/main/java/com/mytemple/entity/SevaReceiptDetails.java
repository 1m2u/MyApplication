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
   private Long receipt_no;
   
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
   
   @Column(name="occasion")
   private String occasion;
   
   @Column(name="gotram")
   private String gotram;
   
   @Column(name="nakshtram")
   private String nakshtram;
   
   @Column(name="raasi")
   private String raasi;
   
   @Column(name="payment_mode")
   private String payment_mode;
   
   @Column(name="seva_name")
   private String seva_name;
   
   @Column(name="seva_date")
   private String seva_date;
   
   @Column(name="amount")
   private Double amount;

public SevaReceiptDetails() {}

public SevaReceiptDetails(int id, Long receipt_no, String mobile_no, String first_name, String last_name,
		String address_line1, String address_line2, String occasion, String gotram, String nakshtram, String raasi,
		String payment_mode, String seva_name, String seva_date, Double amount) {
	super();
	this.id = id;
	this.receipt_no = receipt_no;
	this.mobile_no = mobile_no;
	this.first_name = first_name;
	this.last_name = last_name;
	this.address_line1 = address_line1;
	this.address_line2 = address_line2;
	this.occasion = occasion;
	this.gotram = gotram;
	this.nakshtram = nakshtram;
	this.raasi = raasi;
	this.payment_mode = payment_mode;
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

public Long getReceipt_no() {
	return receipt_no;
}

public void setReceipt_no(Long receipt_no) {
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

public String getOccasion() {
	return occasion;
}

public void setOccasion(String occasion) {
	this.occasion = occasion;
}

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

public String getRaasi() {
	return raasi;
}

public void setRaasi(String raasi) {
	this.raasi = raasi;
}

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

public Double getAmount() {
	return amount;
}

public void setAmount(Double amount) {
	this.amount = amount;
}

}
