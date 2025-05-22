package com.mytemple.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    @Query("SELECT COUNT(u) > 0 FROM User u WHERE u.userid = :userid AND u.password = :password")
    boolean verifyUserCredentials(@Param("userid") String userid, @Param("password") String password);
    
    User findByUserid(String userid);
}
