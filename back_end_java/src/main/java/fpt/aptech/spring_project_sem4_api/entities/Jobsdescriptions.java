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
@Table(name = "jobsdescriptions")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Jobsdescriptions.findAll", query = "SELECT j FROM Jobsdescriptions j"),
    @NamedQuery(name = "Jobsdescriptions.findByIdjobsdescriptions", query = "SELECT j FROM Jobsdescriptions j WHERE j.idjobsdescriptions = :idjobsdescriptions"),
    @NamedQuery(name = "Jobsdescriptions.findByIdjob", query = "SELECT j FROM Jobsdescriptions j WHERE j.idjob = :idjob"),
    @NamedQuery(name = "Jobsdescriptions.findByJobsdescriptions", query = "SELECT j FROM Jobsdescriptions j WHERE j.jobsdescriptions = :jobsdescriptions")})
public class Jobsdescriptions implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "idjobsdescriptions")
    private Integer idjobsdescriptions;
    @Basic(optional = false)
    @Column(name = "idjob")
    private int idjob;
    @Basic(optional = false)
    @Column(name = "jobsdescriptions")
    private String jobsdescriptions;

    public Jobsdescriptions() {
    }

    public Jobsdescriptions(Integer idjobsdescriptions) {
        this.idjobsdescriptions = idjobsdescriptions;
    }

    public Jobsdescriptions(Integer idjobsdescriptions, int idjob, String jobsdescriptions) {
        this.idjobsdescriptions = idjobsdescriptions;
        this.idjob = idjob;
        this.jobsdescriptions = jobsdescriptions;
    }

    public Integer getIdjobsdescriptions() {
        return idjobsdescriptions;
    }

    public void setIdjobsdescriptions(Integer idjobsdescriptions) {
        this.idjobsdescriptions = idjobsdescriptions;
    }

    public int getIdjob() {
        return idjob;
    }

    public void setIdjob(int idjob) {
        this.idjob = idjob;
    }

    public String getJobsdescriptions() {
        return jobsdescriptions;
    }

    public void setJobsdescriptions(String jobsdescriptions) {
        this.jobsdescriptions = jobsdescriptions;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idjobsdescriptions != null ? idjobsdescriptions.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Jobsdescriptions)) {
            return false;
        }
        Jobsdescriptions other = (Jobsdescriptions) object;
        if ((this.idjobsdescriptions == null && other.idjobsdescriptions != null) || (this.idjobsdescriptions != null && !this.idjobsdescriptions.equals(other.idjobsdescriptions))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "fpt.aptech.spring_project_sem4_api.entities.Jobsdescriptions[ idjobsdescriptions=" + idjobsdescriptions + " ]";
    }
    
}
