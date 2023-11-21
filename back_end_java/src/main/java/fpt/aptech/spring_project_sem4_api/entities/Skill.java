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
@Table(name = "skill")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Skill.findAll", query = "SELECT s FROM Skill s"),
    @NamedQuery(name = "Skill.findByIdskill", query = "SELECT s FROM Skill s WHERE s.idskill = :idskill"),
    @NamedQuery(name = "Skill.findBySkill", query = "SELECT s FROM Skill s WHERE s.skill = :skill"),
    @NamedQuery(name = "Skill.findByField", query = "SELECT s FROM Skill s WHERE s.field = :field")})
public class Skill implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "idskill")
    private Integer idskill;
    @Basic(optional = false)
    @Column(name = "skill")
    private String skill;
    @Basic(optional = false)
    @Column(name = "field")
    private String field;

    public Skill() {
    }

    public Skill(Integer idskill) {
        this.idskill = idskill;
    }

    public Skill(Integer idskill, String skill, String field) {
        this.idskill = idskill;
        this.skill = skill;
        this.field = field;
    }

    public Integer getIdskill() {
        return idskill;
    }

    public void setIdskill(Integer idskill) {
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

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idskill != null ? idskill.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Skill)) {
            return false;
        }
        Skill other = (Skill) object;
        if ((this.idskill == null && other.idskill != null) || (this.idskill != null && !this.idskill.equals(other.idskill))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "fpt.aptech.spring_project_sem4_api.entities.Skill[ idskill=" + idskill + " ]";
    }
    
}
