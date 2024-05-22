package com.pupr.IRF.repository;

import com.pupr.IRF.model.AdmissionsModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AdmissionsRepository extends JpaRepository<AdmissionsModel, Long> {
    // Custom database queries can be defined here

    // New method to find admissions by date range
    List<AdmissionsModel> findByAdmissionDateBetween(LocalDate startDate, LocalDate endDate);
}
