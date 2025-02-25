package com.mytemple.service;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mytemple.entity.Gotram;
import com.mytemple.entity.GotramNameDTO;
import com.mytemple.repository.GotramRepository;

@Service
public class GotramService {
    @Autowired
    private GotramRepository gotramRepository;

    public List<GotramNameDTO> getGotramName() {
//        return gotramRepository.findAll();
    	List<Gotram> gotrams = gotramRepository.findAll();
        return gotrams.stream()
                      .map(gotram -> new GotramNameDTO(gotram.getGothramName()))
                      .collect(Collectors.toList());
    }
}