package com.pupr.IRF.model;

public class CensusModel {
    private String roomNumber;
    private String admissionDate;
    private String name;
    private Integer age;
    private String sex;
    private String plan;
    private String dx;
    private String dischargeDate; // Add this field for discharge date

    // Constructors
    public CensusModel(String roomNumber, String admissionDate, String name, Integer age, String sex, String plan, String dx, String dischargeDate) {
        this.roomNumber = roomNumber;
        this.admissionDate = admissionDate;
        this.name = name;
        this.age = age;
        this.sex = sex;
        this.plan = plan;
        this.dx = dx;
        this.dischargeDate = dischargeDate;
    }

    // Getters and setters
    // (Include getters and setters for all fields)
    // ...

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public String getAdmissionDate() {
        return admissionDate;
    }

    public void setAdmissionDate(String admissionDate) {
        this.admissionDate = admissionDate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
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

    public String getDischargeDate() {
        return dischargeDate;
    }

    public void setDischargeDate(String dischargeDate) {
        this.dischargeDate = dischargeDate;
    }
}
