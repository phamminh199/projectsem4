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
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author vuna
 */
@Entity
@Table(name = "testresult")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Testresult.findAll", query = "SELECT t FROM Testresult t"),
    @NamedQuery(name = "Testresult.findByIdtest", query = "SELECT t FROM Testresult t WHERE t.idtest = :idtest"),
    @NamedQuery(name = "Testresult.findByIdcandidate", query = "SELECT t FROM Testresult t WHERE t.idcandidate = :idcandidate"),
    @NamedQuery(name = "Testresult.findByIdjob", query = "SELECT t FROM Testresult t WHERE t.idjob = :idjob"),
    @NamedQuery(name = "Testresult.findByResult", query = "SELECT t FROM Testresult t WHERE t.result = :result")})
public class Testresult implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "idtest")
    private Integer idtest;
    @Basic(optional = false)
    @Column(name = "idcandidate")
    private int idcandidate;
    @Basic(optional = false)
    @Column(name = "idjob")
    private int idjob;
    @Basic(optional = false)
    @Column(name = "result")
    private int result;

    public Testresult() {
    }

    public Testresult(Integer idtest) {
        this.idtest = idtest;
    }

    public Testresult(Integer idtest, int idcandidate, int idjob, int result) {
        this.idtest = idtest;
        this.idcandidate = idcandidate;
        this.idjob = idjob;
        this.result = result;
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

    public int getIdjob() {
        return idjob;
    }

    public void setIdjob(int idjob) {
        this.idjob = idjob;
    }

    public int getResult() {
        return result;
    }

    public void setResult(int result) {
        this.result = result;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idtest != null ? idtest.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Testresult)) {
            return false;
        }
        Testresult other = (Testresult) object;
        if ((this.idtest == null && other.idtest != null) || (this.idtest != null && !this.idtest.equals(other.idtest))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "fpt.aptech.spring_project_sem4_api.entities.Testresult[ idtest=" + idtest + " ]";
    }
    
}
