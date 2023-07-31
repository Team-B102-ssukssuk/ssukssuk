package com.ssafy.ssuk.measurement.controller;

import com.ssafy.ssuk.measurement.domain.Measurement;
import com.ssafy.ssuk.measurement.dto.request.SensorGetDto;
import com.ssafy.ssuk.measurement.service.MesurementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/sensor")
public class MeasurementController {

    private final MesurementService mesurementService;

    @Autowired
    public MeasurementController(MesurementService mesurementService) {
        this.mesurementService = mesurementService;
    }

    @GetMapping("/{user_id}/{pot_id}")
    ResponseEntity<?> findByUser_IdAndPot_Id(@PathVariable Integer user_id, @PathVariable Integer pot_id) {
        List<Measurement> result = mesurementService.findByUser_IdAndPot_Id(user_id, pot_id);

        return ResponseEntity.ok(result);
    }
}
