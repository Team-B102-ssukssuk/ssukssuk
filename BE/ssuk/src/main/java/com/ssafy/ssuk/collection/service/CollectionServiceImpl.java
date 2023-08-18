package com.ssafy.ssuk.collection.service;

import com.ssafy.ssuk.collection.domain.Collection;
import com.ssafy.ssuk.collection.domain.id.CollectionId;
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

    @Override
    public boolean checkExists(Integer userId, Integer plantId, int level) {
        if (collectionRepository.findOneByUserIdAndPlantIdAndLevel(userId, plantId, level) == null) {
            return false;
        } else {
            return true;
        }
    }

    @Override
    @Transactional
    public void save(Integer userId, Integer plantId, int level) {
        Collection collection = new Collection(new CollectionId(userId, plantId, level));
        collectionRepository.save(collection);
    }
}
