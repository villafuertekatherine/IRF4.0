package com.pupr.IRF.controller;

import com.pupr.IRF.model.CensusModel;
import com.pupr.IRF.model.AdmittedPatientModel;
import com.pupr.IRF.repository.CensusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CensusController {

    @Autowired
    private CensusRepository censusRepository;

    @GetMapping("/census")
    public ResponseEntity<List<CensusModel>> getCensus(@RequestParam("censusDate") LocalDate censusDate) {
        List<CensusModel> censusList = new ArrayList<>();

        for (int room = 480; room < 500; room++) {
            String roomNumber = String.valueOf(room);
            List<AdmittedPatientModel> patients = censusRepository.findPatientsByRoomAndDate(roomNumber, censusDate);

            if (patients.isEmpty()) {
                censusList.add(new CensusModel(
                        roomNumber,
                        null,
                        "",  // Empty name field for unoccupied rooms
                        null,
                        null,
                        null,
                        null,
                        null  // Add dischargeDate as null
                ));
            } else {
                AdmittedPatientModel patient = patients.get(0); // Get the first patient if there are multiple
                censusList.add(new CensusModel(
                        roomNumber,
                        patient.getAdmissionDate().toString(),
                        patient.getName(),
                        patient.getAge(),
                        patient.getSex(),
                        patient.getPlan(),
                        patient.getDx(),
                        patient.getDischargeDate() != null ? patient.getDischargeDate().toString() : null
                ));
            }
        }

        return ResponseEntity.ok(censusList);
    }
}
