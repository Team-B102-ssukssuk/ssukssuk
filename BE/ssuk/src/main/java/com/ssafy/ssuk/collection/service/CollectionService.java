package com.ssafy.ssuk.collection.service;

import com.ssafy.ssuk.collection.dto.response.CollectionSearchResponseDto;

import java.util.List;

public interface CollectionService {
    List<CollectionSearchResponseDto> findAllByUserId(Integer userId);
}
