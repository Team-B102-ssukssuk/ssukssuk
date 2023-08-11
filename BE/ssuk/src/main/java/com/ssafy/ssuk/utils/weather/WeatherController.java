package com.ssafy.ssuk.utils.weather;

import com.ssafy.ssuk.exception.dto.CustomException;
import com.ssafy.ssuk.exception.dto.ErrorCode;
import com.ssafy.ssuk.utils.response.CommonResponseEntity;
import com.ssafy.ssuk.utils.response.SuccessCode;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/weather")
@RequiredArgsConstructor
public class WeatherController {

    private final Weather weather;

    /**
     * 강수형태(PTY) 코드 : (초단기) 없음(0), 비(1), 비/눈(2), 눈(3), 빗방울(5), 빗방울눈날림(6), 눈날림(7)
     */
    @GetMapping("")
    public ResponseEntity<CommonResponseEntity> getWeatherInDaejeon() {
        int result;

        try {
            result = weather.getWeather(DateTimeFormatter.ofPattern("yyyyMMdd").format(LocalDate.now()),
                    DateTimeFormatter.ofPattern("hhmm").format(LocalDateTime.now()),
                    67,
                    101);
        } catch (Exception e) {
            throw new CustomException(ErrorCode.WEATHER_NOT_FOUND);
        }

        return CommonResponseEntity.getResponseEntity(SuccessCode.SUCCESS_CODE, result);
    }

//    @GetMapping("")
    public ResponseEntity<Integer> test(@RequestParam String date, @RequestParam String time, @RequestParam Integer nx, @RequestParam Integer ny) {
        int result;

        try {
            result = weather.getWeather(date, time, nx, ny);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
