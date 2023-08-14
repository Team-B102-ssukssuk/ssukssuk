package com.ssafy.ssuk.collection.repository;

import com.ssafy.ssuk.collection.domain.Collection;

import java.util.List;

public interface CollectionRepository {
    List<Collection> findAllByUserId(Integer userId);

    Collection findOneByUserIdAndPlantIdAndLevel(Integer userId, Integer plantId, int level);

    void save(Collection collection);
}
