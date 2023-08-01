package com.ssafy.ssuk.collection.service;

import com.ssafy.ssuk.collection.domain.Collection;
import com.ssafy.ssuk.collection.dto.response.CollectionSearchResponseDto;
import com.ssafy.ssuk.collection.repository.CollectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CollectionServiceImpl implements CollectionService {

    private final CollectionRepository collectionRepository;

    @Override
    public List<CollectionSearchResponseDto> findAllByUserId(Integer userId) {
        return collectionRepository.findAllByUserId(userId)
                .stream()
                .map(c -> new CollectionSearchResponseDto(c)).collect(Collectors.toList());
    }
}
