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
@Table(name = "controller")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Controller.findAll", query = "SELECT c FROM Controller c"),
    @NamedQuery(name = "Controller.findByIdcontroller", query = "SELECT c FROM Controller c WHERE c.idcontroller = :idcontroller"),
    @NamedQuery(name = "Controller.findByFullname", query = "SELECT c FROM Controller c WHERE c.fullname = :fullname"),
    @NamedQuery(name = "Controller.findByPassword", query = "SELECT c FROM Controller c WHERE c.password = :password"),
    @NamedQuery(name = "Controller.findByEmail", query = "SELECT c FROM Controller c WHERE c.email = :email"),
    @NamedQuery(name = "Controller.findByPhone", query = "SELECT c FROM Controller c WHERE c.phone = :phone"),
    @NamedQuery(name = "Controller.findByRole", query = "SELECT c FROM Controller c WHERE c.role = :role"),
    @NamedQuery(name = "Controller.findByUrlavatar", query = "SELECT c FROM Controller c WHERE c.urlavatar = :urlavatar"),
    @NamedQuery(name = "Controller.findByStatus", query = "SELECT c FROM Controller c WHERE c.status = :status")})
public class Controller implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "idcontroller")
    private Integer idcontroller;
    @Basic(optional = false)
    @Column(name = "fullname")
    private String fullname;
    @Basic(optional = false)
    @Column(name = "password")
    private String password;
    @Basic(optional = false)
    @Column(name = "email")
    private String email;
    @Basic(optional = false)
    @Column(name = "phone")
    private String phone;
    @Basic(optional = false)
    @Column(name = "role")
    private String role;
    @Basic(optional = false)
    @Column(name = "urlavatar")
    private String urlavatar;
    @Basic(optional = false)
    @Column(name = "status")
    private String status;
//    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idcontroller")
//    private List<Sale> saleList;
//    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idcontroller")
//    private List<Job> jobList;

    public Controller() {
    }

    public Controller(Integer idcontroller) {
        this.idcontroller = idcontroller;
    }

    public Controller(Integer idcontroller, String fullname, String password, String email, String phone, String role, String urlavatar, String status) {
        this.idcontroller = idcontroller;
        this.fullname = fullname;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.role = role;
        this.urlavatar = urlavatar;
        this.status = status;
    }

    public Integer getIdcontroller() {
        return idcontroller;
    }

    public void setIdcontroller(Integer idcontroller) {
        this.idcontroller = idcontroller;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
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
//    public List<Sale> getSaleList() {
//        return saleList;
//    }
//
//    public void setSaleList(List<Sale> saleList) {
//        this.saleList = saleList;
//    }
//
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
        hash += (idcontroller != null ? idcontroller.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Controller)) {
            return false;
        }
        Controller other = (Controller) object;
        if ((this.idcontroller == null && other.idcontroller != null) || (this.idcontroller != null && !this.idcontroller.equals(other.idcontroller))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "fpt.aptech.spring_project_sem4_api.entities.Controller[ idcontroller=" + idcontroller + " ]";
    }
    
}
