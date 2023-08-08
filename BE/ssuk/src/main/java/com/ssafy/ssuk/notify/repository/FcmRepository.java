package com.ssafy.ssuk.notify.repository;

import com.ssafy.ssuk.notify.domain.Fcm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FcmRepository extends JpaRepository<Fcm, Integer> {

    @Query(value = "select f from Fcm f where f.user.id = :userId")
    Optional<Fcm> findByUser_Id(@Param("userId") Integer userId);


}
