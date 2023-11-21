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
@Table(name = "resumedigitaleachjob")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Resumedigitaleachjob.findAll", query = "SELECT r FROM Resumedigitaleachjob r"),
    @NamedQuery(name = "Resumedigitaleachjob.findByStt", query = "SELECT r FROM Resumedigitaleachjob r WHERE r.stt = :stt"),
    @NamedQuery(name = "Resumedigitaleachjob.findByIdresume", query = "SELECT r FROM Resumedigitaleachjob r WHERE r.idresume = :idresume"),
    @NamedQuery(name = "Resumedigitaleachjob.findByIdcandidate", query = "SELECT r FROM Resumedigitaleachjob r WHERE r.idcandidate = :idcandidate"),
    @NamedQuery(name = "Resumedigitaleachjob.findByIdjob", query = "SELECT r FROM Resumedigitaleachjob r WHERE r.idjob = :idjob")})
public class Resumedigitaleachjob implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "stt")
    private Integer stt;
    @Basic(optional = false)
    @Column(name = "idresume")
    private int idresume;
    @Basic(optional = false)
    @Column(name = "idcandidate")
    private int idcandidate;
    @Basic(optional = false)
    @Column(name = "idjob")
    private int idjob;

    public Resumedigitaleachjob() {
    }

    public Resumedigitaleachjob(Integer stt) {
        this.stt = stt;
    }

    public Resumedigitaleachjob(Integer stt, int idresume, int idcandidate, int idjob) {
        this.stt = stt;
        this.idresume = idresume;
        this.idcandidate = idcandidate;
        this.idjob = idjob;
    }

    public Integer getStt() {
        return stt;
    }

    public void setStt(Integer stt) {
        this.stt = stt;
    }

    public int getIdresume() {
        return idresume;
    }

    public void setIdresume(int idresume) {
        this.idresume = idresume;
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

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (stt != null ? stt.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Resumedigitaleachjob)) {
            return false;
        }
        Resumedigitaleachjob other = (Resumedigitaleachjob) object;
        if ((this.stt == null && other.stt != null) || (this.stt != null && !this.stt.equals(other.stt))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "fpt.aptech.spring_project_sem4_api.entities.Resumedigitaleachjob[ stt=" + stt + " ]";
    }
    
}
