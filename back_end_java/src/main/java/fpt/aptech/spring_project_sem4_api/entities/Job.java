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
@Table(name = "job")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Job.findAll", query = "SELECT j FROM Job j"),
    @NamedQuery(name = "Job.findByIdjob", query = "SELECT j FROM Job j WHERE j.idjob = :idjob"),
    @NamedQuery(name = "Job.findByIdemployer", query = "SELECT j FROM Job j WHERE j.idemployer = :idemployer"),
    @NamedQuery(name = "Job.findByIdcontroller", query = "SELECT j FROM Job j WHERE j.idcontroller = :idcontroller"),
    @NamedQuery(name = "Job.findByPostdate", query = "SELECT j FROM Job j WHERE j.postdate = :postdate"),
    @NamedQuery(name = "Job.findByAddress", query = "SELECT j FROM Job j WHERE j.address = :address"),
    @NamedQuery(name = "Job.findByCity", query = "SELECT j FROM Job j WHERE j.city = :city"),
    @NamedQuery(name = "Job.findByWorkmode", query = "SELECT j FROM Job j WHERE j.workmode = :workmode"),
    @NamedQuery(name = "Job.findByExpiredate", query = "SELECT j FROM Job j WHERE j.expiredate = :expiredate"),
    @NamedQuery(name = "Job.findBySalary", query = "SELECT j FROM Job j WHERE j.salary = :salary"),
    @NamedQuery(name = "Job.findByStatus", query = "SELECT j FROM Job j WHERE j.status = :status"),
    @NamedQuery(name = "Job.findByLevel", query = "SELECT j FROM Job j WHERE j.level = :level"),
    @NamedQuery(name = "Job.findByJobtitle", query = "SELECT j FROM Job j WHERE j.jobtitle = :jobtitle")})
public class Job implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "idjob")
    private Integer idjob;
    @Basic(optional = false)
    @Column(name = "idemployer")
    private int idemployer;
    @Basic(optional = false)
    @Column(name = "idcontroller")
    private int idcontroller;
    @Basic(optional = false)
    @Column(name = "postdate")
    @Temporal(TemporalType.DATE)
    private Date postdate;
    @Basic(optional = false)
    @Column(name = "address")
    private String address;
    @Basic(optional = false)
    @Column(name = "city")
    private String city;
    @Basic(optional = false)
    @Column(name = "workmode")
    private String workmode;
    @Basic(optional = false)
    @Column(name = "expiredate")
    @Temporal(TemporalType.DATE)
    private Date expiredate;
    @Basic(optional = false)
    @Column(name = "salary")
    private int salary;
    @Basic(optional = false)
    @Column(name = "status")
    private String status;
    @Basic(optional = false)
    @Column(name = "level")
    private String level;
    @Basic(optional = false)
    @Column(name = "jobtitle")
    private String jobtitle;

    public Job() {
    }

    public Job(Integer idjob) {
        this.idjob = idjob;
    }

    public Job(Integer idjob, int idemployer, int idcontroller, Date postdate, String address, String city, String workmode, Date expiredate, int salary, String status, String level, String jobtitle) {
        this.idjob = idjob;
        this.idemployer = idemployer;
        this.idcontroller = idcontroller;
        this.postdate = postdate;
        this.address = address;
        this.city = city;
        this.workmode = workmode;
        this.expiredate = expiredate;
        this.salary = salary;
        this.status = status;
        this.level = level;
        this.jobtitle = jobtitle;
    }

    public Integer getIdjob() {
        return idjob;
    }

    public void setIdjob(Integer idjob) {
        this.idjob = idjob;
    }

    public int getIdemployer() {
        return idemployer;
    }

    public void setIdemployer(int idemployer) {
        this.idemployer = idemployer;
    }

    public int getIdcontroller() {
        return idcontroller;
    }

    public void setIdcontroller(int idcontroller) {
        this.idcontroller = idcontroller;
    }

    public Date getPostdate() {
        return postdate;
    }

    public void setPostdate(Date postdate) {
        this.postdate = postdate;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getWorkmode() {
        return workmode;
    }

    public void setWorkmode(String workmode) {
        this.workmode = workmode;
    }

    public Date getExpiredate() {
        return expiredate;
    }

    public void setExpiredate(Date expiredate) {
        this.expiredate = expiredate;
    }

    public int getSalary() {
        return salary;
    }

    public void setSalary(int salary) {
        this.salary = salary;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getJobtitle() {
        return jobtitle;
    }

    public void setJobtitle(String jobtitle) {
        this.jobtitle = jobtitle;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idjob != null ? idjob.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Job)) {
            return false;
        }
        Job other = (Job) object;
        if ((this.idjob == null && other.idjob != null) || (this.idjob != null && !this.idjob.equals(other.idjob))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "fpt.aptech.spring_project_sem4_api.entities.Job[ idjob=" + idjob + " ]";
    }
    
}
