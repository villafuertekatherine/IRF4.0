package com.pupr.IRF.repository;

import com.pupr.IRF.model.AdmittedPatientModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CensusRepository extends JpaRepository<AdmittedPatientModel, Long> {

    @Query("SELECT ap FROM AdmittedPatientModel ap WHERE ap.roomNumber = :roomNumber AND (:censusDate BETWEEN ap.admissionDate AND COALESCE(ap.dischargeDate, :censusDate))")
    List<AdmittedPatientModel> findPatientsByRoomAndDate(
            @Param("roomNumber") String roomNumber,
            @Param("censusDate") LocalDate censusDate
    );
}
