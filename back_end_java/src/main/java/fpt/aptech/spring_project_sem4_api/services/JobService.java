package fpt.aptech.spring_project_sem4_api.services;
//import fpt.aptech.spring_project_sem4_api.config.TokenUtil;
import fpt.aptech.spring_project_sem4_api.entities.Job;
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
import fpt.aptech.spring_project_sem4_api.entities.Resumedigitaleachjob;
import fpt.aptech.spring_project_sem4_api.entities.Testresult;
import fpt.aptech.spring_project_sem4_api.entities.Viewfavoritejobemployercompanyjobskill;
import fpt.aptech.spring_project_sem4_api.entities.Viewreview;
import fpt.aptech.spring_project_sem4_api.repositories.AnswerRepository;
import fpt.aptech.spring_project_sem4_api.repositories.CandidateRepository;
import fpt.aptech.spring_project_sem4_api.repositories.CompanyRepository;
import fpt.aptech.spring_project_sem4_api.repositories.ControllerRepository;
import fpt.aptech.spring_project_sem4_api.repositories.EmployerRepository;
import fpt.aptech.spring_project_sem4_api.repositories.FavoriteRepository;

import fpt.aptech.spring_project_sem4_api.repositories.JobRepository;
import fpt.aptech.spring_project_sem4_api.repositories.JobskillRepository;
import fpt.aptech.spring_project_sem4_api.repositories.JobsdescriptionsRepository;
import fpt.aptech.spring_project_sem4_api.repositories.QuestionRepository;
import fpt.aptech.spring_project_sem4_api.repositories.ReasonstojoinRepository;
import fpt.aptech.spring_project_sem4_api.repositories.ResumedigitaleachjobRepository;
import fpt.aptech.spring_project_sem4_api.repositories.ResumeeachjobRepository;
import fpt.aptech.spring_project_sem4_api.repositories.ResumetemplateRepository;
import fpt.aptech.spring_project_sem4_api.repositories.ReviewRepository;
import fpt.aptech.spring_project_sem4_api.repositories.SearchmonitorRepository;
import fpt.aptech.spring_project_sem4_api.repositories.SkillRepository;
import fpt.aptech.spring_project_sem4_api.repositories.SkillsexperiencesRepository;
import fpt.aptech.spring_project_sem4_api.repositories.TestresultRepository;
import fpt.aptech.spring_project_sem4_api.repositories.ViewfavoritejobemployercompanyjobskillRepository;
import fpt.aptech.spring_project_sem4_api.repositories.ViewjobskillemployercompanyRepository;
import fpt.aptech.spring_project_sem4_api.repositories.ViewreviewRepository;
import fpt.aptech.spring_project_sem4_api.repositories.WhyyouloveworkinghereRepository;


import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class JobService implements iJobService{
    // @Autowired
    @Autowired // tìm kiếm và so sánh với thuoc tính, phương thức, thành phần có sẵn trong kho so với hiện tại của repository
    JobRepository jobRepository;
    @Autowired
    ViewjobskillemployercompanyRepository viewjobskillemployercompanyRepository;
    @Autowired
    ReasonstojoinRepository reasonstojoinRepository;
    @Autowired
    JobsdescriptionsRepository jobsdescriptionsRepository;
    @Autowired
    SkillsexperiencesRepository skillsexperiencesRepository;
    @Autowired
    WhyyouloveworkinghereRepository whyyouloveworkinghereRepository;
    @Autowired
    JobskillRepository jobskillRepository;
    @Autowired
    SkillRepository skillRepository;
    @Autowired
    ControllerRepository controllerRepository;
    @Autowired
    EmployerRepository employerRepository;
    @Autowired
    CandidateRepository candidateRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    FavoriteRepository favoriteRepository;
    @Autowired
    ViewfavoritejobemployercompanyjobskillRepository viewfavoritejobemployercompanyjobskillRepository;
    @Autowired
    ResumeeachjobRepository resumeeachjobRepository;
    @Autowired
    ReviewRepository reviewRepository;
    @Autowired
    ViewreviewRepository viewreviewRepository;
    @Autowired
    SearchmonitorRepository searchmonitorRepository;
    @Autowired
    QuestionRepository questionRepository;
    @Autowired
    AnswerRepository answerRepository;
    @Autowired
    ResumetemplateRepository resumetemplateRepository;
    @Autowired
    TestresultRepository testresultRepository;
    @Autowired
    ResumedigitaleachjobRepository resumedigitaleachjobRepository;
    @Autowired
    JobsdescriptionsRepository jobsdescriptionsrepository;
    @Autowired
    WhyyouloveworkinghereRepository whyyouloveworkinghererepository;
    @Autowired
    ReasonstojoinRepository reasonstojoinrepository;
    @Autowired
    CompanyRepository companyRepository;
    
    // serviceFindAllSkill
    @Override
    public List<Skill> serviceFindAllSkill(){
        return skillRepository.findAll();
    }

    @Override
    public void serviceAddJobSkill(Jobskill newObj) {
        jobskillRepository.save(newObj);
    }

    @Override
    public void serviceAddReasonstojoin(Reasonstojoin newObj) {
        reasonstojoinRepository.save(newObj);
    }

    @Override
    public void serviceAddJobsDescriptions(Jobsdescriptions newObj) {
        jobsdescriptionsRepository.save(newObj);
    }

    @Override
    public void serviceAddSkillsExperiences(Skillsexperiences newObj) {
        skillsexperiencesRepository.save(newObj);
    }

    @Override
    public void serviceAddWhyYouLoveWorkingHere(Whyyouloveworkinghere newObj) {
        whyyouloveworkinghereRepository.save(newObj);
    }

    @Override
    public Candidate serviceCheckSignInCandidate(String email, String password) {
        Optional<Candidate> obj = candidateRepository.findByEmail(email);

        if (obj.isPresent()) {
            Candidate candidate = obj.get();
            if (passwordEncoder.matches(password, candidate.getPassword())) { // if the password matches the decoded one
//                String token = TokenUtil.generateToken(email);
//                candidate.setToken(token); // add the token to the candidate object
                return candidate;
            } else {
                return null; // Password does not match
            }
        } else {
            return null;
        }
    }
    @Override
    public Controller serviceCheckSignInController(String email, String password) {
        Optional<Controller> obj = controllerRepository.findByEmail(email);

        if (obj.isPresent()) {
            Controller controller = obj.get();
            if(passwordEncoder.matches(password, controller.getPassword())){ // nếu password đúng với giải mã thì
                return controller;
            }
            else {// nếu password KO đúng với giải mã thì
                return null; // Password does not match
            }
        } else {
            return null;
        }
    }

    @Override
    public Employer serviceCheckSignInEmployer(String email, String password) {
        Optional<Employer> obj = employerRepository.findByEmail(email);

        if (obj.isPresent()) { // nếu tìm thấy obj
            Employer employer = obj.get();
            if(passwordEncoder.matches(password, employer.getPassword())){ // nếu password đúng với giải mã thì
                return employer;
            }
            else {// nếu password KO đúng với giải mã thì
                return null; // Password does not match
            }
        } else {
            return null;
        }
    }

    @Override
    public void serviceSignUpAddCandidate(Candidate newObj) {
        candidateRepository.save(newObj);
    }

    @Override
    public boolean serviceFindEmailCandidate(String email) {
        Optional<Candidate> obj = candidateRepository.findByEmail(email);
        return obj.isPresent();
    }

    @Override
    public boolean serviceFindEmailController(String email) {
        Optional<Controller> obj = controllerRepository.findByEmail(email);
        return obj.isPresent();
    }

    @Override
    public boolean serviceFindEmailEmployer(String email) {
        Optional<Employer> obj = employerRepository.findByEmail(email);
        return obj.isPresent();
    }

    @Override
    public void serviceAddFavorite(Favorite obj) {
        favoriteRepository.save(obj);
    }

    @Override
    public List<Favorite> serviceFindAllByIdCandidate(int idcandidate) {
        return favoriteRepository.findAllByIdCandidate(idcandidate);
    }

    @Override
    public List<Viewfavoritejobemployercompanyjobskill> serviceFindAllViewFavorite(int idcandidate) {
        return viewfavoritejobemployercompanyjobskillRepository.findByIdcandidate(idcandidate);
    }

    @Override
    public void serviceAddResumeeachjob(Resumeeachjob obj) {
        resumeeachjobRepository.save(obj);
    }

    @Override
    @Transactional // delete phải có cái này mới delete được
    public void serviceRemoveFavorite(int idfavorite) {
        favoriteRepository.removefavoritejob(idfavorite);
    }

    @Override
    public Candidate serviceFindEmailCandidateObject(String email) {
        Optional<Candidate> candidateOptional = candidateRepository.findByEmail(email);
        return candidateOptional.orElse(null);
    }

//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
//    }

//    @Override
//    public UserDetails loadUserByUsername(String string) throws UsernameNotFoundException {
//        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
//    }

//    @Override
//    public String createToken(String email) {
//        return TokenUtil.generateToken(email);
//    }
//---------------------------------------------------------------------------------------------------------REVIEW START
    @Override
    public List<Review> serviceFindAllReview() {
        return reviewRepository.findAll();
    }

    @Override
    public void serviceAddReview(Review obj) {
        reviewRepository.save(obj);
    }

    @Override
    @Transactional // delete phải có cái này mới delete được
    public void serviceDeleteReview(int id) {
        reviewRepository.removeReview(id);
    }

    @Override
    public List<Viewreview> serviceFindAllViewReview() {
        return viewreviewRepository.findAll();
    }

    @Override
    public void serviceUpdateReviewStatus(int id, String status) {
        reviewRepository.updateReviewStatus(id, status);
    }
//---------------------------------------------------------------------------------------------------------REVIEW END
//---------------------------------------------------------------------------------------------------------controller start
    @Override
    public void serviceAddController(Controller obj) { // add và edit như nhau nên dùng chung
        controllerRepository.save(obj);
    }
    
    @Override
    public List<Controller> serviceFindAllController() {
        return controllerRepository.findAll();

    }
//---------------------------------------------------------------------------------------------------------controller end
//---------------------------------------------------------------------------------------------------------Candidate start
    @Override
    public void serviceAddCandidate(Candidate obj) { // add và edit như nhau nên dùng chung
        candidateRepository.save(obj);
    }
    
    @Override
    public List<Candidate> serviceFindAllCandidate() {
        return candidateRepository.findAll();

    }
//---------------------------------------------------------------------------------------------------------Candidate end
//---------------------------------------------------------------------------------------------------------Employer start
    @Override
    public void serviceAddEmployer(Employer obj) { // add và edit như nhau nên dùng chung
        employerRepository.save(obj);
    }
    
    @Override
    public List<Employer> serviceFindAllEmployer() {
        return employerRepository.findAll();

    }
//---------------------------------------------------------------------------------------------------------Employer end
//---------------------------------------------------------------------------------------------------------job start
    // serviceFindAllJob
    @Override
    public List<Job> serviceFindAllJob(){
        return jobRepository.findAll();
    }
    
    // serviceAddJob ,// add và edit như nhau nên dùng chung
    @Override
    public void serviceAddJob(Job newObj) {
        jobRepository.save(newObj);
    }
    
    @Override
    public void serviceUpdateJobStatus(int idjob, String status) { // add và edit như nhau nên dùng chung
        jobRepository.updateJobStatus(idjob, status);
    }
//---------------------------------------------------------------------------------------------------------job end
//---------------------------------------------------------------------------------------------------------searchmonitor start

    @Override
    public List<Searchmonitor> serviceFindAllSearchmonitor() {
        return searchmonitorRepository.findAll();
    }

    @Override
    public void serviceAddSearchMonitor(Searchmonitor obj) {
        searchmonitorRepository.save(obj);
    }

//---------------------------------------------------------------------------------------------------------searchmonitor end

//-------------------------------------------question start

    @Override
    public List<Question> serviceFindAllQuestion() {
        return questionRepository.findAll();
    }
//    -------------------------------------------question end
//    -------------------------------------------answer start

    @Override
    public List<Answer> serviceFindAllAnswer() {
        return answerRepository.findAll();
    }
    //    -------------------------------------------answer end

//    -------------------------------------------Resumetemplate start
    @Override
    public void serviceAddResumetemplate(Resumetemplate obj) {
        resumetemplateRepository.save(obj);
    }
    
    @Override
    public List<Resumetemplate> serviceFindAllResumetemplate() {
        return resumetemplateRepository.findAll();
    }
    
    // delete
    @Override
    public void serviceDeleteResumetemplate(int idresume) {
        Resumetemplate existrow = resumetemplateRepository.findByIdresume(idresume);
        resumetemplateRepository.delete(existrow);
    }

//    -------------------------------------------Resumetemplate end
//    -------------------------------------------Testresult start
    @Override
    public void serviceAddTestresult(Testresult obj) {
        testresultRepository.save(obj);
    }
    
    @Override
    public List<Testresult> serviceFindAllTestresult() {
        return testresultRepository.findAll();
    }

//    -------------------------------------------Testresult end
//    -------------------------------------------Resumedigitaleachjob start
    @Override
    public void serviceAddResumedigitaleachjob(Resumedigitaleachjob obj) {
        resumedigitaleachjobRepository.save(obj);
    }
    
    @Override
    public List<Resumedigitaleachjob> serviceFindAllResumedigitaleachjob() {
        return resumedigitaleachjobRepository.findAll();
    }

//    -------------------------------------------Resumedigitaleachjob end
//    -------------------------------------------Resumeeachjob start
    @Override
    public Resumeeachjob serviceFindOneResumeeachjob(int idcandidate){
        return resumeeachjobRepository.findByIdcandidate(idcandidate);
    };
    
    @Override
    public List<Resumeeachjob> serviceFindAllResumeeachjob() {
        return resumeeachjobRepository.findAll();
    }
//    -------------------------------------------Resumeeachjob end
//    -------------------------------------------Viewjobskillemployercompany start
    // serviceFindAllViewJobSkill
    @Override
    public List<Viewjobskillemployercompany> serviceFindAllViewjobskilltitleemployercompany() {
        return viewjobskillemployercompanyRepository.findAll();
    }
    
    // serviceFindAllViewJobSkill
    @Override
    public List<Viewjobskillemployercompany> serviceFindAllViewjobskilltitleemployercompanyByJobTitle(String jobtitle) {
        return viewjobskillemployercompanyRepository.FindJobsByJobsTitle(jobtitle);
    }
//    -------------------------------------------Viewjobskillemployercompany end
//    -------------------------------------------job details start
    @Override
    public List<Jobsdescriptions> serviceFindJobsdescriptionsByIdJob(int idJob) {
        return jobsdescriptionsrepository.findJobsdescriptionsByIdJob(idJob);
    }

    @Override
    public List<Whyyouloveworkinghere> serviceFindWhyyouloveworkinghereByIdJob(int idJob) {
        return whyyouloveworkinghererepository.findWhyyouloveworkinghereByIdJob(idJob);
    }

    @Override
    public List<Reasonstojoin> serviceFindReasonstojoinByIdJob(int idJob) {
        return reasonstojoinrepository.findReasonstojoinByIdJob(idJob);
    }
//    -------------------------------------------job details end
    @Override
    public Employer saveEmployer(Employer newEmp) {
        return employerRepository.save(newEmp);
    }
    
    //    serviceFindJobsByIdJob
    @Override
    public List<Viewjobskillemployercompany> serviceFindJobsByIdJob(int idjob) {
        return viewjobskillemployercompanyRepository.findJobByIdjob(idjob);
    }
//    -------------------------------------------skill start
    @Override
    public List<Jobskill> serviceFindAllJobskill() {
        return jobskillRepository.findAll();
    }
    @Override
    public List<Skill> serviceFindAllSkills() {
        return skillRepository.findAll();
    }
//    -------------------------------------------skill end
//    -------------------------------------------company start
    @Override
    public List<Company> serviceFindAllCompany() {
        return companyRepository.findAll();
    }
//    -------------------------------------------company end
//    -------------------------------------------answer start
//    -------------------------------------------answer end
//    -------------------------------------------answer start
//    -------------------------------------------answer end
//    -------------------------------------------answer start
//    -------------------------------------------answer end
//    -------------------------------------------answer start
//    -------------------------------------------answer end


}
