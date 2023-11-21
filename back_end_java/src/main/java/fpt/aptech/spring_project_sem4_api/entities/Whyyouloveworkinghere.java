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
@Table(name = "whyyouloveworkinghere")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Whyyouloveworkinghere.findAll", query = "SELECT w FROM Whyyouloveworkinghere w"),
    @NamedQuery(name = "Whyyouloveworkinghere.findByIdwhyyouloveworkinghere", query = "SELECT w FROM Whyyouloveworkinghere w WHERE w.idwhyyouloveworkinghere = :idwhyyouloveworkinghere"),
    @NamedQuery(name = "Whyyouloveworkinghere.findByIdjob", query = "SELECT w FROM Whyyouloveworkinghere w WHERE w.idjob = :idjob"),
    @NamedQuery(name = "Whyyouloveworkinghere.findByWhyyouloveworkinghere", query = "SELECT w FROM Whyyouloveworkinghere w WHERE w.whyyouloveworkinghere = :whyyouloveworkinghere")})
public class Whyyouloveworkinghere implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "idwhyyouloveworkinghere")
    private Integer idwhyyouloveworkinghere;
    @Basic(optional = false)
    @Column(name = "idjob")
    private int idjob;
    @Basic(optional = false)
    @Column(name = "whyyouloveworkinghere")
    private String whyyouloveworkinghere;

    public Whyyouloveworkinghere() {
    }

    public Whyyouloveworkinghere(Integer idwhyyouloveworkinghere) {
        this.idwhyyouloveworkinghere = idwhyyouloveworkinghere;
    }

    public Whyyouloveworkinghere(Integer idwhyyouloveworkinghere, int idjob, String whyyouloveworkinghere) {
        this.idwhyyouloveworkinghere = idwhyyouloveworkinghere;
        this.idjob = idjob;
        this.whyyouloveworkinghere = whyyouloveworkinghere;
    }

    public Integer getIdwhyyouloveworkinghere() {
        return idwhyyouloveworkinghere;
    }

    public void setIdwhyyouloveworkinghere(Integer idwhyyouloveworkinghere) {
        this.idwhyyouloveworkinghere = idwhyyouloveworkinghere;
    }

    public int getIdjob() {
        return idjob;
    }

    public void setIdjob(int idjob) {
        this.idjob = idjob;
    }

    public String getWhyyouloveworkinghere() {
        return whyyouloveworkinghere;
    }

    public void setWhyyouloveworkinghere(String whyyouloveworkinghere) {
        this.whyyouloveworkinghere = whyyouloveworkinghere;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idwhyyouloveworkinghere != null ? idwhyyouloveworkinghere.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Whyyouloveworkinghere)) {
            return false;
        }
        Whyyouloveworkinghere other = (Whyyouloveworkinghere) object;
        if ((this.idwhyyouloveworkinghere == null && other.idwhyyouloveworkinghere != null) || (this.idwhyyouloveworkinghere != null && !this.idwhyyouloveworkinghere.equals(other.idwhyyouloveworkinghere))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "fpt.aptech.spring_project_sem4_api.entities.Whyyouloveworkinghere[ idwhyyouloveworkinghere=" + idwhyyouloveworkinghere + " ]";
    }
    
}
