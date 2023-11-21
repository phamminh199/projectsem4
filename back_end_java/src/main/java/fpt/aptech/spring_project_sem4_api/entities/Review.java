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
@Table(name = "review")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Review.findAll", query = "SELECT r FROM Review r"),
    @NamedQuery(name = "Review.findById", query = "SELECT r FROM Review r WHERE r.id = :id"),
    @NamedQuery(name = "Review.findByIdgroup", query = "SELECT r FROM Review r WHERE r.idgroup = :idgroup"),
    @NamedQuery(name = "Review.findByIdreview", query = "SELECT r FROM Review r WHERE r.idreview = :idreview"),
    @NamedQuery(name = "Review.findByIdcandidate", query = "SELECT r FROM Review r WHERE r.idcandidate = :idcandidate"),
    @NamedQuery(name = "Review.findByIdcontroller", query = "SELECT r FROM Review r WHERE r.idcontroller = :idcontroller"),
    @NamedQuery(name = "Review.findByIdemployer", query = "SELECT r FROM Review r WHERE r.idemployer = :idemployer"),
    @NamedQuery(name = "Review.findByIdcompany", query = "SELECT r FROM Review r WHERE r.idcompany = :idcompany"),
    @NamedQuery(name = "Review.findByContent", query = "SELECT r FROM Review r WHERE r.content = :content"),
    @NamedQuery(name = "Review.findByPostdate", query = "SELECT r FROM Review r WHERE r.postdate = :postdate"),
    @NamedQuery(name = "Review.findByType", query = "SELECT r FROM Review r WHERE r.type = :type"),
    @NamedQuery(name = "Review.findByStatus", query = "SELECT r FROM Review r WHERE r.status = :status"),
    @NamedQuery(name = "Review.findByReply", query = "SELECT r FROM Review r WHERE r.reply = :reply")})
public class Review implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @Column(name = "idgroup")
    private int idgroup;
    @Basic(optional = false)
    @Column(name = "idreview")
    private int idreview;
    @Basic(optional = false)
    @Column(name = "idcandidate")
    private int idcandidate;
    @Basic(optional = false)
    @Column(name = "idcontroller")
    private int idcontroller;
    @Basic(optional = false)
    @Column(name = "idemployer")
    private int idemployer;
    @Basic(optional = false)
    @Column(name = "idcompany")
    private int idcompany;
    @Basic(optional = false)
    @Column(name = "content")
    private String content;
    @Basic(optional = false)
    @Column(name = "postdate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date postdate;
    @Basic(optional = false)
    @Column(name = "type")
    private String type;
    @Basic(optional = false)
    @Column(name = "status")
    private String status;
    @Basic(optional = false)
    @Column(name = "reply")
    private String reply;

    public Review() {
    }

    public Review(Integer id) {
        this.id = id;
    }

    public Review(Integer id, int idgroup, int idreview, int idcandidate, int idcontroller, int idemployer, int idcompany, String content, Date postdate, String type, String status, String reply) {
        this.id = id;
        this.idgroup = idgroup;
        this.idreview = idreview;
        this.idcandidate = idcandidate;
        this.idcontroller = idcontroller;
        this.idemployer = idemployer;
        this.idcompany = idcompany;
        this.content = content;
        this.postdate = postdate;
        this.type = type;
        this.status = status;
        this.reply = reply;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getIdgroup() {
        return idgroup;
    }

    public void setIdgroup(int idgroup) {
        this.idgroup = idgroup;
    }

    public int getIdreview() {
        return idreview;
    }

    public void setIdreview(int idreview) {
        this.idreview = idreview;
    }

    public int getIdcandidate() {
        return idcandidate;
    }

    public void setIdcandidate(int idcandidate) {
        this.idcandidate = idcandidate;
    }

    public int getIdcontroller() {
        return idcontroller;
    }

    public void setIdcontroller(int idcontroller) {
        this.idcontroller = idcontroller;
    }

    public int getIdemployer() {
        return idemployer;
    }

    public void setIdemployer(int idemployer) {
        this.idemployer = idemployer;
    }

    public int getIdcompany() {
        return idcompany;
    }

    public void setIdcompany(int idcompany) {
        this.idcompany = idcompany;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getPostdate() {
        return postdate;
    }

    public void setPostdate(Date postdate) {
        this.postdate = postdate;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getReply() {
        return reply;
    }

    public void setReply(String reply) {
        this.reply = reply;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Review)) {
            return false;
        }
        Review other = (Review) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "fpt.aptech.spring_project_sem4_api.entities.Review[ id=" + id + " ]";
    }
    
}
