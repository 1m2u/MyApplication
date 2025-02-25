package com.mytemple.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="t_seva_details")
public class SevaDetails {

	@Id
	@Column(name="sevacode")
	private String sevaCode;
	
	@Column(name="sevaname")
	private String sevaName;
	
	@Column(name="amount")
	private Double amount;
	
	public SevaDetails() {}

	public String getSevaCode() {
		return sevaCode;
	}

	public void setSevaCode(String sevaCode) {
		this.sevaCode = sevaCode;
	}

	public String getSevaName() {
		return sevaName;
	}

	public void setSevaName(String sevaName) {
		this.sevaName = sevaName;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public SevaDetails(String sevaCode, String sevaName, Double amount) {
		super();
		this.sevaCode = sevaCode;
		this.sevaName = sevaName;
		this.amount = amount;
	}
	
	
}
