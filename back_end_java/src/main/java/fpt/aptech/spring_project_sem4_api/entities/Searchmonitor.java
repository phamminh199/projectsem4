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
@Table(name = "searchmonitor")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Searchmonitor.findAll", query = "SELECT s FROM Searchmonitor s"),
    @NamedQuery(name = "Searchmonitor.findByIdsearch", query = "SELECT s FROM Searchmonitor s WHERE s.idsearch = :idsearch"),
    @NamedQuery(name = "Searchmonitor.findBySearch", query = "SELECT s FROM Searchmonitor s WHERE s.search = :search"),
    @NamedQuery(name = "Searchmonitor.findBySearchtime", query = "SELECT s FROM Searchmonitor s WHERE s.searchtime = :searchtime")})
public class Searchmonitor implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "idsearch")
    private Integer idsearch;
    @Basic(optional = false)
    @Column(name = "search")
    private String search;
    @Basic(optional = false)
    @Column(name = "searchtime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date searchtime;

    public Searchmonitor() {
    }

    public Searchmonitor(Integer idsearch) {
        this.idsearch = idsearch;
    }

    public Searchmonitor(Integer idsearch, String search, Date searchtime) {
        this.idsearch = idsearch;
        this.search = search;
        this.searchtime = searchtime;
    }

    public Integer getIdsearch() {
        return idsearch;
    }

    public void setIdsearch(Integer idsearch) {
        this.idsearch = idsearch;
    }

    public String getSearch() {
        return search;
    }

    public void setSearch(String search) {
        this.search = search;
    }

    public Date getSearchtime() {
        return searchtime;
    }

    public void setSearchtime(Date searchtime) {
        this.searchtime = searchtime;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idsearch != null ? idsearch.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Searchmonitor)) {
            return false;
        }
        Searchmonitor other = (Searchmonitor) object;
        if ((this.idsearch == null && other.idsearch != null) || (this.idsearch != null && !this.idsearch.equals(other.idsearch))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "fpt.aptech.spring_project_sem4_api.entities.Searchmonitor[ idsearch=" + idsearch + " ]";
    }
    
}
