package com.ssafy.ssuk.notify.repository;

import com.ssafy.ssuk.notify.domain.Fcm;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FcmRepository {

    @Query
    Optional<Fcm> findByUser_Id(Integer userId);
}
