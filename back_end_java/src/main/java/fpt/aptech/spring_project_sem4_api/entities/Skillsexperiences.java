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
@Table(name = "skillsexperiences")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Skillsexperiences.findAll", query = "SELECT s FROM Skillsexperiences s"),
    @NamedQuery(name = "Skillsexperiences.findByIdskillsexperiences", query = "SELECT s FROM Skillsexperiences s WHERE s.idskillsexperiences = :idskillsexperiences"),
    @NamedQuery(name = "Skillsexperiences.findByIdjob", query = "SELECT s FROM Skillsexperiences s WHERE s.idjob = :idjob"),
    @NamedQuery(name = "Skillsexperiences.findBySkillsexperiences", query = "SELECT s FROM Skillsexperiences s WHERE s.skillsexperiences = :skillsexperiences")})
public class Skillsexperiences implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "idskillsexperiences")
    private Integer idskillsexperiences;
    @Basic(optional = false)
    @Column(name = "idjob")
    private int idjob;
    @Basic(optional = false)
    @Column(name = "skillsexperiences")
    private String skillsexperiences;

    public Skillsexperiences() {
    }

    public Skillsexperiences(Integer idskillsexperiences) {
        this.idskillsexperiences = idskillsexperiences;
    }

    public Skillsexperiences(Integer idskillsexperiences, int idjob, String skillsexperiences) {
        this.idskillsexperiences = idskillsexperiences;
        this.idjob = idjob;
        this.skillsexperiences = skillsexperiences;
    }

    public Integer getIdskillsexperiences() {
        return idskillsexperiences;
    }

    public void setIdskillsexperiences(Integer idskillsexperiences) {
        this.idskillsexperiences = idskillsexperiences;
    }

    public int getIdjob() {
        return idjob;
    }

    public void setIdjob(int idjob) {
        this.idjob = idjob;
    }

    public String getSkillsexperiences() {
        return skillsexperiences;
    }

    public void setSkillsexperiences(String skillsexperiences) {
        this.skillsexperiences = skillsexperiences;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idskillsexperiences != null ? idskillsexperiences.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Skillsexperiences)) {
            return false;
        }
        Skillsexperiences other = (Skillsexperiences) object;
        if ((this.idskillsexperiences == null && other.idskillsexperiences != null) || (this.idskillsexperiences != null && !this.idskillsexperiences.equals(other.idskillsexperiences))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "fpt.aptech.spring_project_sem4_api.entities.Skillsexperiences[ idskillsexperiences=" + idskillsexperiences + " ]";
    }
    
}
