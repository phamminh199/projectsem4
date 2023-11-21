package fpt.aptech.spring_project_sem4_api.entities;

public class Signinobject {
    private String email;
    private String password;

    // Default constructor
    public Signinobject() {
    }

    // Constructor with parameters
    public Signinobject(String email, String password) {
        this.email = email;
        this.password = password;
    }

    // Getters and setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
