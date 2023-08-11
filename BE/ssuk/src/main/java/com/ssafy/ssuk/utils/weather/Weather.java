package com.ssafy.ssuk.utils.weather;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.ssuk.exception.dto.CustomException;
import com.ssafy.ssuk.exception.dto.ErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.List;
import java.util.Map;

@Slf4j
@Component
public class Weather {

    @Value("${weather.key}")
    private static String KEY;

    /**
     * 강수형태(PTY) 코드 : (초단기) 없음(0), 비(1), 비/눈(2), 눈(3), 빗방울(5), 빗방울눈날림(6), 눈날림(7)
     */
    public int getWeather(String date, String time, int nx, int ny) throws IOException, JSONException {
        log.debug("{} {} {} {}", date, time, nx, ny);
        StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst"); /*URL*/
        urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=" + KEY); /*Service Key*/
        urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지번호*/
        urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("1000", "UTF-8")); /*한 페이지 결과 수*/
        urlBuilder.append("&" + URLEncoder.encode("dataType","UTF-8") + "=" + URLEncoder.encode("JSON", "UTF-8")); /*요청자료형식(XML/JSON) Default: XML*/
        urlBuilder.append("&" + URLEncoder.encode("base_date","UTF-8") + "=" + URLEncoder.encode(date, "UTF-8")); /*‘21년 6월 28일 발표 20210628*/
        urlBuilder.append("&" + URLEncoder.encode("base_time","UTF-8") + "=" + URLEncoder.encode(time, "UTF-8")); /*06시 발표(정시단위) 0600*/
        urlBuilder.append("&" + URLEncoder.encode("nx","UTF-8") + "=" + URLEncoder.encode(String.valueOf(nx), "UTF-8")); /*예보지점의 X 좌표값*/
        urlBuilder.append("&" + URLEncoder.encode("ny","UTF-8") + "=" + URLEncoder.encode(String.valueOf(ny), "UTF-8")); /*예보지점의 Y 좌표값*/
//        log.debug("urlBuilder={}", urlBuilder);
        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
//        System.out.println("Response code: " + conn.getResponseCode());
        BufferedReader rd;
        if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        rd.close();
        conn.disconnect();
        log.debug("---------------------------------------------------------------------------------------");
        log.debug(sb.toString());
        log.debug("---------------------------------------------------------------------------------------");

        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> map = objectMapper.readValue(sb.toString(), Map.class);
//        log.debug("return");
//        map.keySet().forEach(k -> log.debug("{}:{}", k, map.get(k)));
//        log.debug("---------------------------------------------------------------------------------------");
        Map<String, Object> response = (Map<String, Object>) map.get("response");
//        log.debug("response");
//        response.keySet().forEach(k -> log.debug("{}={}", k, response.get(k)));
//        log.debug("---------------------------------------------------------------------------------------");
        Map<String, Object> body = (Map<String, Object>) response.get("body");
//        log.debug("body");
//        body.keySet().forEach(k -> log.debug("{}={}", k, body.get(k)));
//        log.debug("---------------------------------------------------------------------------------------");
        List<Map<String, String>> items = (List<Map<String, String>>)((Map<String, Object>) body.get("items")).get("item");
//        log.debug("items");
//        items.forEach(item -> log.debug("item={}", item));
//        log.debug("---------------------------------------------------------------------------------------");
        Map<String, String> ptyItem = items
                .stream()
                .filter(item -> item.get("category").equals("PTY"))
                .findAny()
                .orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        log.debug("ptyItem={}", ptyItem);

        // 강수형태(PTY) 코드 : (초단기) 없음(0), 비(1), 비/눈(2), 눈(3), 빗방울(5), 빗방울눈날림(6), 눈날림(7)
        int value = Integer.parseInt(ptyItem.get("obsrValue"));
        return value;
    }
}
