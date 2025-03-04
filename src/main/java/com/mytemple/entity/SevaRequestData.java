package com.mytemple.entity;

public class SevaRequestData {

    private Long receiptNo;
    private String phoneNo;
    private String firstName;
    private String lastName;
    private String addressLine1;
    private String addressLine2;
    private String occasion;
    private String gotram;
    private String nakshtram;
    private String raasi;
    private String mode;

    private String[] sevaNames;
    private String[] sevaDates;
    private Integer[] total;

    // Getters and Setters
    public Long getReceiptNo() { return receiptNo; }
    public void setReceiptNo(Long receiptNo) { this.receiptNo = receiptNo; }

    public String getPhoneNo() { return phoneNo; }
    public void setPhoneNo(String phoneNo) { this.phoneNo = phoneNo; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getAddressLine1() { return addressLine1; }
    public void setAddressLine1(String addressLine1) { this.addressLine1 = addressLine1; }

    public String getAddressLine2() { return addressLine2; }
    public void setAddressLine2(String addressLine2) { this.addressLine2 = addressLine2; }

    public String getOccasion() { return occasion; }
    public void setOccasion(String occasion) { this.occasion = occasion; }

    public String getGotram() { return gotram; }
    public void setGotram(String gotram) { this.gotram = gotram; }

    public String getNakshtram() { return nakshtram; }
    public void setNakshtram(String nakshtram) { this.nakshtram = nakshtram; }

    public String getRaasi() { return raasi; }
    public void setRaasi(String raasi) { this.raasi = raasi; }

    public String getMode() { return mode; }
    public void setMode(String mode) { this.mode = mode; }

    public String[] getSevaNames() { return sevaNames; }
    public void setSevaNames(String[] sevaNames) { this.sevaNames = sevaNames; }

    public String[] getSevaDates() { return sevaDates; }
    public void setSevaDates(String[] sevaDates) { this.sevaDates = sevaDates; }

    public Integer[] getTotal() { return total; }
    public void setTotal(Integer[] total) { this.total = total; }
}
