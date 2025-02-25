package com.mytemple.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="t_occasion")
public class Occasion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;
    
    @Column(name="occasion_name")
    private String occasionName;
    
    public Occasion() {
        
    }
    
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getOccasionName() {
        return occasionName;
    }
    public void setOccasionName(String occasionName) {
        this.occasionName = occasionName;
    }
    public Occasion(int id, String occasionName) {
        super();
        this.id = id;
        this.occasionName = occasionName;
    }
}
