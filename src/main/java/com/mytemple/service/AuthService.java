package com.mytemple.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
@Service
public class AuthService {
	@Autowired
    private JdbcTemplate jdbcTemplate;
    
    public boolean checkUser(String userid, String password) {
        if (userid == null || password == null) {
            return false;
        }
        
        try {
            String sql = "SELECT COUNT(*) FROM t_temple_users WHERE userid = ? AND password = ?";
            Integer count = jdbcTemplate.queryForObject(sql, Integer.class, userid, password);
            return count != null && count > 0;
        } catch (Exception e) {
            return false;
        }
    }
}
