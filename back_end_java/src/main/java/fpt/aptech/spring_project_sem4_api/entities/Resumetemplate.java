/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package fpt.aptech.spring_project_sem4_api.entities;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author vuna
 */
@Entity
@Table(name = "resumetemplate")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Resumetemplate.findAll", query = "SELECT r FROM Resumetemplate r"),
    @NamedQuery(name = "Resumetemplate.findByIdresume", query = "SELECT r FROM Resumetemplate r WHERE r.idresume = :idresume"),
    @NamedQuery(name = "Resumetemplate.findByIdcandidate", query = "SELECT r FROM Resumetemplate r WHERE r.idcandidate = :idcandidate"),
    @NamedQuery(name = "Resumetemplate.findByFullname", query = "SELECT r FROM Resumetemplate r WHERE r.fullname = :fullname"),
    @NamedQuery(name = "Resumetemplate.findByPhone", query = "SELECT r FROM Resumetemplate r WHERE r.phone = :phone"),
    @NamedQuery(name = "Resumetemplate.findByEmail", query = "SELECT r FROM Resumetemplate r WHERE r.email = :email"),
    @NamedQuery(name = "Resumetemplate.findBySummary", query = "SELECT r FROM Resumetemplate r WHERE r.summary = :summary"),
    @NamedQuery(name = "Resumetemplate.findByDob", query = "SELECT r FROM Resumetemplate r WHERE r.dob = :dob"),
    @NamedQuery(name = "Resumetemplate.findBySkill1", query = "SELECT r FROM Resumetemplate r WHERE r.skill1 = :skill1"),
    @NamedQuery(name = "Resumetemplate.findBySkill2", query = "SELECT r FROM Resumetemplate r WHERE r.skill2 = :skill2"),
    @NamedQuery(name = "Resumetemplate.findBySkill3", query = "SELECT r FROM Resumetemplate r WHERE r.skill3 = :skill3"),
    @NamedQuery(name = "Resumetemplate.findByLevel", query = "SELECT r FROM Resumetemplate r WHERE r.level = :level"),
    @NamedQuery(name = "Resumetemplate.findByPosition1", query = "SELECT r FROM Resumetemplate r WHERE r.position1 = :position1"),
    @NamedQuery(name = "Resumetemplate.findByCompanyname1", query = "SELECT r FROM Resumetemplate r WHERE r.companyname1 = :companyname1"),
    @NamedQuery(name = "Resumetemplate.findByDuration1", query = "SELECT r FROM Resumetemplate r WHERE r.duration1 = :duration1"),
    @NamedQuery(name = "Resumetemplate.findByDescribeyourwork1", query = "SELECT r FROM Resumetemplate r WHERE r.describeyourwork1 = :describeyourwork1"),
    @NamedQuery(name = "Resumetemplate.findByProjectjoin1", query = "SELECT r FROM Resumetemplate r WHERE r.projectjoin1 = :projectjoin1"),
    @NamedQuery(name = "Resumetemplate.findByPosition2", query = "SELECT r FROM Resumetemplate r WHERE r.position2 = :position2"),
    @NamedQuery(name = "Resumetemplate.findByCompanyname2", query = "SELECT r FROM Resumetemplate r WHERE r.companyname2 = :companyname2"),
    @NamedQuery(name = "Resumetemplate.findByDuration2", query = "SELECT r FROM Resumetemplate r WHERE r.duration2 = :duration2"),
    @NamedQuery(name = "Resumetemplate.findByDescribeyourwork2", query = "SELECT r FROM Resumetemplate r WHERE r.describeyourwork2 = :describeyourwork2"),
    @NamedQuery(name = "Resumetemplate.findByProjectjoin2", query = "SELECT r FROM Resumetemplate r WHERE r.projectjoin2 = :projectjoin2"),
    @NamedQuery(name = "Resumetemplate.findByEducation1", query = "SELECT r FROM Resumetemplate r WHERE r.education1 = :education1"),
    @NamedQuery(name = "Resumetemplate.findByEducation2", query = "SELECT r FROM Resumetemplate r WHERE r.education2 = :education2"),
    @NamedQuery(name = "Resumetemplate.findByEducation3", query = "SELECT r FROM Resumetemplate r WHERE r.education3 = :education3"),
    @NamedQuery(name = "Resumetemplate.findByCertificate1", query = "SELECT r FROM Resumetemplate r WHERE r.certificate1 = :certificate1"),
    @NamedQuery(name = "Resumetemplate.findByCertificate2", query = "SELECT r FROM Resumetemplate r WHERE r.certificate2 = :certificate2"),
    @NamedQuery(name = "Resumetemplate.findByCertificate3", query = "SELECT r FROM Resumetemplate r WHERE r.certificate3 = :certificate3"),
    @NamedQuery(name = "Resumetemplate.findByAddress", query = "SELECT r FROM Resumetemplate r WHERE r.address = :address"),
    @NamedQuery(name = "Resumetemplate.findByLanguage", query = "SELECT r FROM Resumetemplate r WHERE r.language = :language"),
    @NamedQuery(name = "Resumetemplate.findByJobapply", query = "SELECT r FROM Resumetemplate r WHERE r.jobapply = :jobapply"),
    @NamedQuery(name = "Resumetemplate.findByCompanyapply", query = "SELECT r FROM Resumetemplate r WHERE r.companyapply = :companyapply"),
    @NamedQuery(name = "Resumetemplate.findByAchievement", query = "SELECT r FROM Resumetemplate r WHERE r.achievement = :achievement"),
    @NamedQuery(name = "Resumetemplate.findByUrlavatar", query = "SELECT r FROM Resumetemplate r WHERE r.urlavatar = :urlavatar")})
public class Resumetemplate implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "idresume")
    private Integer idresume;
    @Basic(optional = false)
    @Column(name = "idcandidate")
    private int idcandidate;
    @Basic(optional = false)
    @Column(name = "fullname")
    private String fullname;
    @Basic(optional = false)
    @Column(name = "phone")
    private String phone;
    @Basic(optional = false)
    @Column(name = "email")
    private String email;
    @Basic(optional = false)
    @Column(name = "summary")
    private String summary;
    @Column(name = "dob")
    @Temporal(TemporalType.DATE)
    private Date dob;
    @Basic(optional = false)
    @Column(name = "skill1")
    private String skill1;
    @Basic(optional = false)
    @Column(name = "skill2")
    private String skill2;
    @Basic(optional = false)
    @Column(name = "skill3")
    private String skill3;
    @Basic(optional = false)
    @Column(name = "level")
    private String level;
    @Basic(optional = false)
    @Column(name = "position1")
    private String position1;
    @Basic(optional = false)
    @Column(name = "companyname1")
    private String companyname1;
    @Basic(optional = false)
    @Column(name = "duration1")
    private String duration1;
    @Basic(optional = false)
    @Column(name = "describeyourwork1")
    private String describeyourwork1;
    @Basic(optional = false)
    @Column(name = "projectjoin1")
    private String projectjoin1;
    @Basic(optional = false)
    @Column(name = "position2")
    private String position2;
    @Basic(optional = false)
    @Column(name = "companyname2")
    private String companyname2;
    @Basic(optional = false)
    @Column(name = "duration2")
    private String duration2;
    @Basic(optional = false)
    @Column(name = "describeyourwork2")
    private String describeyourwork2;
    @Basic(optional = false)
    @Column(name = "projectjoin2")
    private String projectjoin2;
    @Basic(optional = false)
    @Column(name = "education1")
    private String education1;
    @Basic(optional = false)
    @Column(name = "education2")
    private String education2;
    @Basic(optional = false)
    @Column(name = "education3")
    private String education3;
    @Basic(optional = false)
    @Column(name = "certificate1")
    private String certificate1;
    @Basic(optional = false)
    @Column(name = "certificate2")
    private String certificate2;
    @Basic(optional = false)
    @Column(name = "certificate3")
    private String certificate3;
    @Basic(optional = false)
    @Column(name = "address")
    private String address;
    @Basic(optional = false)
    @Column(name = "language")
    private String language;
    @Basic(optional = false)
    @Column(name = "jobapply")
    private String jobapply;
    @Basic(optional = false)
    @Column(name = "companyapply")
    private String companyapply;
    @Basic(optional = false)
    @Column(name = "achievement")
    private String achievement;
    @Basic(optional = false)
    @Column(name = "urlavatar")
    private String urlavatar;

    public Resumetemplate() {
    }

    public Resumetemplate(Integer idresume) {
        this.idresume = idresume;
    }

    public Resumetemplate(Integer idresume, int idcandidate, String fullname, String phone, String email, String summary, String skill1, String skill2, String skill3, String level, String position1, String companyname1, String duration1, String describeyourwork1, String projectjoin1, String position2, String companyname2, String duration2, String describeyourwork2, String projectjoin2, String education1, String education2, String education3, String certificate1, String certificate2, String certificate3, String address, String language, String jobapply, String companyapply, String achievement, String urlavatar) {
        this.idresume = idresume;
        this.idcandidate = idcandidate;
        this.fullname = fullname;
        this.phone = phone;
        this.email = email;
        this.summary = summary;
        this.skill1 = skill1;
        this.skill2 = skill2;
        this.skill3 = skill3;
        this.level = level;
        this.position1 = position1;
        this.companyname1 = companyname1;
        this.duration1 = duration1;
        this.describeyourwork1 = describeyourwork1;
        this.projectjoin1 = projectjoin1;
        this.position2 = position2;
        this.companyname2 = companyname2;
        this.duration2 = duration2;
        this.describeyourwork2 = describeyourwork2;
        this.projectjoin2 = projectjoin2;
        this.education1 = education1;
        this.education2 = education2;
        this.education3 = education3;
        this.certificate1 = certificate1;
        this.certificate2 = certificate2;
        this.certificate3 = certificate3;
        this.address = address;
        this.language = language;
        this.jobapply = jobapply;
        this.companyapply = companyapply;
        this.achievement = achievement;
        this.urlavatar = urlavatar;
    }

    public Integer getIdresume() {
        return idresume;
    }

    public void setIdresume(Integer idresume) {
        this.idresume = idresume;
    }

    public int getIdcandidate() {
        return idcandidate;
    }

    public void setIdcandidate(int idcandidate) {
        this.idcandidate = idcandidate;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getSkill1() {
        return skill1;
    }

    public void setSkill1(String skill1) {
        this.skill1 = skill1;
    }

    public String getSkill2() {
        return skill2;
    }

    public void setSkill2(String skill2) {
        this.skill2 = skill2;
    }

    public String getSkill3() {
        return skill3;
    }

    public void setSkill3(String skill3) {
        this.skill3 = skill3;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getPosition1() {
        return position1;
    }

    public void setPosition1(String position1) {
        this.position1 = position1;
    }

    public String getCompanyname1() {
        return companyname1;
    }

    public void setCompanyname1(String companyname1) {
        this.companyname1 = companyname1;
    }

    public String getDuration1() {
        return duration1;
    }

    public void setDuration1(String duration1) {
        this.duration1 = duration1;
    }

    public String getDescribeyourwork1() {
        return describeyourwork1;
    }

    public void setDescribeyourwork1(String describeyourwork1) {
        this.describeyourwork1 = describeyourwork1;
    }

    public String getProjectjoin1() {
        return projectjoin1;
    }

    public void setProjectjoin1(String projectjoin1) {
        this.projectjoin1 = projectjoin1;
    }

    public String getPosition2() {
        return position2;
    }

    public void setPosition2(String position2) {
        this.position2 = position2;
    }

    public String getCompanyname2() {
        return companyname2;
    }

    public void setCompanyname2(String companyname2) {
        this.companyname2 = companyname2;
    }

    public String getDuration2() {
        return duration2;
    }

    public void setDuration2(String duration2) {
        this.duration2 = duration2;
    }

    public String getDescribeyourwork2() {
        return describeyourwork2;
    }

    public void setDescribeyourwork2(String describeyourwork2) {
        this.describeyourwork2 = describeyourwork2;
    }

    public String getProjectjoin2() {
        return projectjoin2;
    }

    public void setProjectjoin2(String projectjoin2) {
        this.projectjoin2 = projectjoin2;
    }

    public String getEducation1() {
        return education1;
    }

    public void setEducation1(String education1) {
        this.education1 = education1;
    }

    public String getEducation2() {
        return education2;
    }

    public void setEducation2(String education2) {
        this.education2 = education2;
    }

    public String getEducation3() {
        return education3;
    }

    public void setEducation3(String education3) {
        this.education3 = education3;
    }

    public String getCertificate1() {
        return certificate1;
    }

    public void setCertificate1(String certificate1) {
        this.certificate1 = certificate1;
    }

    public String getCertificate2() {
        return certificate2;
    }

    public void setCertificate2(String certificate2) {
        this.certificate2 = certificate2;
    }

    public String getCertificate3() {
        return certificate3;
    }

    public void setCertificate3(String certificate3) {
        this.certificate3 = certificate3;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getJobapply() {
        return jobapply;
    }

    public void setJobapply(String jobapply) {
        this.jobapply = jobapply;
    }

    public String getCompanyapply() {
        return companyapply;
    }

    public void setCompanyapply(String companyapply) {
        this.companyapply = companyapply;
    }

    public String getAchievement() {
        return achievement;
    }

    public void setAchievement(String achievement) {
        this.achievement = achievement;
    }

    public String getUrlavatar() {
        return urlavatar;
    }

    public void setUrlavatar(String urlavatar) {
        this.urlavatar = urlavatar;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idresume != null ? idresume.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Resumetemplate)) {
            return false;
        }
        Resumetemplate other = (Resumetemplate) object;
        if ((this.idresume == null && other.idresume != null) || (this.idresume != null && !this.idresume.equals(other.idresume))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "fpt.aptech.spring_project_sem4_api.entities.Resumetemplate[ idresume=" + idresume + " ]";
    }
    
}
