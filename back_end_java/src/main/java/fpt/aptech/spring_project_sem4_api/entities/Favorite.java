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
@Table(name = "favorite")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Favorite.findAll", query = "SELECT f FROM Favorite f"),
    @NamedQuery(name = "Favorite.findByIdfavorite", query = "SELECT f FROM Favorite f WHERE f.idfavorite = :idfavorite")})
public class Favorite implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "idfavorite")
    private Integer idfavorite;
    @JoinColumn(name = "idcandidate", referencedColumnName = "idcandidate")
    @ManyToOne(optional = false)
    private Candidate idcandidate;
    @JoinColumn(name = "idjob", referencedColumnName = "idjob")
    @ManyToOne(optional = false)
    private Job idjob;

    public Favorite() {
    }

    public Favorite(Integer idfavorite) {
        this.idfavorite = idfavorite;
    }

    public Integer getIdfavorite() {
        return idfavorite;
    }

    public void setIdfavorite(Integer idfavorite) {
        this.idfavorite = idfavorite;
    }

    public Candidate getIdcandidate() {
        return idcandidate;
    }

    public void setIdcandidate(Candidate idcandidate) {
        this.idcandidate = idcandidate;
    }

    public Job getIdjob() {
        return idjob;
    }

    public void setIdjob(Job idjob) {
        this.idjob = idjob;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idfavorite != null ? idfavorite.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Favorite)) {
            return false;
        }
        Favorite other = (Favorite) object;
        if ((this.idfavorite == null && other.idfavorite != null) || (this.idfavorite != null && !this.idfavorite.equals(other.idfavorite))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "fpt.aptech.spring_project_sem4_api.entities.Favorite[ idfavorite=" + idfavorite + " ]";
    }
    
}
