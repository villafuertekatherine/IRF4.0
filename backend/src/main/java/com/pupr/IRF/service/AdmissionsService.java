package com.pupr.IRF.service;

import com.pupr.IRF.model.AdmissionsModel;
import com.pupr.IRF.repository.AdmissionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class AdmissionsService {

    @Autowired
    private AdmissionsRepository admissionRepository;

    public List<AdmissionsModel> findAllAdmissions() {
        return admissionRepository.findAll();
    }

    public AdmissionsModel findAdmissionById(Long id) {
        return admissionRepository.findById(id).orElse(null);
    }

    public AdmissionsModel updateAdmission(Long id, AdmissionsModel admissionDetails) {
        Optional<AdmissionsModel> existingAdmission = admissionRepository.findById(id);
        if (existingAdmission.isPresent()) {
            AdmissionsModel updatedAdmission = existingAdmission.get();
            // Assuming setters in AdmissionsModel, update fields as needed
            updatedAdmission.setStatus(admissionDetails.getStatus());
            updatedAdmission.setSource(admissionDetails.getSource());
            updatedAdmission.setName(admissionDetails.getName());
            updatedAdmission.setAge(admissionDetails.getAge());
            updatedAdmission.setSex(admissionDetails.getSex());
            updatedAdmission.setPlan(admissionDetails.getPlan());
            updatedAdmission.setDx(admissionDetails.getDx());
            updatedAdmission.setPresented(admissionDetails.getPresented());
            updatedAdmission.setNotes(admissionDetails.getNotes());
            updatedAdmission.setMso(admissionDetails.getMso());
            updatedAdmission.setSixtyPercentRule(admissionDetails.getSixtyPercentRule());
            return admissionRepository.save(updatedAdmission);
        }
        return null;
    }

    public boolean deleteAdmission(Long id) {
        if (admissionRepository.existsById(id)) {
            admissionRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // New method to find admissions by date range
    public List<AdmissionsModel> findAdmissionsByDateRange(LocalDate startDate, LocalDate endDate) {
        return admissionRepository.findByAdmissionDateBetween(startDate, endDate);
    }
}
