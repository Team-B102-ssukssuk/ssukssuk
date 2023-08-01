package com.ssafy.ssuk.collection.controller;

import com.ssafy.ssuk.collection.dto.response.CollectionSearchResponseDto;
import com.ssafy.ssuk.collection.service.CollectionService;
import com.ssafy.ssuk.plant.dto.response.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/collection")
@RequiredArgsConstructor
public class CollectionController {

    private final CollectionService collectionService;

    @GetMapping("")
    public ResponseEntity<ResponseDto> searchCollections(@RequestAttribute Integer userId) {
        // user확인안했넹...
        List<CollectionSearchResponseDto> returnDto = collectionService.findAllByUserId(userId);
        return new ResponseEntity<>(new ResponseDto("ok", "collections", returnDto), HttpStatus.OK);
    }
}
