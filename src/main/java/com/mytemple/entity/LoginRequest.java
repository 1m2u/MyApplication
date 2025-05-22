package com.mytemple.entity;

public class LoginRequest {

	 private String userid;
	    private String password;
	    
	    // Constructors
	    public LoginRequest() {}
	    
	    public LoginRequest(String userid, String password) {
	        this.userid = userid;
	        this.password = password;
	    }
	    
	    // Getters and Setters
	    public String getUserid() { return userid; }
	    public void setUserid(String userid) { this.userid = userid; }
	    
	    public String getPassword() { return password; }
	    public void setPassword(String password) { this.password = password; }
}
