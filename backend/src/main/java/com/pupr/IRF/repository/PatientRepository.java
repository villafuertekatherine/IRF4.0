package com.pupr.IRF.repository;

import com.pupr.IRF.model.PatientModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<PatientModel, Long> {
}
