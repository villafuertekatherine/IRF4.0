package com.pupr.IRF.controller;

import com.pupr.IRF.model.AdmissionsModel;
import com.pupr.IRF.service.AdmissionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api")
public class AdmissionsController {

    @Autowired
    private AdmissionsService admissionsService;

    @GetMapping("/admissions")
    public ResponseEntity<List<AdmissionsModel>> getAllAdmissions() {
        try {
            List<AdmissionsModel> admissions = admissionsService.findAllAdmissions();
            if (admissions.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(admissions);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/admissions/{id}")
    public ResponseEntity<AdmissionsModel> getAdmissionById(@PathVariable Long id) {
        AdmissionsModel admission = admissionsService.findAdmissionById(id);
        if (admission != null) {
            return ResponseEntity.ok(admission);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/admissions/{id}")
    public ResponseEntity<AdmissionsModel> updateAdmission(@PathVariable Long id, @RequestBody AdmissionsModel admissionDetails) {
        AdmissionsModel updatedAdmission = admissionsService.updateAdmission(id, admissionDetails);
        if (updatedAdmission != null) {
            return ResponseEntity.ok(updatedAdmission);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/admissions/{id}")
    public ResponseEntity<?> deleteAdmission(@PathVariable Long id) {
        boolean isDeleted = admissionsService.deleteAdmission(id);
        if (isDeleted) {
            return ResponseEntity.ok().build();  // Successfully deleted
        } else {
            return ResponseEntity.notFound().build();  // Admission not found
        }
    }

    // New endpoint to get admissions within a date range
    @GetMapping("/admissions/date-range")
    public ResponseEntity<List<AdmissionsModel>> getAdmissionsByDateRange(
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        try {
            List<AdmissionsModel> admissions = admissionsService.findAdmissionsByDateRange(startDate, endDate);
            if (admissions.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(admissions);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
