package com.mytemple.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="t_gotram")
public class Gotram {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;  // Primary key
    
    @Column(name = "gothram_code")
    private String gothramCode;  // A field for the gothram code
    
    @Column(name = "gothram_name")
    private String gothramName;  // A field for the gothram name

    // Default constructor
    public Gotram() {
    }

    // Constructor with fields
    public Gotram(Long id, String gothramCode, String gothramName) {
        this.id = id;
        this.gothramCode = gothramCode;
        this.gothramName = gothramName;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGothramCode() {
        return gothramCode;
    }

    public void setGothramCode(String gothramCode) {
        this.gothramCode = gothramCode;
    }

    public String getGothramName() {
        return gothramName;
    }

    public void setGothramName(String gothramName) {
        this.gothramName = gothramName;
    }
}
