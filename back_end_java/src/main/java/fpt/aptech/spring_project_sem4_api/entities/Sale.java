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
@Table(name = "sale")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Sale.findAll", query = "SELECT s FROM Sale s"),
    @NamedQuery(name = "Sale.findByIdsale", query = "SELECT s FROM Sale s WHERE s.idsale = :idsale"),
    @NamedQuery(name = "Sale.findByIdjob", query = "SELECT s FROM Sale s WHERE s.idjob = :idjob"),
    @NamedQuery(name = "Sale.findBySale", query = "SELECT s FROM Sale s WHERE s.sale = :sale"),
    @NamedQuery(name = "Sale.findByPostdate", query = "SELECT s FROM Sale s WHERE s.postdate = :postdate")})
public class Sale implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "idsale")
    private Integer idsale;
    @Basic(optional = false)
    @Column(name = "idjob")
    private int idjob;
    @Basic(optional = false)
    @Column(name = "sale")
    private int sale;
    @Basic(optional = false)
    @Column(name = "postdate")
    @Temporal(TemporalType.DATE)
    private Date postdate;
    @JoinColumn(name = "idcontroller", referencedColumnName = "idcontroller")
    @ManyToOne(optional = false)
    private Controller idcontroller;

    public Sale() {
    }

    public Sale(Integer idsale) {
        this.idsale = idsale;
    }

    public Sale(Integer idsale, int idjob, int sale, Date postdate) {
        this.idsale = idsale;
        this.idjob = idjob;
        this.sale = sale;
        this.postdate = postdate;
    }

    public Integer getIdsale() {
        return idsale;
    }

    public void setIdsale(Integer idsale) {
        this.idsale = idsale;
    }

    public int getIdjob() {
        return idjob;
    }

    public void setIdjob(int idjob) {
        this.idjob = idjob;
    }

    public int getSale() {
        return sale;
    }

    public void setSale(int sale) {
        this.sale = sale;
    }

    public Date getPostdate() {
        return postdate;
    }

    public void setPostdate(Date postdate) {
        this.postdate = postdate;
    }

    public Controller getIdcontroller() {
        return idcontroller;
    }

    public void setIdcontroller(Controller idcontroller) {
        this.idcontroller = idcontroller;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idsale != null ? idsale.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Sale)) {
            return false;
        }
        Sale other = (Sale) object;
        if ((this.idsale == null && other.idsale != null) || (this.idsale != null && !this.idsale.equals(other.idsale))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "fpt.aptech.spring_project_sem4_api.entities.Sale[ idsale=" + idsale + " ]";
    }
    
}
