/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package fpt.aptech.spring_project_sem4_api.entities;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author vuna
 */
@Entity
@Table(name = "resumeeachjob")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Resumeeachjob.findAll", query = "SELECT r FROM Resumeeachjob r"),
    @NamedQuery(name = "Resumeeachjob.findByIdresumeeachjob", query = "SELECT r FROM Resumeeachjob r WHERE r.idresumeeachjob = :idresumeeachjob"),
    @NamedQuery(name = "Resumeeachjob.findByIdcandidate", query = "SELECT r FROM Resumeeachjob r WHERE r.idcandidate = :idcandidate"),
    @NamedQuery(name = "Resumeeachjob.findByUrlfile", query = "SELECT r FROM Resumeeachjob r WHERE r.urlfile = :urlfile"),
    @NamedQuery(name = "Resumeeachjob.findByIdjob", query = "SELECT r FROM Resumeeachjob r WHERE r.idjob = :idjob"),
    @NamedQuery(name = "Resumeeachjob.findByApplydate", query = "SELECT r FROM Resumeeachjob r WHERE r.applydate = :applydate")})
public class Resumeeachjob implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "idresumeeachjob")
    private Integer idresumeeachjob;
    @Basic(optional = false)
    @Column(name = "idcandidate")
    private int idcandidate;
    @Basic(optional = false)
    @Column(name = "urlfile")
    private String urlfile;
    @Basic(optional = false)
    @Column(name = "idjob")
    private int idjob;
    @Basic(optional = false)
    @Column(name = "applydate")
    @Temporal(TemporalType.DATE)
    private Date applydate;

    public Resumeeachjob() {
    }

    public Resumeeachjob(Integer idresumeeachjob) {
        this.idresumeeachjob = idresumeeachjob;
    }

    public Resumeeachjob(Integer idresumeeachjob, int idcandidate, String urlfile, int idjob, Date applydate) {
        this.idresumeeachjob = idresumeeachjob;
        this.idcandidate = idcandidate;
        this.urlfile = urlfile;
        this.idjob = idjob;
        this.applydate = applydate;
    }

    public Integer getIdresumeeachjob() {
        return idresumeeachjob;
    }

    public void setIdresumeeachjob(Integer idresumeeachjob) {
        this.idresumeeachjob = idresumeeachjob;
    }

    public int getIdcandidate() {
        return idcandidate;
    }

    public void setIdcandidate(int idcandidate) {
        this.idcandidate = idcandidate;
    }

    public String getUrlfile() {
        return urlfile;
    }

    public void setUrlfile(String urlfile) {
        this.urlfile = urlfile;
    }

    public int getIdjob() {
        return idjob;
    }

    public void setIdjob(int idjob) {
        this.idjob = idjob;
    }

    public Date getApplydate() {
        return applydate;
    }

    public void setApplydate(Date applydate) {
        this.applydate = applydate;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idresumeeachjob != null ? idresumeeachjob.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Resumeeachjob)) {
            return false;
        }
        Resumeeachjob other = (Resumeeachjob) object;
        if ((this.idresumeeachjob == null && other.idresumeeachjob != null) || (this.idresumeeachjob != null && !this.idresumeeachjob.equals(other.idresumeeachjob))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "fpt.aptech.spring_project_sem4_api.entities.Resumeeachjob[ idresumeeachjob=" + idresumeeachjob + " ]";
    }
    
}
