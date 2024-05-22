package com.pupr.IRF.controller;

import com.pupr.IRF.model.AdmittedPatientModel;
import com.pupr.IRF.model.PatientModel;
import com.pupr.IRF.repository.AdmittedPatientRepository;
import com.pupr.IRF.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class PatientController {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private AdmittedPatientRepository admittedPatientRepository;

    // Endpoint to add a new patient
    @PostMapping("/patients")
    public ResponseEntity<PatientModel> addPatient(@RequestBody PatientModel patient) {
        PatientModel savedPatient = patientRepository.save(patient);
        return ResponseEntity.ok(savedPatient);
    }

    // Endpoint to get all patients
    @GetMapping("/patients")
    public ResponseEntity<List<PatientModel>> getAllPatients() {
        List<PatientModel> patients = patientRepository.findAll();
        if (patients.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(patients);
    }

    // Endpoint to get a single patient by ID
    @GetMapping("/patients/{id}")
    public ResponseEntity<PatientModel> getPatientById(@PathVariable Long id) {
        Optional<PatientModel> patient = patientRepository.findById(id);
        if (patient.isPresent()) {
            return ResponseEntity.ok(patient.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint to update a patient
    @PutMapping("/patients/{id}")
    public ResponseEntity<PatientModel> updatePatient(@PathVariable Long id, @RequestBody PatientModel patientDetails) {
        Optional<PatientModel> patientData = patientRepository.findById(id);

        if (patientData.isPresent()) {
            PatientModel updatedPatient = patientData.get();
            updatedPatient.setName(patientDetails.getName());
            updatedPatient.setAge(patientDetails.getAge());
            updatedPatient.setStatus(patientDetails.getStatus());
            updatedPatient.setSource(patientDetails.getSource());
            updatedPatient.setSex(patientDetails.getSex());
            updatedPatient.setPlan(patientDetails.getPlan());
            updatedPatient.setDx(patientDetails.getDx());
            updatedPatient.setPresented(patientDetails.getPresented());
            updatedPatient.setNotes(patientDetails.getNotes());
            updatedPatient.setMso(patientDetails.getMso());
            updatedPatient.setSixtyPercentRule(patientDetails.getSixtyPercentRule());

            return ResponseEntity.ok(patientRepository.save(updatedPatient));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint to delete a patient
    @DeleteMapping("/patients/{id}")
    public ResponseEntity<?> deletePatient(@PathVariable Long id) {
        Optional<PatientModel> patient = patientRepository.findById(id);
        if (patient.isPresent()) {
            patientRepository.delete(patient.get());
            return ResponseEntity.ok().build();  // Successfully deleted
        } else {
            return ResponseEntity.notFound().build();  // Patient not found
        }
    }
}
