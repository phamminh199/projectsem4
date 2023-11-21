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
@Table(name = "viewreview")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Viewreview.findAll", query = "SELECT v FROM Viewreview v"),
    @NamedQuery(name = "Viewreview.findById", query = "SELECT v FROM Viewreview v WHERE v.id = :id"),
    @NamedQuery(name = "Viewreview.findByIdgroup", query = "SELECT v FROM Viewreview v WHERE v.idgroup = :idgroup"),
    @NamedQuery(name = "Viewreview.findByIdreview", query = "SELECT v FROM Viewreview v WHERE v.idreview = :idreview"),
    @NamedQuery(name = "Viewreview.findByIdcandidate", query = "SELECT v FROM Viewreview v WHERE v.idcandidate = :idcandidate"),
    @NamedQuery(name = "Viewreview.findByIdcontroller", query = "SELECT v FROM Viewreview v WHERE v.idcontroller = :idcontroller"),
    @NamedQuery(name = "Viewreview.findByIdemployer", query = "SELECT v FROM Viewreview v WHERE v.idemployer = :idemployer"),
    @NamedQuery(name = "Viewreview.findByIdcompany", query = "SELECT v FROM Viewreview v WHERE v.idcompany = :idcompany"),
    @NamedQuery(name = "Viewreview.findByContent", query = "SELECT v FROM Viewreview v WHERE v.content = :content"),
    @NamedQuery(name = "Viewreview.findByPostdate", query = "SELECT v FROM Viewreview v WHERE v.postdate = :postdate"),
    @NamedQuery(name = "Viewreview.findByType", query = "SELECT v FROM Viewreview v WHERE v.type = :type"),
    @NamedQuery(name = "Viewreview.findByStatus", query = "SELECT v FROM Viewreview v WHERE v.status = :status"),
    @NamedQuery(name = "Viewreview.findByReply", query = "SELECT v FROM Viewreview v WHERE v.reply = :reply"),
    @NamedQuery(name = "Viewreview.findByCandidateurl", query = "SELECT v FROM Viewreview v WHERE v.candidateurl = :candidateurl"),
    @NamedQuery(name = "Viewreview.findByCandidatename", query = "SELECT v FROM Viewreview v WHERE v.candidatename = :candidatename"),
    @NamedQuery(name = "Viewreview.findByControllerurl", query = "SELECT v FROM Viewreview v WHERE v.controllerurl = :controllerurl"),
    @NamedQuery(name = "Viewreview.findByControllername", query = "SELECT v FROM Viewreview v WHERE v.controllername = :controllername"),
    @NamedQuery(name = "Viewreview.findByEmployerurl", query = "SELECT v FROM Viewreview v WHERE v.employerurl = :employerurl"),
    @NamedQuery(name = "Viewreview.findByEmployername", query = "SELECT v FROM Viewreview v WHERE v.employername = :employername")})
public class Viewreview implements Serializable {

    private static final long serialVersionUID = 1L;
    @Basic(optional = false)
    @Id
    @Column(name = "id")
    private int id;
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
    @Column(name = "candidateurl")
    private String candidateurl;
    @Column(name = "candidatename")
    private String candidatename;
    @Column(name = "controllerurl")
    private String controllerurl;
    @Column(name = "controllername")
    private String controllername;
    @Column(name = "employerurl")
    private String employerurl;
    @Column(name = "employername")
    private String employername;

    public Viewreview() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
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

    public String getCandidateurl() {
        return candidateurl;
    }

    public void setCandidateurl(String candidateurl) {
        this.candidateurl = candidateurl;
    }

    public String getCandidatename() {
        return candidatename;
    }

    public void setCandidatename(String candidatename) {
        this.candidatename = candidatename;
    }

    public String getControllerurl() {
        return controllerurl;
    }

    public void setControllerurl(String controllerurl) {
        this.controllerurl = controllerurl;
    }

    public String getControllername() {
        return controllername;
    }

    public void setControllername(String controllername) {
        this.controllername = controllername;
    }

    public String getEmployerurl() {
        return employerurl;
    }

    public void setEmployerurl(String employerurl) {
        this.employerurl = employerurl;
    }

    public String getEmployername() {
        return employername;
    }

    public void setEmployername(String employername) {
        this.employername = employername;
    }
    
}
