package com.ssafy.ssuk.utils.email;

import com.ssafy.ssuk.exception.dto.CustomException;
import com.ssafy.ssuk.exception.dto.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Random;

@Component
@Slf4j
@RequiredArgsConstructor
public class EmailMessage {
    private static String randomCode;
    private final JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String email;

    public String sendMail(String to) throws Exception{
        log.debug("email={}", email);
        MimeMessage mimeMessage = createMessage(to);
        try {
            javaMailSender.send(mimeMessage);
        } catch (MailException e) {
            e.printStackTrace();
            throw new CustomException(ErrorCode.INPUT_EXCEPTION);
        }
        return randomCode;
    }

    public MimeMessage createMessage(String to) throws Exception {
        MimeMessage message = javaMailSender.createMimeMessage();

        randomCode = createCode(8);
        message.addRecipients(Message.RecipientType.TO, to); // 보내는 대상
        message.setSubject("[쑥쑥] 이메일 인증을 위한 인증코드 발송"); // 제목

        String msg="";
        msg += "<div style='margin:5%;'>";
        msg += "<h2> 안녕하세요 쑥쑥입니다. </h2>";
        msg += "<br>";
        msg += "<p>아래 인증코드를 입력해주세요.<p>";
        msg += "<p>감사합니다.<p>";
        msg += "<br>";
        msg += "<div align='center' style='border:1px solid #469C4A; border-radius:10px; font-family:verdana';>";
        msg += "<h3 style='color:#469C4A;'>이메일 인증 코드</h3>";
        msg += "<div style='font-size:110%'>";
        msg += "CODE : <strong>";
        msg += randomCode+"</strong><div><br/> ";
        msg += "</div>";

        message.setText(msg, "UTF-8", "HTML");
        message.setFrom(new InternetAddress("ssukssuk102@gmail.com", "ssukssuk"));

        return message;
    }

    private String createCode(int codeLength) {
        Random random = new Random();
        StringBuffer key = new StringBuffer();

        for (int i = 0; i < codeLength; i++) {
            int index = random.nextInt(4);

            switch (index) {
                case 0: key.append((char) ((int) random.nextInt(26) + 97)); break;
                case 1: key.append((char) ((int) random.nextInt(26) + 97)); break;
                default: key.append(random.nextInt(9));
            }
        }
        return key.toString();
    }
}
