package com.ssafy.ssuk.plant.repository.query;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import com.ssafy.ssuk.plant.dto.response.*;

@Repository
@RequiredArgsConstructor
public class CategoryQueryRepositoryImpl implements CategoryQueryRepository {
    private final EntityManager em;

    @Override
    public List<TotalCategoryResponseDto> findTotalInfo() {
        // 전체 카테고리 조회
        List<TotalCategoryResponseDto> categories = findCategories();
        List<TotalPlantResponseDto> plants = findPlants();
        List<TotalInfoResponseDto> infos = findInfos();

        Map<Integer, List<TotalInfoResponseDto>> infoMap = infos.stream().collect(Collectors.groupingBy(pi -> pi.getPlantId()));
        plants.forEach(p -> p.setPlantInfos(infoMap.get(p.getPlantId())));

        Map<Integer, List<TotalPlantResponseDto>> plantMap = plants.stream().collect(Collectors.groupingBy(p -> p.getCategoryId()));
        categories.forEach(pc -> pc.setPlants(plantMap.get(pc.getCategoryId())));

        return categories;
    }

    /**
     * 아래 만들어 둔거 아까워서 만들어둠
     */
    @Override
    public List<TotalCategoryResponseDto> findTotalInfo(int userId) {
        List<TotalCategoryResponseDto> categories = findCategories();
        List<Integer> categoryIds = categories.stream().map(c -> c.getCategoryId()).collect(Collectors.toList());
        List<TotalPlantResponseDto> plants = findPlants(categoryIds);
        List<Integer> plantIds = plants.stream().map(p -> p.getPlantId()).collect(Collectors.toList());
        List<TotalInfoResponseDto> infos = findInfos(plantIds, userId);


        Map<Integer, List<TotalInfoResponseDto>> infoMap = infos.stream().collect(Collectors.groupingBy(pi -> pi.getPlantId()));
        plants.forEach(p -> p.setPlantInfos(infoMap.get(p.getPlantId())));

        Map<Integer, List<TotalPlantResponseDto>> plantMap = plants.stream().collect(Collectors.groupingBy(p -> p.getCategoryId()));
        categories.forEach(pc -> pc.setPlants(plantMap.get(pc.getCategoryId())));

        return categories;
    }

    private List<TotalCategoryResponseDto> findCategories() {
        return em.createQuery("select new com.ssafy.ssuk.plant.dto.response.TotalCategoryResponseDto(pc.id, pc.name) from Category pc"
                , TotalCategoryResponseDto.class).getResultList();
    }

    private List<TotalPlantResponseDto> findPlants() {
        return em.createQuery("select new com.ssafy.ssuk.plant.dto.response.TotalPlantResponseDto(pc.id, p.id, p.name, p.tempMax, p.tempMin, p.moistureMax, p.moistureMin, p.isDone)" +
                        " from Plant p" +
                        " join p.category pc", TotalPlantResponseDto.class)
                .getResultList();
    }

    private List<TotalInfoResponseDto> findInfos() {
        return em.createQuery("select new com.ssafy.ssuk.plant.dto.response.TotalInfoResponseDto(" +
                        "p.id, pi.level, pi.guide, pi.waterTerm, pi.waterAmount, pi.characterName, pi.characterComment" +
                        ")" +
                        " from Info pi" +
                        " join pi.plant p", TotalInfoResponseDto.class)
                .getResultList();
    }

    /**
     * 나중에 쓸 일이 있을까 싶어서 놔둠
     */
    private List<TotalCategoryResponseDto> findCategories(List<Integer> categoryIds) {
        return em.createQuery("select new com.ssafy.ssuk.plant.dto.response.TotalCategoryResponseDto(pc.id, pc.name) from Category pc" +
                        " where pc.id in :categoryIds", TotalCategoryResponseDto.class)
                .setParameter("categoryIds", categoryIds)
                .getResultList();
    }

    /**
     * 만들다 보니 전체 조회라 변수가 필요없었음...
     * 그래도 나중에 쓸 일이 있을까 싶어서 놔둠
     */
    private List<TotalPlantResponseDto> findPlants(List<Integer> categoryIds) {
        return em.createQuery("select new com.ssafy.ssuk.plant.dto.response.TotalPlantResponseDto(pc.id, p.id, p.name, p.tempMax, p.tempMin, p.moistureMax, p.moistureMin, p.isDone)" +
                        " from Plant p" +
                        " join p.category pc" +
                        " where pc.id in :categoryIds", TotalPlantResponseDto.class)
                .setParameter("categoryIds", categoryIds)
                .getResultList();
    }

    /**
     * 얘도 위와 마찬가지
     */
    private List<TotalInfoResponseDto> findInfos(List<Integer> plantIds, int userId) {
        return em.createQuery("select new com.ssafy.ssuk.plant.dto.response.TotalInfoResponseDto(" +
                        "p.id, pi.level, pi.guide, pi.waterTerm, pi.waterAmount, pi.characterName, pi.characterComment, c.createdDate" +
                        ")" +
                        " from Info pi" +
                        " join pi.plant p" +
                        " left join Collection c" +
                        " on c.id.userId = :userId" +
                        " and c.id.level = pi.level" +
                        " and c.id.plantId = p.id" +
                        " where p.id in :plantIds", TotalInfoResponseDto.class)
                .setParameter("plantIds", plantIds)
                .setParameter("userId", userId)
                .getResultList();
    }
}
