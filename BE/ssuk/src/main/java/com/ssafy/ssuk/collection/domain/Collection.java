package com.ssafy.ssuk.collection.domain;

import com.ssafy.ssuk.collection.domain.id.CollectionId;
import com.ssafy.ssuk.plant.domain.Info;
import com.ssafy.ssuk.user.domain.User;
import lombok.Getter;

import javax.persistence.*;

import java.time.LocalDateTime;

import static javax.persistence.FetchType.*;

@Entity
@Table(name = "COLLECTION")
@Getter
public class Collection {
    @EmbeddedId
    private CollectionId id;
    @Column(name = "CREATED_DATE")
    private LocalDateTime createdDate;
}
