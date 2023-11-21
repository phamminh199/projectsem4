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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
@Table(name = "jobmonitor")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Jobmonitor.findAll", query = "SELECT j FROM Jobmonitor j"),
    @NamedQuery(name = "Jobmonitor.findByIdclick", query = "SELECT j FROM Jobmonitor j WHERE j.idclick = :idclick"),
    @NamedQuery(name = "Jobmonitor.findByClickedcount", query = "SELECT j FROM Jobmonitor j WHERE j.clickedcount = :clickedcount"),
    @NamedQuery(name = "Jobmonitor.findByHovercount", query = "SELECT j FROM Jobmonitor j WHERE j.hovercount = :hovercount"),
    @NamedQuery(name = "Jobmonitor.findByDateclick", query = "SELECT j FROM Jobmonitor j WHERE j.dateclick = :dateclick")})
public class Jobmonitor implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "idclick")
    private Integer idclick;
    @Basic(optional = false)
    @Column(name = "clickedcount")
    private int clickedcount;
    @Basic(optional = false)
    @Column(name = "hovercount")
    private int hovercount;
    @Basic(optional = false)
    @Column(name = "dateclick")
    @Temporal(TemporalType.DATE)
    private Date dateclick;
    @JoinColumn(name = "idjobclick", referencedColumnName = "idjob")
    @ManyToOne(optional = false)
    private Job idjobclick;

    public Jobmonitor() {
    }

    public Jobmonitor(Integer idclick) {
        this.idclick = idclick;
    }

    public Jobmonitor(Integer idclick, int clickedcount, int hovercount, Date dateclick) {
        this.idclick = idclick;
        this.clickedcount = clickedcount;
        this.hovercount = hovercount;
        this.dateclick = dateclick;
    }

    public Integer getIdclick() {
        return idclick;
    }

    public void setIdclick(Integer idclick) {
        this.idclick = idclick;
    }

    public int getClickedcount() {
        return clickedcount;
    }

    public void setClickedcount(int clickedcount) {
        this.clickedcount = clickedcount;
    }

    public int getHovercount() {
        return hovercount;
    }

    public void setHovercount(int hovercount) {
        this.hovercount = hovercount;
    }

    public Date getDateclick() {
        return dateclick;
    }

    public void setDateclick(Date dateclick) {
        this.dateclick = dateclick;
    }

    public Job getIdjobclick() {
        return idjobclick;
    }

    public void setIdjobclick(Job idjobclick) {
        this.idjobclick = idjobclick;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idclick != null ? idclick.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Jobmonitor)) {
            return false;
        }
        Jobmonitor other = (Jobmonitor) object;
        if ((this.idclick == null && other.idclick != null) || (this.idclick != null && !this.idclick.equals(other.idclick))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "fpt.aptech.spring_project_sem4_api.entities.Jobmonitor[ idclick=" + idclick + " ]";
    }
    
}
