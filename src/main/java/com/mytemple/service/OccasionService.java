package com.mytemple.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mytemple.entity.Occasion;
import com.mytemple.repository.OccasionRepository;
@Service
public class OccasionService {

	 @Autowired
	    private OccasionRepository occasionRepository;

	    public List<Occasion> getAllOccasions() {
	        return occasionRepository.findAll();
	    }
}
