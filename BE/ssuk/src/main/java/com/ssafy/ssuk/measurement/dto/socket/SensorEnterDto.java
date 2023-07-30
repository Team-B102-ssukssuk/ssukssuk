package com.ssafy.ssuk.measurement.dto.socket;

import lombok.Getter;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;

@Getter
public class SensorEnterDto {
    private String serialNumber;
    private Set<WebSocketSession> sessions = new HashSet<>();

    public void initSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

}
