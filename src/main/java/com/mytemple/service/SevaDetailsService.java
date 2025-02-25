package com.mytemple.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mytemple.entity.SevaDetails;
import com.mytemple.repository.SevaRepository;

@Service
public class SevaDetailsService {

	@Autowired
	private SevaRepository sevaRepository;
	public List<SevaDetails> getSevaDetails() {
        return sevaRepository.findAll();
    }
}
