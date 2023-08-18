package com.ssafy.ssuk.notify.service;


import com.ssafy.ssuk.exception.dto.CustomException;
import com.ssafy.ssuk.exception.dto.ErrorCode;
import com.ssafy.ssuk.notify.domain.Fcm;
import com.ssafy.ssuk.notify.dto.TokenRequestDto;
import com.ssafy.ssuk.notify.mapper.FcmMapper;
import com.ssafy.ssuk.notify.repository.FcmRepository;
import com.ssafy.ssuk.notify.repository.NotificationRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Optional;

@Slf4j
@Service
public class FcmService {
    private final FcmRepository fcmRepository;
    private final FcmMapper fcmMapper;

    @Autowired
    public FcmService(FcmRepository fcmRepository, FcmMapper fcmMapper) {
        this.fcmRepository = fcmRepository;
        this.fcmMapper = fcmMapper;
    }

    //유저가 토큰을 가지고 있는지 체크
    public void checkTokenByUser_Id(Integer userId, TokenRequestDto tokenRequestDto) {
        Optional<Fcm> findFcm = fcmRepository.findByUser_Id(userId);
        //save
        if (!findFcm.isPresent()) {
            log.info("응애 if에 걸렸ㄱ어요");
            log.info("토큰 등록 if");
            Fcm fcm = fcmMapper.requestDtoToFcm(tokenRequestDto, userId);
            fcmRepository.save(fcm);
        } else {
            log.info("응애 else에 걸렸어요");
            log.info("토큰 등록 변경");
            findFcm.get().setFcm_token(tokenRequestDto.getFcm_token());
            fcmRepository.save(findFcm.get());
            log.info(tokenRequestDto.getFcm_token());
        }

    }

    public void sendPushTo(Integer userId, String title, String body) {
        String EXPO_PUSH_API_URL = "https://exp.host/--/api/v2/push/send";
        Optional<Fcm> findFcm = fcmRepository.findByUser_Id(userId);
        if (findFcm.isPresent()) {
            try {
                CloseableHttpClient httpClient = HttpClients.createDefault();
                HttpPost httpPost = new HttpPost(EXPO_PUSH_API_URL);
                httpPost.addHeader("Accept", "application/json");
                httpPost.addHeader("Content-Type", "application/json; charset=UTF-8");

                httpPost.addHeader("Expo-Push-Token", findFcm.get().getFcm_token());

                String payload = "{\n" +
                        "  \"to\": \"" + findFcm.get().getFcm_token() + "\",\n" +
                        "  \"title\": \"" + title + "\",\n" +
                        "  \"body\": \"" + body + "\"\n" +
                        "}";

                HttpEntity entity = new StringEntity(payload, StandardCharsets.UTF_8);
                httpPost.setEntity(entity);

                HttpResponse response = httpClient.execute(httpPost);

                if (response.getStatusLine().getStatusCode() != 200) {
                    throw new CustomException(ErrorCode.FCM_INVALID_TOKEN);
                }

                //푸쉬 알림 insert

            } catch (Exception e) {
                e.printStackTrace();
                throw new CustomException(ErrorCode.FCM_PUSH_ERROR);
            }
        }
    }
}

    /*
    public String getAccessToken() throws IOException {
        // firebase로 부터 access token을 가져온다.
        String firebaseConfigPath = "key.json";

        GoogleCredentials googleCredentials = GoogleCredentials
                .fromStream(new ClassPathResource(firebaseConfigPath).getInputStream())
                .createScoped(Arrays.asList("https://www.googleapis.com/auth/cloud-platform"));

        googleCredentials.refreshIfExpired();

        return googleCredentials.getAccessToken().getTokenValue();
    }

    public String makeMessage(
            String targetToken, String title, String body, String name, String description
    ) throws JsonProcessingException {

        String targetToken2 = "";
        FCMMessageDto fcmMessage = FCMMessageDto.builder()
                .message(
                        FCMMessageDto.Message.builder()
                                .token(targetToken)
                                .notification(
                                        FCMMessageDto.Notification.builder()
                                                .title(title)
                                                .body(body)
                                                .build()
                                )
                                .data(
                                        FCMMessageDto.Data.builder()
                                                .name(name)
                                                .description(description)
                                                .build()
                                )
                                .build()
                )
                .validateOnly(false)
                .build();

        return objectMapper.writeValueAsString(fcmMessage);
    }
     */

/**
 * 알림 푸쉬를 보내는 역할을 하는 메서드
 * <p>
 * <p>
 * public void sendMessageTo(
 * String targetToken, String title, String body, String id, String isEnd
 * ) throws IOException {
 * //String firebaseAlarmSendApiUri = "https://fcm.googleapis.com/v1/projects/ssuk-ssuk-push-server/messages:send";
 * String firebaseAlarmSendApiUri = "https://exp.host/@sonsuhyeong/api/v2/push/send";
 * String targetToken2 = "ExponentPushToken[mwb75mLXxguCpfxMmtzy-2]";
 * String message = makeMessage(targetToken2, title, body, id, isEnd);
 * <p>
 * OkHttpClient client = new OkHttpClient();
 * RequestBody requestBody = RequestBody.create(message, MediaType.get("application/json; charset=utf-8"));
 * <p>
 * Request request = new Request.Builder()
 * .url(firebaseAlarmSendApiUri)
 * .post(requestBody)
 * .addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + getAccessToken())
 * .addHeader(HttpHeaders.CONTENT_TYPE, "application/json; UTF-8")
 * .build();
 * <p>
 * Response response = client.newCall(request).execute();
 * <p>
 * log.info(response.body().string());
 * <p>
 * return;
 * }
 */
