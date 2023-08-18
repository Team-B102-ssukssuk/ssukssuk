package com.ssafy.ssuk.collection.domain;

import com.ssafy.ssuk.collection.domain.id.CollectionId;
import com.ssafy.ssuk.plant.domain.Info;
import com.ssafy.ssuk.user.domain.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

import java.time.LocalDateTime;

import static javax.persistence.FetchType.*;

@Entity
@Table(name = "COLLECTION")
@Getter
@DynamicInsert
@NoArgsConstructor
public class Collection {
    @EmbeddedId
    private CollectionId id;
    @Column(name = "CREATED_DATE")
    private LocalDateTime createdDate;

    public Collection(CollectionId id) {
        this.id = id;
    }
}
