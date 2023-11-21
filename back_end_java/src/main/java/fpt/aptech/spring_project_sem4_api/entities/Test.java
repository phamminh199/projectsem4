/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package fpt.aptech.spring_project_sem4_api.entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author vuna
 */
@Entity
@Table(name = "test")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Test.findAll", query = "SELECT t FROM Test t"),
    @NamedQuery(name = "Test.findByIdtest", query = "SELECT t FROM Test t WHERE t.idtest = :idtest"),
    @NamedQuery(name = "Test.findByIdcandidate", query = "SELECT t FROM Test t WHERE t.idcandidate = :idcandidate")})
public class Test implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "idtest")
    private Integer idtest;
    @Basic(optional = false)
    @Column(name = "idcandidate")
    private int idcandidate;
//    @JoinColumn(name = "idquestioncompleted", referencedColumnName = "idquestion")
//    @ManyToOne(optional = false)
//    private Question idquestioncompleted;

    public Test() {
    }

    public Test(Integer idtest) {
        this.idtest = idtest;
    }

    public Test(Integer idtest, int idcandidate) {
        this.idtest = idtest;
        this.idcandidate = idcandidate;
    }

    public Integer getIdtest() {
        return idtest;
    }

    public void setIdtest(Integer idtest) {
        this.idtest = idtest;
    }

    public int getIdcandidate() {
        return idcandidate;
    }

    public void setIdcandidate(int idcandidate) {
        this.idcandidate = idcandidate;
    }

//    public Question getIdquestioncompleted() {
//        return idquestioncompleted;
//    }
//
//    public void setIdquestioncompleted(Question idquestioncompleted) {
//        this.idquestioncompleted = idquestioncompleted;
//    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idtest != null ? idtest.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Test)) {
            return false;
        }
        Test other = (Test) object;
        if ((this.idtest == null && other.idtest != null) || (this.idtest != null && !this.idtest.equals(other.idtest))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "fpt.aptech.spring_project_sem4_api.entities.Test[ idtest=" + idtest + " ]";
    }
    
}
