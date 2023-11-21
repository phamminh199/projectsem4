/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package fpt.aptech.spring_project_sem4_api.entities;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author vuna
 */
@Entity
@Table(name = "employer")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Employer.findAll", query = "SELECT e FROM Employer e"),
    @NamedQuery(name = "Employer.findByIdemployer", query = "SELECT e FROM Employer e WHERE e.idemployer = :idemployer"),
    @NamedQuery(name = "Employer.findByEmail", query = "SELECT e FROM Employer e WHERE e.email = :email"),
    @NamedQuery(name = "Employer.findByPassword", query = "SELECT e FROM Employer e WHERE e.password = :password"),
    @NamedQuery(name = "Employer.findByFullname", query = "SELECT e FROM Employer e WHERE e.fullname = :fullname"),
    @NamedQuery(name = "Employer.findByTitle", query = "SELECT e FROM Employer e WHERE e.title = :title"),
    @NamedQuery(name = "Employer.findByPhone", query = "SELECT e FROM Employer e WHERE e.phone = :phone"),
    @NamedQuery(name = "Employer.findByUrlavatar", query = "SELECT e FROM Employer e WHERE e.urlavatar = :urlavatar"),
    @NamedQuery(name = "Employer.findByStatus", query = "SELECT e FROM Employer e WHERE e.status = :status")})
public class Employer implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "idemployer")
    private Integer idemployer;
    @Basic(optional = false)
    @Column(name = "email")
    private String email;
    @Basic(optional = false)
    @Column(name = "password")
    private String password;
    @Basic(optional = false)
    @Column(name = "fullname")
    private String fullname;
    @Basic(optional = false)
    @Column(name = "title")
    private String title;
    @Basic(optional = false)
    @Column(name = "phone")
    private String phone;
    @Basic(optional = false)
    @Column(name = "urlavatar")
    private String urlavatar;
    @Basic(optional = false)
    @Column(name = "status")
    private String status;
//    @JoinColumn(name = "idcompany", referencedColumnName = "idcompany")
//    @ManyToOne(optional = false)
//    private Company idcompany;
    private Integer idcompany;
//    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idemployer")
//    private List<Job> jobList;

    public Employer() {
    }

    public Employer(Integer idemployer) {
        this.idemployer = idemployer;
    }

    public Employer(Integer idemployer, String email, String password, String fullname, String title, String phone, String urlavatar, String status) {
        this.idemployer = idemployer;
        this.email = email;
        this.password = password;
        this.fullname = fullname;
        this.title = title;
        this.phone = phone;
        this.urlavatar = urlavatar;
        this.status = status;
    }

    public Integer getIdemployer() {
        return idemployer;
    }

    public void setIdemployer(Integer idemployer) {
        this.idemployer = idemployer;
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

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
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
    
    public Integer getIdcompany() {
        return idemployer;
    }

    public void setIdcompany(Integer idcompany) {
        this.idcompany = idcompany;
    }


//    public Company getIdcompany() {
//        return idcompany;
//    }
//
//    public void setIdcompany(Company idcompany) {
//        this.idcompany = idcompany;
//    }

//    @XmlTransient
//    public List<Job> getJobList() {
//        return jobList;
//    }
//
//    public void setJobList(List<Job> jobList) {
//        this.jobList = jobList;
//    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idemployer != null ? idemployer.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Employer)) {
            return false;
        }
        Employer other = (Employer) object;
        if ((this.idemployer == null && other.idemployer != null) || (this.idemployer != null && !this.idemployer.equals(other.idemployer))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "fpt.aptech.spring_project_sem4_api.entities.Employer[ idemployer=" + idemployer + " ]";
    }
    
}
