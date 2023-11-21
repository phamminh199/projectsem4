/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package fpt.aptech.spring_project_sem4_api.entities;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.persistence.Id;
/**
 *
 * @author vuna
 */
@Entity
@Table(name = "viewjobskillemployercompany")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Viewjobskillemployercompany.findAll", query = "SELECT v FROM Viewjobskillemployercompany v"),
    @NamedQuery(name = "Viewjobskillemployercompany.findBySurrogateKey", query = "SELECT v FROM Viewjobskillemployercompany v WHERE v.surrogateKey = :surrogateKey"),
    @NamedQuery(name = "Viewjobskillemployercompany.findByIdjob", query = "SELECT v FROM Viewjobskillemployercompany v WHERE v.idjob = :idjob"),
    @NamedQuery(name = "Viewjobskillemployercompany.findByIdemployer", query = "SELECT v FROM Viewjobskillemployercompany v WHERE v.idemployer = :idemployer"),
    @NamedQuery(name = "Viewjobskillemployercompany.findByIdcontroller", query = "SELECT v FROM Viewjobskillemployercompany v WHERE v.idcontroller = :idcontroller"),
    @NamedQuery(name = "Viewjobskillemployercompany.findByPostdate", query = "SELECT v FROM Viewjobskillemployercompany v WHERE v.postdate = :postdate"),
    @NamedQuery(name = "Viewjobskillemployercompany.findByAddress", query = "SELECT v FROM Viewjobskillemployercompany v WHERE v.address = :address"),
    @NamedQuery(name = "Viewjobskillemployercompany.findByCity", query = "SELECT v FROM Viewjobskillemployercompany v WHERE v.city = :city"),
    @NamedQuery(name = "Viewjobskillemployercompany.findByWorkmode", query = "SELECT v FROM Viewjobskillemployercompany v WHERE v.workmode = :workmode"),
    @NamedQuery(name = "Viewjobskillemployercompany.findByExpiredate", query = "SELECT v FROM Viewjobskillemployercompany v WHERE v.expiredate = :expiredate"),
    @NamedQuery(name = "Viewjobskillemployercompany.findBySalary", query = "SELECT v FROM Viewjobskillemployercompany v WHERE v.salary = :salary"),
    @NamedQuery(name = "Viewjobskillemployercompany.findByStatus", query = "SELECT v FROM Viewjobskillemployercompany v WHERE v.status = :status"),
    @NamedQuery(name = "Viewjobskillemployercompany.findByLevel", query = "SELECT v FROM Viewjobskillemployercompany v WHERE v.level = :level"),
    @NamedQuery(name = "Viewjobskillemployercompany.findByJobtitle", query = "SELECT v FROM Viewjobskillemployercompany v WHERE v.jobtitle = :jobtitle"),
    @NamedQuery(name = "Viewjobskillemployercompany.findByIdcompany", query = "SELECT v FROM Viewjobskillemployercompany v WHERE v.idcompany = :idcompany"),
    @NamedQuery(name = "Viewjobskillemployercompany.findByCompanyname", query = "SELECT v FROM Viewjobskillemployercompany v WHERE v.companyname = :companyname"),
    @NamedQuery(name = "Viewjobskillemployercompany.findBySize", query = "SELECT v FROM Viewjobskillemployercompany v WHERE v.size = :size"),
    @NamedQuery(name = "Viewjobskillemployercompany.findByOvertime", query = "SELECT v FROM Viewjobskillemployercompany v WHERE v.overtime = :overtime"),
    @NamedQuery(name = "Viewjobskillemployercompany.findByCountry", query = "SELECT v FROM Viewjobskillemployercompany v WHERE v.country = :country"),
    @NamedQuery(name = "Viewjobskillemployercompany.findByIdjobskill", query = "SELECT v FROM Viewjobskillemployercompany v WHERE v.idjobskill = :idjobskill"),
    @NamedQuery(name = "Viewjobskillemployercompany.findByIdskill", query = "SELECT v FROM Viewjobskillemployercompany v WHERE v.idskill = :idskill"),
    @NamedQuery(name = "Viewjobskillemployercompany.findBySkill", query = "SELECT v FROM Viewjobskillemployercompany v WHERE v.skill = :skill"),
    @NamedQuery(name = "Viewjobskillemployercompany.findByField", query = "SELECT v FROM Viewjobskillemployercompany v WHERE v.field = :field")})
public class Viewjobskillemployercompany implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "surrogate_key")
    private BigInteger surrogateKey;
    @Basic(optional = false)
    @Column(name = "idjob")
    private int idjob;
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
    @Basic(optional = false)
    @Column(name = "idcompany")
    private int idcompany;
    @Basic(optional = false)
    @Column(name = "companyname")
    private String companyname;
    @Basic(optional = false)
    @Column(name = "size")
    private String size;
    @Basic(optional = false)
    @Column(name = "overtime")
    private String overtime;
    @Basic(optional = false)
    @Column(name = "country")
    private String country;
    @Basic(optional = false)
    @Column(name = "idjobskill")
    private int idjobskill;
    @Basic(optional = false)
    @Column(name = "idskill")
    private int idskill;
    @Basic(optional = false)
    @Column(name = "skill")
    private String skill;
    @Basic(optional = false)
    @Column(name = "field")
    private String field;

    public Viewjobskillemployercompany() {
    }

    public BigInteger getSurrogateKey() {
        return surrogateKey;
    }

    public void setSurrogateKey(BigInteger surrogateKey) {
        this.surrogateKey = surrogateKey;
    }

    public int getIdjob() {
        return idjob;
    }

    public void setIdjob(int idjob) {
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

    public int getIdcompany() {
        return idcompany;
    }

    public void setIdcompany(int idcompany) {
        this.idcompany = idcompany;
    }

    public String getCompanyname() {
        return companyname;
    }

    public void setCompanyname(String companyname) {
        this.companyname = companyname;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getOvertime() {
        return overtime;
    }

    public void setOvertime(String overtime) {
        this.overtime = overtime;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public int getIdjobskill() {
        return idjobskill;
    }

    public void setIdjobskill(int idjobskill) {
        this.idjobskill = idjobskill;
    }

    public int getIdskill() {
        return idskill;
    }

    public void setIdskill(int idskill) {
        this.idskill = idskill;
    }

    public String getSkill() {
        return skill;
    }

    public void setSkill(String skill) {
        this.skill = skill;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }
    
}
