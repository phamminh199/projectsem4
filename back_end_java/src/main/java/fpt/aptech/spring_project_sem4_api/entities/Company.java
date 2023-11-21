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
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author vuna
 */
@Entity
@Table(name = "company")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Company.findAll", query = "SELECT c FROM Company c"),
    @NamedQuery(name = "Company.findByIdcompany", query = "SELECT c FROM Company c WHERE c.idcompany = :idcompany"),
    @NamedQuery(name = "Company.findByCompanyname", query = "SELECT c FROM Company c WHERE c.companyname = :companyname"),
    @NamedQuery(name = "Company.findBySize", query = "SELECT c FROM Company c WHERE c.size = :size"),
    @NamedQuery(name = "Company.findByOvertime", query = "SELECT c FROM Company c WHERE c.overtime = :overtime"),
    @NamedQuery(name = "Company.findByCountry", query = "SELECT c FROM Company c WHERE c.country = :country")})
public class Company implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "idcompany")
    private Integer idcompany;
    @Basic(optional = false)
    @Column(name = "companyname")
    private String companyname;
    @Basic(optional = false)
    @Column(name = "size")
    private String size;
    @Basic(optional = false)
    @Column(name = "overtime")
    private String overtime;
    @Basic(optional = false)
    @Column(name = "country")
    private String country;
//    @OneToOne(cascade = CascadeType.ALL, mappedBy = "company")
//    private Review review;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idcompany")
    private List<Employer> employerList;

    public Company() {
    }

    public Company(Integer idcompany) {
        this.idcompany = idcompany;
    }

    public Company(Integer idcompany, String companyname, String size, String overtime, String country) {
        this.idcompany = idcompany;
        this.companyname = companyname;
        this.size = size;
        this.overtime = overtime;
        this.country = country;
    }

    public Integer getIdcompany() {
        return idcompany;
    }

    public void setIdcompany(Integer idcompany) {
        this.idcompany = idcompany;
    }

    public String getCompanyname() {
        return companyname;
    }

    public void setCompanyname(String companyname) {
        this.companyname = companyname;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getOvertime() {
        return overtime;
    }

    public void setOvertime(String overtime) {
        this.overtime = overtime;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

//    public Review getReview() {
//        return review;
//    }
//
//    public void setReview(Review review) {
//        this.review = review;
//    }
//
//    @XmlTransient
//    public List<Employer> getEmployerList() {
//        return employerList;
//    }
//
//    public void setEmployerList(List<Employer> employerList) {
//        this.employerList = employerList;
//    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idcompany != null ? idcompany.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Company)) {
            return false;
        }
        Company other = (Company) object;
        if ((this.idcompany == null && other.idcompany != null) || (this.idcompany != null && !this.idcompany.equals(other.idcompany))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "fpt.aptech.spring_project_sem4_api.entities.Company[ idcompany=" + idcompany + " ]";
    }
    
}
