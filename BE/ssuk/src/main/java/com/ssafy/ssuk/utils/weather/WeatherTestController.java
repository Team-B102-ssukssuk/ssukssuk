package com.ssafy.ssuk.utils.weather;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
public class WeatherTestController {

    private final Weather weather;

    @GetMapping("/weather")
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
