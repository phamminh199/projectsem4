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
@Table(name = "jobskill")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Jobskill.findAll", query = "SELECT j FROM Jobskill j"),
    @NamedQuery(name = "Jobskill.findByIdjobskill", query = "SELECT j FROM Jobskill j WHERE j.idjobskill = :idjobskill"),
    @NamedQuery(name = "Jobskill.findByIdjob", query = "SELECT j FROM Jobskill j WHERE j.idjob = :idjob"),
    @NamedQuery(name = "Jobskill.findByIdskill", query = "SELECT j FROM Jobskill j WHERE j.idskill = :idskill")})
public class Jobskill implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "idjobskill")
    private Integer idjobskill;
    @Basic(optional = false)
    @Column(name = "idjob")
    private int idjob;
    @Basic(optional = false)
    @Column(name = "idskill")
    private int idskill;

    public Jobskill() {
    }

    public Jobskill(Integer idjobskill) {
        this.idjobskill = idjobskill;
    }

    public Jobskill(Integer idjobskill, int idjob, int idskill) {
        this.idjobskill = idjobskill;
        this.idjob = idjob;
        this.idskill = idskill;
    }

    public Integer getIdjobskill() {
        return idjobskill;
    }

    public void setIdjobskill(Integer idjobskill) {
        this.idjobskill = idjobskill;
    }

    public int getIdjob() {
        return idjob;
    }

    public void setIdjob(int idjob) {
        this.idjob = idjob;
    }

    public int getIdskill() {
        return idskill;
    }

    public void setIdskill(int idskill) {
        this.idskill = idskill;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idjobskill != null ? idjobskill.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Jobskill)) {
            return false;
        }
        Jobskill other = (Jobskill) object;
        if ((this.idjobskill == null && other.idjobskill != null) || (this.idjobskill != null && !this.idjobskill.equals(other.idjobskill))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "fpt.aptech.spring_project_sem4_api.entities.Jobskill[ idjobskill=" + idjobskill + " ]";
    }
    
}
