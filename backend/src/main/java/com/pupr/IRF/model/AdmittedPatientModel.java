package com.pupr.IRF.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "admitted_patients") // Specifies the table in the database
public class AdmittedPatientModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int age;
    private String sex;
    private String source;
    private String status;
    private String plan;
    private String dx; // Diagnosis
    private String presented;
    private String notes;
    private String mso; // Managed Service Organization
    private String sixtyPercentRule;
    @Column(name = "room_number")
    private String roomNumber;

    private LocalDate admissionDate;

    private LocalDate dischargeDate; // Add this line

    // No-args constructor
    public AdmittedPatientModel() {}

    // Constructor to create AdmittedPatientModel from PatientModel
    public AdmittedPatientModel(PatientModel patient, String status) {
        this.name = patient.getName();
        this.age = patient.getAge();
        this.sex = patient.getSex();
        this.source = patient.getSource();
        this.status = status;
        this.plan = patient.getPlan();
        this.dx = patient.getDx();
        this.presented = patient.getPresented();
        this.notes = patient.getNotes();
        this.mso = patient.getMso();
        this.sixtyPercentRule = patient.getSixtyPercentRule();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPlan() {
        return plan;
    }

    public void setPlan(String plan) {
        this.plan = plan;
    }

    public String getDx() {
        return dx;
    }

    public void setDx(String dx) {
        this.dx = dx;
    }

    public String getPresented() {
        return presented;
    }

    public void setPresented(String presented) {
        this.presented = presented;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getMso() {
        return mso;
    }

    public void setMso(String mso) {
        this.mso = mso;
    }

    public String getSixtyPercentRule() {
        return sixtyPercentRule;
    }

    public void setSixtyPercentRule(String sixtyPercentRule) {
        this.sixtyPercentRule = sixtyPercentRule;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public LocalDate getAdmissionDate() {
        return admissionDate;
    }

    public void setAdmissionDate(LocalDate admissionDate) {
        this.admissionDate = admissionDate;
    }

    public LocalDate getDischargeDate() {
        return dischargeDate;
    }

    public void setDischargeDate(LocalDate dischargeDate) {
        this.dischargeDate = dischargeDate;
    }
}
