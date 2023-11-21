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
@Table(name = "resumepdf")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Resumepdf.findAll", query = "SELECT r FROM Resumepdf r"),
    @NamedQuery(name = "Resumepdf.findByIdresumepdf", query = "SELECT r FROM Resumepdf r WHERE r.idresumepdf = :idresumepdf"),
    @NamedQuery(name = "Resumepdf.findByUrlfile", query = "SELECT r FROM Resumepdf r WHERE r.urlfile = :urlfile")})
public class Resumepdf implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "idresumepdf")
    private Integer idresumepdf;
    @Basic(optional = false)
    @Column(name = "urlfile")
    private String urlfile;
    @JoinColumn(name = "idcandidate", referencedColumnName = "idcandidate")
    @ManyToOne(optional = false)
    private Candidate idcandidate;

    public Resumepdf() {
    }

    public Resumepdf(Integer idresumepdf) {
        this.idresumepdf = idresumepdf;
    }

    public Resumepdf(Integer idresumepdf, String urlfile) {
        this.idresumepdf = idresumepdf;
        this.urlfile = urlfile;
    }

    public Integer getIdresumepdf() {
        return idresumepdf;
    }

    public void setIdresumepdf(Integer idresumepdf) {
        this.idresumepdf = idresumepdf;
    }

    public String getUrlfile() {
        return urlfile;
    }

    public void setUrlfile(String urlfile) {
        this.urlfile = urlfile;
    }

    public Candidate getIdcandidate() {
        return idcandidate;
    }

    public void setIdcandidate(Candidate idcandidate) {
        this.idcandidate = idcandidate;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idresumepdf != null ? idresumepdf.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Resumepdf)) {
            return false;
        }
        Resumepdf other = (Resumepdf) object;
        if ((this.idresumepdf == null && other.idresumepdf != null) || (this.idresumepdf != null && !this.idresumepdf.equals(other.idresumepdf))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "fpt.aptech.spring_project_sem4_api.entities.Resumepdf[ idresumepdf=" + idresumepdf + " ]";
    }
    
}
