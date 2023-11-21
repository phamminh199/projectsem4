
package fpt.aptech.spring_project_sem4_api.entities;

public class Idjobstatus {
    private int idjob;
    private String status;

    // Default constructor
    public Idjobstatus() {
    }
    
    //    RC space > insert code > constructor
    public Idjobstatus(int idjob, String status) {
        this.idjob = idjob;
        this.status = status;
    }

//    RC space > insert code > getter and setter
    public int getIdjob() {
        return idjob;
    }

    public void setIdjob(int idjob) {
        this.idjob = idjob;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
