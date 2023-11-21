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
@Table(name = "reasonstojoin")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Reasonstojoin.findAll", query = "SELECT r FROM Reasonstojoin r"),
    @NamedQuery(name = "Reasonstojoin.findByIdreasontojoin", query = "SELECT r FROM Reasonstojoin r WHERE r.idreasontojoin = :idreasontojoin"),
    @NamedQuery(name = "Reasonstojoin.findByIdjob", query = "SELECT r FROM Reasonstojoin r WHERE r.idjob = :idjob"),
    @NamedQuery(name = "Reasonstojoin.findByReasonstojoin", query = "SELECT r FROM Reasonstojoin r WHERE r.reasonstojoin = :reasonstojoin")})
public class Reasonstojoin implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "idreasontojoin")
    private Integer idreasontojoin;
    @Basic(optional = false)
    @Column(name = "idjob")
    private int idjob;
    @Basic(optional = false)
    @Column(name = "reasonstojoin")
    private String reasonstojoin;

    public Reasonstojoin() {
    }

    public Reasonstojoin(Integer idreasontojoin) {
        this.idreasontojoin = idreasontojoin;
    }

    public Reasonstojoin(Integer idreasontojoin, int idjob, String reasonstojoin) {
        this.idreasontojoin = idreasontojoin;
        this.idjob = idjob;
        this.reasonstojoin = reasonstojoin;
    }

    public Integer getIdreasontojoin() {
        return idreasontojoin;
    }

    public void setIdreasontojoin(Integer idreasontojoin) {
        this.idreasontojoin = idreasontojoin;
    }

    public int getIdjob() {
        return idjob;
    }

    public void setIdjob(int idjob) {
        this.idjob = idjob;
    }

    public String getReasonstojoin() {
        return reasonstojoin;
    }

    public void setReasonstojoin(String reasonstojoin) {
        this.reasonstojoin = reasonstojoin;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idreasontojoin != null ? idreasontojoin.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Reasonstojoin)) {
            return false;
        }
        Reasonstojoin other = (Reasonstojoin) object;
        if ((this.idreasontojoin == null && other.idreasontojoin != null) || (this.idreasontojoin != null && !this.idreasontojoin.equals(other.idreasontojoin))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "fpt.aptech.spring_project_sem4_api.entities.Reasonstojoin[ idreasontojoin=" + idreasontojoin + " ]";
    }
    
}
