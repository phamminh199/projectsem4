package fpt.aptech.spring_project_sem4_api.services;

import fpt.aptech.spring_project_sem4_api.entities.Jobmonitor;
import fpt.aptech.spring_project_sem4_api.entities.Jobsdescriptions;
import fpt.aptech.spring_project_sem4_api.entities.Jobskill;
import fpt.aptech.spring_project_sem4_api.entities.Question;
import fpt.aptech.spring_project_sem4_api.entities.Reasonstojoin;
import fpt.aptech.spring_project_sem4_api.entities.Resumeeachjob;
import fpt.aptech.spring_project_sem4_api.entities.Resumepdf;
import fpt.aptech.spring_project_sem4_api.entities.Resumetemplate;
import fpt.aptech.spring_project_sem4_api.entities.Review;
import fpt.aptech.spring_project_sem4_api.entities.Sale;
import fpt.aptech.spring_project_sem4_api.entities.Searchmonitor;
import fpt.aptech.spring_project_sem4_api.entities.Skill;
import fpt.aptech.spring_project_sem4_api.entities.Skillsexperiences;
import fpt.aptech.spring_project_sem4_api.entities.Test;
import fpt.aptech.spring_project_sem4_api.entities.Viewjobskillemployercompany;
import fpt.aptech.spring_project_sem4_api.entities.Whyyouloveworkinghere;
import fpt.aptech.spring_project_sem4_api.entities.Answer;
import fpt.aptech.spring_project_sem4_api.entities.Candidate;
import fpt.aptech.spring_project_sem4_api.entities.Company;
import fpt.aptech.spring_project_sem4_api.entities.Controller;
import fpt.aptech.spring_project_sem4_api.entities.Employer;
import fpt.aptech.spring_project_sem4_api.entities.Favorite;
import fpt.aptech.spring_project_sem4_api.entities.Job;
import fpt.aptech.spring_project_sem4_api.entities.Resumedigitaleachjob;
import fpt.aptech.spring_project_sem4_api.entities.Testresult;
import fpt.aptech.spring_project_sem4_api.entities.Viewfavoritejobemployercompanyjobskill;
import fpt.aptech.spring_project_sem4_api.entities.Viewreview;
import fpt.aptech.spring_project_sem4_api.repositories.ViewfavoritejobemployercompanyjobskillRepository;


import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;


import java.util.List;

//public interface iJobService extends UserDetailsService{
public interface iJobService{
    
    // JWT
//    @Override
//    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;
//    
    
    public List<Viewjobskillemployercompany> serviceFindAllViewjobskilltitleemployercompany();
    
    
    public List<Skill> serviceFindAllSkill();

    public void serviceAddJobSkill(Jobskill newObj);
    
    public void serviceAddReasonstojoin(Reasonstojoin newObj);
    
    public void serviceAddJobsDescriptions(Jobsdescriptions newObj);
    
    public void serviceAddSkillsExperiences(Skillsexperiences newObj);
    
    public void serviceAddWhyYouLoveWorkingHere(Whyyouloveworkinghere newObj);
    

    public Candidate serviceCheckSignInCandidate(String email, String password);

    public Controller serviceCheckSignInController(String email, String password);

    public Employer serviceCheckSignInEmployer(String email, String password);

    
    public void serviceSignUpAddCandidate(Candidate newObj);
    
    public boolean serviceFindEmailCandidate(String email);
    
    public Candidate serviceFindEmailCandidateObject(String email);
    
    public boolean serviceFindEmailEmployer(String email);
    
    public boolean serviceFindEmailController(String email);
    
    public void serviceAddFavorite(Favorite obj);
    
    public List<Favorite> serviceFindAllByIdCandidate(int idcandidate);
    
    public List<Viewfavoritejobemployercompanyjobskill> serviceFindAllViewFavorite(int idcandidate);



    public void serviceRemoveFavorite(int idfavorite);
    
//    -------------------------------------------Review start
    public List<Review> serviceFindAllReview();
    
    public void serviceAddReview(Review obj);
    
    public void serviceDeleteReview(int id);
    
    public List<Viewreview> serviceFindAllViewReview();
    
    public void serviceUpdateReviewStatus(int id, String status);
//    -------------------------------------------Review end
//    -------------------------------------------controller start
    public void serviceAddController(Controller obj); // add và edit như nhau nên dùng chung
    
    public List<Controller> serviceFindAllController();

//    -------------------------------------------controller end
//    -------------------------------------------controller start
    public void serviceAddCandidate(Candidate obj); // add và edit như nhau nên dùng chung
    
    public List<Candidate> serviceFindAllCandidate();

//    -------------------------------------------controller end
//    -------------------------------------------controller start
    public void serviceAddEmployer(Employer obj); // add và edit như nhau nên dùng chung
    
    public List<Employer> serviceFindAllEmployer();

//    -------------------------------------------controller end
//    -------------------------------------------job start
    public void serviceAddJob(Job newObj); // add và edit như nhau nên dùng chung
    
    public List<Job> serviceFindAllJob();
    
    public void serviceUpdateJobStatus(int idjob, String status);
//    -------------------------------------------job end

//    -------------------------------------------searchmonitor start
    public List<Searchmonitor> serviceFindAllSearchmonitor();
    
    public void serviceAddSearchMonitor(Searchmonitor obj); // add và edit như nhau nên dùng chung


//    -------------------------------------------searchmonitor end
//    -------------------------------------------question start
    public List<Question> serviceFindAllQuestion();
//    -------------------------------------------question end
//    -------------------------------------------answer start
    public List<Answer> serviceFindAllAnswer();

//    -------------------------------------------Resumetemplate start
    public void serviceAddResumetemplate(Resumetemplate obj);

    public List<Resumetemplate> serviceFindAllResumetemplate();
    
    public void serviceDeleteResumetemplate(int idresume);

//    -------------------------------------------Resumetemplate end
//    -------------------------------------------Testresult start
    public List<Testresult> serviceFindAllTestresult();
    
    public void serviceAddTestresult(Testresult obj);

//    -------------------------------------------Testresult end
//    -------------------------------------------Resumedigitaleachjob start
    public void serviceAddResumedigitaleachjob(Resumedigitaleachjob obj);

    public List<Resumedigitaleachjob> serviceFindAllResumedigitaleachjob();
    
//    -------------------------------------------Resumedigitaleachjob end
//    -------------------------------------------Resumeeachjob start
    
    public void serviceAddResumeeachjob(Resumeeachjob obj);
        
    public Resumeeachjob serviceFindOneResumeeachjob(int idcandidate);
    
    public List<Resumeeachjob> serviceFindAllResumeeachjob();

//    -------------------------------------------Resumeeachjob end
    
    // serviceFindAllViewjobskilltitleemployercompanyByJobTitle
    public List<Viewjobskillemployercompany> serviceFindAllViewjobskilltitleemployercompanyByJobTitle(String jobtitle);

//    -------------------------------------------job details start
    // serviceFindJobsdescriptionsByIdJob
    public List<Jobsdescriptions> serviceFindJobsdescriptionsByIdJob(int idJob);
    
    // serviceFindWhyyouloveworkinghereByIdJob
    public List<Whyyouloveworkinghere> serviceFindWhyyouloveworkinghereByIdJob(int idJob);
    
    // serviceFindReasonstojoinByIdJob
    public List<Reasonstojoin> serviceFindReasonstojoinByIdJob(int idJob);
//    -------------------------------------------job details end
    public Employer saveEmployer(Employer newEmp);
    
    // serviceFindJobsByIdJob
    public List<Viewjobskillemployercompany> serviceFindJobsByIdJob(int idjob);
//    -------------------------------------------skill start
    public List<Skill> serviceFindAllSkills();

    public List<Jobskill> serviceFindAllJobskill();

//    -------------------------------------------skill end
//    -------------------------------------------company start
        public List<Company> serviceFindAllCompany();

//    -------------------------------------------company end
//    -------------------------------------------answer start
//    -------------------------------------------answer end

}
