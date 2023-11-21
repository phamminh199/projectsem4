/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package fpt.aptech.spring_project_sem4_api.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author vuna
 */
@Entity
@Table(name = "candidate")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Candidate.findAll", query = "SELECT c FROM Candidate c"),
    @NamedQuery(name = "Candidate.findByIdcandidate", query = "SELECT c FROM Candidate c WHERE c.idcandidate = :idcandidate"),
    @NamedQuery(name = "Candidate.findByFullname", query = "SELECT c FROM Candidate c WHERE c.fullname = :fullname"),
    @NamedQuery(name = "Candidate.findByEmail", query = "SELECT c FROM Candidate c WHERE c.email = :email"),
    @NamedQuery(name = "Candidate.findByPassword", query = "SELECT c FROM Candidate c WHERE c.password = :password"),
    @NamedQuery(name = "Candidate.findByPhone", query = "SELECT c FROM Candidate c WHERE c.phone = :phone"),
    @NamedQuery(name = "Candidate.findByDob", query = "SELECT c FROM Candidate c WHERE c.dob = :dob"),
    @NamedQuery(name = "Candidate.findByUrlavatar", query = "SELECT c FROM Candidate c WHERE c.urlavatar = :urlavatar"),
    @NamedQuery(name = "Candidate.findByStatus", query = "SELECT c FROM Candidate c WHERE c.status = :status")})
public class Candidate implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "idcandidate")
    private Integer idcandidate;
    @Basic(optional = false)
    @Column(name = "fullname")
    private String fullname;
    @Basic(optional = false)
    @Column(name = "email")
    private String email;
    @Basic(optional = false)
    @Column(name = "password")
    private String password;
    @Basic(optional = false)
    @Column(name = "phone")
    private String phone;
    @Basic(optional = false)
    @Column(name = "dob")
    @Temporal(TemporalType.DATE)
    private Date dob;
    @Basic(optional = false)
    @Column(name = "urlavatar")
    private String urlavatar;
    @Basic(optional = false)
    @Column(name = "status")
    private String status;
//    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idcandidate")
//    private List<Resumetemplate> resumetemplateList;
//    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idcandidate")
//    private List<Resumepdf> resumepdfList;
//    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idcandidate")
//    private List<Review> reviewList;
//    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idcandidate")
//    private List<Favorite> favoriteList;
//    private String token;
//
//    public String getToken() {
//        return token;
//    }
//
//    public void setToken(String token) {
//        this.token = token;
//    }

    public Candidate() {
    }

    public Candidate(Integer idcandidate) {
        this.idcandidate = idcandidate;
    }

    public Candidate(Integer idcandidate, String fullname, String email, String password, String phone, Date dob, String urlavatar, String status) {
        this.idcandidate = idcandidate;
        this.fullname = fullname;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.dob = dob;
        this.urlavatar = urlavatar;
        this.status = status;
    }

    public Integer getIdcandidate() {
        return idcandidate;
    }

    public void setIdcandidate(Integer idcandidate) {
        this.idcandidate = idcandidate;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getUrlavatar() {
        return urlavatar;
    }

    public void setUrlavatar(String urlavatar) {
        this.urlavatar = urlavatar;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

//    @XmlTransient
//    public List<Resumetemplate> getResumetemplateList() {
//        return resumetemplateList;
//    }
//
//    public void setResumetemplateList(List<Resumetemplate> resumetemplateList) {
//        this.resumetemplateList = resumetemplateList;
//    }
//
//    @XmlTransient
//    public List<Resumepdf> getResumepdfList() {
//        return resumepdfList;
//    }
//
//    public void setResumepdfList(List<Resumepdf> resumepdfList) {
//        this.resumepdfList = resumepdfList;
//    }
//
//    @XmlTransient
//    public List<Review> getReviewList() {
//        return reviewList;
//    }
//
//    public void setReviewList(List<Review> reviewList) {
//        this.reviewList = reviewList;
//    }
//
//    @XmlTransient
//    public List<Favorite> getFavoriteList() {
//        return favoriteList;
//    }
//
//    public void setFavoriteList(List<Favorite> favoriteList) {
//        this.favoriteList = favoriteList;
//    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idcandidate != null ? idcandidate.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Candidate)) {
            return false;
        }
        Candidate other = (Candidate) object;
        if ((this.idcandidate == null && other.idcandidate != null) || (this.idcandidate != null && !this.idcandidate.equals(other.idcandidate))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "fpt.aptech.spring_project_sem4_api.entities.Candidate[ idcandidate=" + idcandidate + " ]";
    }
    
}
