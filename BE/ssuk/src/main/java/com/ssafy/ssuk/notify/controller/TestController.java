package com.ssafy.ssuk.notify.controller;

import com.ssafy.ssuk.pot.dto.requset.PotInsertDto;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {

    private static final String EXPO_PUSH_API_URL = "https://exp.host/--/api/v2/push/send";
    //private static final String EXPO_PUSH_TOKEN = "ExponentPushToken[mwb75mLXxguCpfxMmtzy-2]";

    private static final String EXPO_PUSH_TOKEN = "ExponentPushToken[7psLXVD6U22E9wNznpIlOZ]";

    @PostMapping("/send-push")
    public String sendPushNotification(@RequestBody PotInsertDto potInsertDto) {
        try {
            CloseableHttpClient httpClient = HttpClients.createDefault();
            HttpPost httpPost = new HttpPost(EXPO_PUSH_API_URL);
            httpPost.addHeader("Accept", "application/json");
            httpPost.addHeader("Content-Type", "application/json");

            // Replace YOUR_EXPO_PUSH_TOKEN with your actual Expo push token
            httpPost.addHeader("Expo-Push-Token", EXPO_PUSH_TOKEN);

            // Create the JSON payload for the push notification
            String payload = "{\n" +
                    "  \"to\": \"" + EXPO_PUSH_TOKEN + "\",\n" +
                    "  \"title\": \"" + "hi " + "\",\n" +
                    "  \"body\": \"" + "TT" + "\"\n" +
                    "}";

            HttpEntity entity = new StringEntity(payload);
            httpPost.setEntity(entity);

            // Send the POST request to Expo Push API
            HttpResponse response = httpClient.execute(httpPost);

            // Check the response status (200 indicates success)
            if (response.getStatusLine().getStatusCode() == 200) {
                return "Push notification sent successfully!";
            } else {
                return "Failed to send push notification!";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Error occurred while sending push notification!";
        }
    }
}
