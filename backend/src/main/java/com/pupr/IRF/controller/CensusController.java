package com.pupr.IRF.controller;

import com.pupr.IRF.model.CensusModel;
import com.pupr.IRF.model.AdmittedPatientModel;
import com.pupr.IRF.repository.CensusRepository;
import com.pupr.IRF.repository.AdmittedPatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CensusController {

    @Autowired
    private CensusRepository censusRepository;

    @Autowired
    private AdmittedPatientRepository admittedPatientRepository;

    @GetMapping("/census")
    public ResponseEntity<List<CensusModel>> getCensus(@RequestParam("censusDate") LocalDate censusDate) {
        List<CensusModel> censusList = new ArrayList<>();

        for (int room = 480; room < 500; room++) {
            String roomNumber = String.valueOf(room);
            List<AdmittedPatientModel> patients = censusRepository.findPatientsByRoomAndDate(roomNumber, censusDate);

            if (patients.isEmpty()) {
                censusList.add(new CensusModel(
                        null, // No id for empty rooms
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
                        patient.getId(), // Add the id here
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

    @PostMapping("/update-discharge-date/{id}")
    public ResponseEntity<?> updateDischargeDate(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        Optional<AdmittedPatientModel> admittedPatientOptional = admittedPatientRepository.findById(id);
        if (admittedPatientOptional.isPresent()) {
            AdmittedPatientModel admittedPatient = admittedPatientOptional.get();

            String dateString = payload.get("dischargeDate");
            if (dateString == null || dateString.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Discharge date is required.");
            }
            LocalDate dischargeDate = LocalDate.parse(dateString);

            if (dischargeDate.isBefore(admittedPatient.getAdmissionDate())) {
                return ResponseEntity.badRequest().body("Discharge date cannot be before admission date.");
            }

            admittedPatient.setDischargeDate(dischargeDate);
            admittedPatientRepository.save(admittedPatient);
            return ResponseEntity.ok(admittedPatient);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
