/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package fpt.aptech.spring_project_sem4_api.entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
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
@Table(name = "question")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Question.findAll", query = "SELECT q FROM Question q"),
    @NamedQuery(name = "Question.findByIdquestion", query = "SELECT q FROM Question q WHERE q.idquestion = :idquestion"),
    @NamedQuery(name = "Question.findByQuestioncontent", query = "SELECT q FROM Question q WHERE q.questioncontent = :questioncontent")})
public class Question implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "idquestion")
    private String idquestion;
    @Basic(optional = false)
    @Column(name = "questioncontent")
    private String questioncontent;

    public Question() {
    }

    public Question(String idquestion) {
        this.idquestion = idquestion;
    }

    public Question(String idquestion, String questioncontent) {
        this.idquestion = idquestion;
        this.questioncontent = questioncontent;
    }

    public String getIdquestion() {
        return idquestion;
    }

    public void setIdquestion(String idquestion) {
        this.idquestion = idquestion;
    }

    public String getQuestioncontent() {
        return questioncontent;
    }

    public void setQuestioncontent(String questioncontent) {
        this.questioncontent = questioncontent;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idquestion != null ? idquestion.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Question)) {
            return false;
        }
        Question other = (Question) object;
        if ((this.idquestion == null && other.idquestion != null) || (this.idquestion != null && !this.idquestion.equals(other.idquestion))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "fpt.aptech.spring_project_sem4_api.entities.Question[ idquestion=" + idquestion + " ]";
    }
    
}
