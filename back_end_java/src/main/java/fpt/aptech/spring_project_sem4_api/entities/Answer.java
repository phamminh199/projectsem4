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
@Table(name = "answer")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Answer.findAll", query = "SELECT a FROM Answer a"),
    @NamedQuery(name = "Answer.findByIdanswer", query = "SELECT a FROM Answer a WHERE a.idanswer = :idanswer"),
    @NamedQuery(name = "Answer.findByIdquestion", query = "SELECT a FROM Answer a WHERE a.idquestion = :idquestion"),
    @NamedQuery(name = "Answer.findByCorrect", query = "SELECT a FROM Answer a WHERE a.correct = :correct"),
    @NamedQuery(name = "Answer.findByAnswercontent", query = "SELECT a FROM Answer a WHERE a.answercontent = :answercontent")})
public class Answer implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "idanswer")
    private Integer idanswer;
    @Basic(optional = false)
    @Column(name = "idquestion")
    private String idquestion;
    @Basic(optional = false)
    @Column(name = "correct")
    private int correct;
    @Basic(optional = false)
    @Column(name = "answercontent")
    private String answercontent;

    public Answer() {
    }

    public Answer(Integer idanswer) {
        this.idanswer = idanswer;
    }

    public Answer(Integer idanswer, String idquestion, int correct, String answercontent) {
        this.idanswer = idanswer;
        this.idquestion = idquestion;
        this.correct = correct;
        this.answercontent = answercontent;
    }

    public Integer getIdanswer() {
        return idanswer;
    }

    public void setIdanswer(Integer idanswer) {
        this.idanswer = idanswer;
    }

    public String getIdquestion() {
        return idquestion;
    }

    public void setIdquestion(String idquestion) {
        this.idquestion = idquestion;
    }

    public int getCorrect() {
        return correct;
    }

    public void setCorrect(int correct) {
        this.correct = correct;
    }

    public String getAnswercontent() {
        return answercontent;
    }

    public void setAnswercontent(String answercontent) {
        this.answercontent = answercontent;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idanswer != null ? idanswer.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Answer)) {
            return false;
        }
        Answer other = (Answer) object;
        if ((this.idanswer == null && other.idanswer != null) || (this.idanswer != null && !this.idanswer.equals(other.idanswer))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "fpt.aptech.spring_project_sem4_api.entities.Answer[ idanswer=" + idanswer + " ]";
    }
    
}
