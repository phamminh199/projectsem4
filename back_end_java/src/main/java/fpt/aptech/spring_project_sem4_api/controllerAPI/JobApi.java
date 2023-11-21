
package fpt.aptech.spring_project_sem4_api.controllerAPI;

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
import fpt.aptech.spring_project_sem4_api.entities.Idjobstatus;
import fpt.aptech.spring_project_sem4_api.entities.Resumedigitaleachjob;
import fpt.aptech.spring_project_sem4_api.entities.Signinobject;
import fpt.aptech.spring_project_sem4_api.entities.Testresult;
import fpt.aptech.spring_project_sem4_api.entities.Viewfavoritejobemployercompanyjobskill;
import fpt.aptech.spring_project_sem4_api.entities.Viewreview;

import fpt.aptech.spring_project_sem4_api.services.iJobService;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;



@RestController
@CrossOrigin(origins = "http://localhost:3000") // cho phép front-end có đường dẫn này bắt các api của backend
@RequestMapping("/api")
public class JobApi {
    // @Autowired
    @Autowired
    public iJobService jobService;
    
//    private final AuthenticationManager authenticationManager;
//    private final PasswordEncoder passwordEncoder;
//
//    @Autowired
//    public AuthController(AuthenticationManager authenticationManager, iJobService jobService, PasswordEncoder passwordEncoder) {
//        this.authenticationManager = authenticationManager;
//        this.userService = userService;
//        this.passwordEncoder = passwordEncoder;
//    }
    
    // findAllViewjobskilltitleemployercompany
    // http://localhost:9999/api/findAllViewjobskillemployercompany
    @GetMapping("/findAllViewjobskillemployercompany")
    @ResponseStatus(HttpStatus.OK)
    public List<Viewjobskillemployercompany> findAllViewjobskillemployercompany(){
        return jobService.serviceFindAllViewjobskilltitleemployercompany();
    }
    
    // findAllSkill
    // http://localhost:9999/api/findAllSkill
    @GetMapping("/findAllSkill")
    @ResponseStatus(HttpStatus.OK)
    public List<Skill> findAllSkill(){
        return jobService.serviceFindAllSkill();
    }
   

    // http://localhost:9999/api/addtablejobskill
    @PostMapping("/addtablejobskill")
    @ResponseStatus(HttpStatus.CREATED)
    public void addtablejobskill(@RequestBody Jobskill newObj){
        jobService.serviceAddJobSkill(newObj);
    }
    // http://localhost:9999/api/addtablereasonstojoin
    @PostMapping("/addtablereasonstojoin")
    @ResponseStatus(HttpStatus.CREATED)
    public void addtablereasonstojoin(@RequestBody Reasonstojoin newObj){
        jobService.serviceAddReasonstojoin(newObj);
    }
    // http://localhost:9999/api/addtablejobdescription
    @PostMapping("/addtablejobdescription")
    @ResponseStatus(HttpStatus.CREATED)
    public void addtablejobdescription(@RequestBody Jobsdescriptions newObj){
        jobService.serviceAddJobsDescriptions(newObj);
    }
    // http://localhost:9999/api/addtableskillexperience
    @PostMapping("/addtableskillexperience")
    @ResponseStatus(HttpStatus.CREATED)
    public void addtableskillexperience(@RequestBody Skillsexperiences newObj){
        jobService.serviceAddSkillsExperiences(newObj);
    }
    // http://localhost:9999/api/addtablewhyyouloveworkinghere
    @PostMapping("/addtablewhyyouloveworkinghere")
    @ResponseStatus(HttpStatus.CREATED)
    public void addtablewhyyouloveworkinghere(@RequestBody Whyyouloveworkinghere newObj){
        jobService.serviceAddWhyYouLoveWorkingHere(newObj);
    }
    
        
    // findAllSkill
    // http://localhost:9999/api/findallcontroller
//    @GetMapping("/findallcontroller")
//    @ResponseStatus(HttpStatus.OK)
//    public List<Controller> findallcontroller(){
//        return jobService.serviceFindAllController();
//    }
    

    
    // http://localhost:9999/api/checkSignInCandidate
    @PostMapping("/checkSignInCandidate")
    @ResponseStatus(HttpStatus.OK)
    public Candidate checkSignInCandidate(@RequestBody Signinobject signinobject) {
        try {
            var obj = jobService.serviceCheckSignInCandidate(signinobject.getEmail(), signinobject.getPassword());
            if (obj.getStatus().equals("active")) {
                return obj;
            }
        } catch (Exception e) {
            // Handle the exception here. You might want to log the error or return an error response.
            e.printStackTrace(); // This prints the exception details to the console.
        }
        return null;
    }
    
    // http://localhost:9999/api/checkSignInController
    @PostMapping("/checkSignInController")
    @ResponseStatus(HttpStatus.OK)
    public Controller checkSignInController(@RequestBody Signinobject signinobject) {
        try {
            var obj = jobService.serviceCheckSignInController(signinobject.getEmail(), signinobject.getPassword());
            if (obj.getStatus().equals("active")) {
                return obj;
            }
        } catch (Exception e) {
            // Handle the exception here. You might want to log the error or return an error response.
            e.printStackTrace(); // This prints the exception details to the console.
        }
        return null;
    } 
    
    // http://localhost:9999/api/checkSignInEmployer
    @PostMapping("/checkSignInEmployer")
    @ResponseStatus(HttpStatus.OK)
    public Employer checkSignInEmployer(@RequestBody Signinobject signinobject) {
        try {
            var obj = jobService.serviceCheckSignInEmployer(signinobject.getEmail(), signinobject.getPassword());
            if (obj.getStatus().equals("enable")) {
                return obj;
            }
        } catch (Exception e) {
            // Handle the exception here. You might want to log the error or return an error response.
            e.printStackTrace(); // This prints the exception details to the console.
        }
        return null;
    } 
    
//    // http://localhost:9999/api/checkSignInEmployerAutenthicate
//    @PostMapping("/checkSignInEmployerAutenthicate")
//    @ResponseStatus(HttpStatus.OK)
//    public String checkSignInEmployerAutenthicate(@RequestBody Signinobject signinobject) {
//        try {
//            boolean result = jobService.serviceCheckSignInEmployer(signinobject.getEmail(), signinobject.getPassword());
//            if (result == true){
//                return "yes";
//            }
//            else {
//                return "no";
//            }
//        } catch (Exception e) {
//            return null;
//        }
//    } 
    

    
    // http://localhost:9999/api/signUpAddCandidate
    /*
    {
        "fullname": "test",
        "email": "test@gmail.com",
        "password": "123",
        "phone": "065498498",
        "dob": "1990-05-20",
        "urlavatar": "123",
        "status": "active"
    }
    */
    @PostMapping("/signUpAddCandidate")
    @ResponseStatus(HttpStatus.CREATED)
    public void signUpAddCandidate(@RequestBody Candidate newObj){
        jobService.serviceSignUpAddCandidate(newObj);
    }
    
    // findCandidateEmail
    // http://localhost:9999/api/findCandidateEmail/email
    @GetMapping("/findCandidateEmail/{email}")
    @ResponseStatus(HttpStatus.OK)
    public boolean findCandidateEmail(@PathVariable String email){
        return jobService.serviceFindEmailCandidate(email);
    }
    
    // findControllerEmail
    // http://localhost:9999/api/findControllerEmail/email
    @GetMapping("/findControllerEmail/{email}")
    @ResponseStatus(HttpStatus.OK)
    public boolean findControllerEmail(@PathVariable String email){
        return jobService.serviceFindEmailController(email);
    }
    
    // findCandidateEmail
    // http://localhost:9999/api/findEmployerEmail/email
    @GetMapping("/findEmployerEmail/{email}")
    @ResponseStatus(HttpStatus.OK)
    public boolean findEmployerEmail(@PathVariable String email){
        return jobService.serviceFindEmailEmployer(email);
    }
    
    // http://localhost:9999/api/addToFavorite
    /*
    {
        "idcandidate": 8,
        "idjob": 8
    }
    */
    @PostMapping("/addToFavorite")
    @ResponseStatus(HttpStatus.CREATED)
    public void addToFavorite(@RequestBody Favorite obj){
        jobService.serviceAddFavorite(obj);
    }

    // findAllViewjobskilltitleemployercompany
    // http://localhost:9999/api/findAllViewFavorite
    @GetMapping("/findAllViewFavorite/{idcandidate}")
    @ResponseStatus(HttpStatus.OK)
    public List<Viewfavoritejobemployercompanyjobskill> findAllViewFavorite(@PathVariable int idcandidate){
        return jobService.serviceFindAllViewFavorite(idcandidate);
    }


    
    // http://localhost:9999/api/removeJobFavorite/idfavorite
    @DeleteMapping("removeJobFavorite/{idfavorite}")
    public void removeJobFavorite(@PathVariable int idfavorite) {
        jobService.serviceRemoveFavorite(idfavorite);
    }
//---------------------------------------------------------------------------------------------------------REVIEW START

    // findAdllReview
    // http://localhost:9999/api/findAllReview
    @GetMapping("/findAllReview")
    @ResponseStatus(HttpStatus.OK)
    public List<Review> findAllReview(){
        return jobService.serviceFindAllReview();
    }
     // http://localhost:9999/api/addReview
    @PostMapping("/addReview")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Viewreview> addReview(@RequestBody Review obj){
        jobService.serviceAddReview(obj);
        
        return jobService.serviceFindAllViewReview();
    }
    
    /*
    {
        "idcandidate": 1,
        "idcontroller": 0,
        "idemployer": 0,
        "idcompany": 5,
        "content": "This company is not good, it does not respect employees",
        "postdate": "2023-07-03T17:00:00.000+00:00"
    }
        The string "2023-07-03T17:00:00.000+00:00" represents a date and time value in the ISO 8601 format with a time zone offset. Let's break it down:
        "2023-07-03" represents the date in the format "yyyy-MM-dd". In this case, it is July 3, 2023.
        "T" is a separator indicating the start of the time portion.
        "17:00:00.000" represents the time in the format "HH:mm:ss.SSS". In this case, it is 17:00:00 (5:00 PM).
        "+00:00" represents the time zone offset. It indicates that the time is specified in Coordinated Universal Time (UTC), with no offset from UTC.
        Overall, the provided date and time "2023-07-03T17:00:00.000+00:00" represents July 3, 2023, at 5:00 PM UTC.
    */
    // http://localhost:9999/api/removeReview/idreview
    @DeleteMapping("removeReview/{idreview}")
    public void removeReview(@PathVariable int idreview) {
        jobService.serviceDeleteReview(idreview);
    }
    
     // editReview
    // http://localhost:9999/api/editReview ; method put
    @PutMapping("/editReview")
    public List<Review> editReview (@RequestBody Review editObj) throws Exception {
        
        jobService.serviceAddReview(editObj); //nó sẽ tìm ra cái dòng có trùng idreview và ghi đè
        return jobService.serviceFindAllReview();
//        if(clientsService.findByCode(editObj.getCode()) == null){ // kiểm tra trong database đã tồn tại record này chưa nếu ko có thì trả về no content
//            return ResponseEntity.noContent().build();
//        }
//        clientsService.addClients(editClient); //nó sẽ tìm ra cái dòng có trùng code và ghi đè
//        return new ResponseEntity<>(editClient, HttpStatus.OK);
    }
    
    // findAdllReview
    // http://localhost:9999/api/findAllViewReview
    @GetMapping("/findAllViewReview")
    @ResponseStatus(HttpStatus.OK)
    public List<Viewreview> findAllViewReview(){
        return jobService.serviceFindAllViewReview();
    }
    //---------------------------------------------------------------------------------------------------------REVIEW END

    //---------------------------------------------------------------------------------------------------------controller start

    // http://localhost:9999/api/addController
    @PostMapping("/addController")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Controller> addController(@RequestBody Controller newObj){
        jobService.serviceAddController(newObj);
        
        return jobService.serviceFindAllController();
    }
    
    // editController
    // hàm này ko thể dùng chung với hàm addController vì data newObj khác data editObj vì editObj có thêm id của obj đc edit
    // http://localhost:9999/api/editController ; method put
    @PutMapping("/editController")
    public List<Controller> editController (@RequestBody Controller editObj) throws Exception {
        
        jobService.serviceAddController(editObj); //nó sẽ tìm ra cái dòng có trùng idcontroller và ghi đè
        return jobService.serviceFindAllController();
    }
    
    // findallcontroller
    // http://localhost:9999/api/findallcontroller
    @GetMapping("/findallcontroller")
    @ResponseStatus(HttpStatus.OK)
    public List<Controller> findallcontroller(){
        return jobService.serviceFindAllController();
    }
    //---------------------------------------------------------------------------------------------------------controller end
    //---------------------------------------------------------------------------------------------------------Candidate start
    // http://localhost:9999/api/addCandidate
    @PostMapping("/addCandidate")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Candidate> addCandidate(@RequestBody Candidate newObj){
        jobService.serviceAddCandidate(newObj);
        
        return jobService.serviceFindAllCandidate();
    }
    
    // editCandidate
    // hàm này ko thể dùng chung với hàm addCandidate vì data newObj khác data editObj vì editObj có thêm id của obj đc edit
    // http://localhost:9999/api/editCandidate ; method put
    @PutMapping("/editCandidate")
    public List<Candidate> editCandidate (@RequestBody Candidate editObj) throws Exception {
        
        jobService.serviceAddCandidate(editObj); //nó sẽ tìm ra cái dòng có trùng idCandidate và ghi đè
        return jobService.serviceFindAllCandidate();
    }
    
        // findallcontroller
    // http://localhost:9999/api/findallcandidate
    @GetMapping("/findallcandidate")
    @ResponseStatus(HttpStatus.OK)
    public List<Candidate> findallcandidate(){
        return jobService.serviceFindAllCandidate();
    }
    //---------------------------------------------------------------------------------------------------------Candidate end
    //---------------------------------------------------------------------------------------------------------Employer start
    // http://localhost:9999/api/addEmployer
    @PostMapping("/addEmployer")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Employer> addEmployer(@RequestBody Employer newObj){
        jobService.serviceAddEmployer(newObj);
        
        return jobService.serviceFindAllEmployer();
    }
    
    // http://localhost:9999/api/createEmployer
    @PostMapping("/createEmployer")
    @ResponseStatus(HttpStatus.CREATED)
    public Employer createEmployer(@RequestBody Employer newEmp) {
        return jobService.saveEmployer(newEmp);
    }
    
    // editEmployer
    // hàm này ko thể dùng chung với hàm addEmployer vì data newObj khác data editObj vì editObj có thêm id của obj đc edit
    // http://localhost:9999/api/editEmployer ; method put
    @PutMapping("/editEmployer")
    public List<Employer> editEmployer (@RequestBody Employer editObj) throws Exception {
        
        jobService.serviceAddEmployer(editObj); //nó sẽ tìm ra cái dòng có trùng idEmployer và ghi đè
        return jobService.serviceFindAllEmployer();
    }
    
    // findAllEmployer
    // http://localhost:9999/api/findAllEmployer
    @GetMapping("/findAllEmployer")
    @ResponseStatus(HttpStatus.OK)
    public List<Employer> findAllEmployer(){
        return jobService.serviceFindAllEmployer();
    }
    //---------------------------------------------------------------------------------------------------------Employer end
    //---------------------------------------------------------------------------------------------------------Job start
        // findAllJob
    // http://localhost:9999/api/findAllJob
    @GetMapping("/findAllJob")
    @ResponseStatus(HttpStatus.OK)
    public List<Job> findAllJob(){
        return jobService.serviceFindAllJob();
    }
   
    // postjob
    /*
    {
        "idjob":14000,
        "idemployer": 5,
        "idcontroller": 6,
        "postdate": "2023-05-06",
        "address": "asdgsargerh ",
        "city": "HCM",
        "workmode": "sdfgsd",
        "expiredate": "2023-05-06",
        "salary": 6546,
        "status": "sadf",
        "level": "asdf",
        "jobtitle": "asdf"
      }
    */
    // http://localhost:9999/api/postjob
    @PostMapping("/postjob")
    @ResponseStatus(HttpStatus.CREATED)
    public void postjob(@RequestBody Job newObj){
        jobService.serviceAddJob(newObj);
    }
    
    // editJob
    // hàm này ko thể dùng chung với hàm addEmployer vì data newObj khác data editObj vì editObj có thêm id của obj đc edit
    // http://localhost:9999/api/editJob
    @PutMapping("/editJob")
    public List<Viewjobskillemployercompany> editJob(@RequestBody Job obj) throws Exception {
        
        jobService.serviceAddJob(obj); //nó sẽ tìm ra cái dòng có trùng idEmployer và ghi đè
        return jobService.serviceFindAllViewjobskilltitleemployercompany();
    }
    
    // hàm này ko chạy đc
    @PutMapping("/updateJobStatus")
    public List<Viewjobskillemployercompany> updateJobStatus(@RequestBody Idjobstatus obj) {
        var idjob = obj.getIdjob();
        var status = obj.getStatus();
        
        return jobService.serviceFindAllViewjobskilltitleemployercompany();
    }

    //---------------------------------------------------------------------------------------------------------JOb end
//---------------------------------------------------------------------------------------------------------searchmonitor start

    // findAllSearchMonitor
    // http://localhost:9999/api/findAllSearchMonitor
    @GetMapping("/findAllSearchMonitor")
    @ResponseStatus(HttpStatus.OK)
    public List<Searchmonitor> findAllSearchMonitor(){
        return jobService.serviceFindAllSearchmonitor();
    }
    
    /*
    {
        "search": "php",
        "searchtime": "2023-07-19T12:33:44.910+00:00"
    }
    */
    // http://localhost:9999/api/addSearchMonitor
    @PostMapping("/addSearchMonitor")
    @ResponseStatus(HttpStatus.CREATED)
    public void addSearchMonitor(@RequestBody Searchmonitor obj){
        jobService.serviceAddSearchMonitor(obj);
    }
    //---------------------------------------------------------------------------------------------------------searchmonitor end

    //-------------------------------------------question start
    // http://localhost:9999/api/findAllQuestion
    @GetMapping("/findAllQuestion")
    @ResponseStatus(HttpStatus.OK)
    public List<Question> findAllQuestion(){
        return jobService.serviceFindAllQuestion();
    }
//    -------------------------------------------question end
//    -------------------------------------------answer start
    // http://localhost:9999/api/findAllAnswer
    @GetMapping("/findAllAnswer")
    @ResponseStatus(HttpStatus.OK)
    public List<Answer> findAllAnswer(){
        return jobService.serviceFindAllAnswer();
    }
    //    -------------------------------------------answer end
//    -------------------------------------------Resumetemplate start

    // http://localhost:9999/api/findAllResumetemplate
    @GetMapping("/findAllResumetemplate")
    @ResponseStatus(HttpStatus.OK)
    public List<Resumetemplate> findAllResumetemplate(){
        return jobService.serviceFindAllResumetemplate();
    }
    
    // http://localhost:9999/api/addResumetemplate
    @PostMapping("/addResumetemplate")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Resumetemplate> addResumetemplate(@RequestBody Resumetemplate obj){
        jobService.serviceAddResumetemplate(obj);
        return jobService.serviceFindAllResumetemplate();
    }
    
    // http://localhost:9999/api/deleteResumetemplate
    @DeleteMapping("deleteResumetemplate/{idresume}")
    public List<Resumetemplate> deleteResumetemplate(@PathVariable("idresume") int idresume) {
        jobService.serviceDeleteResumetemplate(idresume);
        return jobService.serviceFindAllResumetemplate();
    }
//    -------------------------------------------Resumetemplate end
    //    -------------------------------------------Resumeeachjob start

        /*
    {
        "idcandidate": 1, 
        "urlfile": "test",
        "idjob": 1,
        "applydate": "2023-07-14"
    }
    */
     // http://localhost:9999/api/addResumeeachjob
    @PostMapping("/addResumeeachjob")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Resumeeachjob> addResumeeachjob(@RequestBody Resumeeachjob obj){
        jobService.serviceAddResumeeachjob(obj);
        return jobService.serviceFindAllResumeeachjob();
    }
    
    // http://localhost:9999/api/findAllResumeeachjob
    @GetMapping("/findAllResumeeachjob")
    @ResponseStatus(HttpStatus.OK)
    public List<Resumeeachjob> findAllResumeeachjob(){
        return jobService.serviceFindAllResumeeachjob();
    }
        //    -------------------------------------------Resumeeachjob end
//    -------------------------------------------Testresult start

    // http://localhost:9999/api/addTestresult
    @PostMapping("/addTestresult")
    @ResponseStatus(HttpStatus.CREATED)
    public void addTestresult(@RequestBody Testresult obj){
        jobService.serviceAddTestresult(obj);
    }
    
    // http://localhost:9999/api/findAllTestresult
    @GetMapping("/findAllTestresult")
    @ResponseStatus(HttpStatus.OK)
    public List<Testresult> findAllTestresult(){
        return jobService.serviceFindAllTestresult();
    }
//    -------------------------------------------Resumedigitaleachjob start


//    -------------------------------------------Resumedigitaleachjob end
    // http://localhost:9999/api/addResumedigitaleachjob
    @PostMapping("/addResumedigitaleachjob")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Resumedigitaleachjob> addResumedigitaleachjob(@RequestBody Resumedigitaleachjob obj){
        jobService.serviceAddResumedigitaleachjob(obj);
        return jobService.serviceFindAllResumedigitaleachjob();
    }
    
    // http://localhost:9999/api/findAllResumedigitaleachjob
    @GetMapping("/findAllResumedigitaleachjob")
    @ResponseStatus(HttpStatus.OK)
    public List<Resumedigitaleachjob> findAllResumedigitaleachjob(){
        return jobService.serviceFindAllResumedigitaleachjob();
    }
//    -------------------------------------------Testresult end
    
    //    -------------------------------------------Viewjobskillemployercompany start

    // findAllViewjobskillemployercompanyByJobTitle
    // http://localhost:9999/api/findAllViewjobskillemployercompanyByJobTitle/{jobtitle}
    @GetMapping("/findAllViewjobskillemployercompanyByJobTitle/{jobtitle}")
    @ResponseStatus(HttpStatus.OK)
    public List<Viewjobskillemployercompany> findAllViewjobskillemployercompanyByJobTitle(@PathVariable("jobtitle") String jobtitle) {
        return jobService.serviceFindAllViewjobskilltitleemployercompanyByJobTitle(jobtitle);
    }
    //    -------------------------------------------Viewjobskillemployercompany end

    //    -------------------------------------------job details start

    // findJobsdescriptionsByIdJob
    // http://localhost:9999/api/findJobsdescriptionsByIdJob/{idjob}
    @GetMapping("/findJobsdescriptionsByIdJob/{idjob}")
    @ResponseStatus(HttpStatus.OK)
    public List<Jobsdescriptions> findJobsdescriptionsByIdJob(@PathVariable("idjob") int idjob) {
        
        return jobService.serviceFindJobsdescriptionsByIdJob(idjob);
    }
    
    // findWhyyouloveworkinghereByIdJob
    // http://localhost:9999/api/findWhyyouloveworkinghereByIdJob/{idjob}
    @GetMapping("/findWhyyouloveworkinghereByIdJob/{idjob}")
    @ResponseStatus(HttpStatus.OK)
    public List<Whyyouloveworkinghere> findWhyyouloveworkinghereByIdJob(@PathVariable("idjob") int idjob) {
        
        return jobService.serviceFindWhyyouloveworkinghereByIdJob(idjob);
    }
    
    // findReasonstojoinByIdJob
    // http://localhost:9999/api/findReasonstojoinByIdJob/{idjob}
    @GetMapping("/findReasonstojoinByIdJob/{idjob}")
    @ResponseStatus(HttpStatus.OK)
    public List<Reasonstojoin> findReasonstojoinByIdJob(@PathVariable("idjob") int idjob) {
        
        return jobService.serviceFindReasonstojoinByIdJob(idjob);
    }
    //    -------------------------------------------job details end

    // findJobsByIdJob
    // http://localhost:9999/api/findJobsByIdJob/{idjob}
    @GetMapping("/findJobsByIdJob/{idjob}")
    @ResponseStatus(HttpStatus.OK)
    public List<Viewjobskillemployercompany> findJobsByIdJob(@PathVariable("idjob") int idjob) {
        return jobService.serviceFindJobsByIdJob(idjob);
    }
    
//    -------------------------------------------skill start
    // http://localhost:9999/api/findAllJobskill
    @GetMapping("/findAllJobskill")
    @ResponseStatus(HttpStatus.OK)
    public List<Jobskill> findAllJobskill() {
        return jobService.serviceFindAllJobskill();
    }
    // http://localhost:9999/api/findAllSkills
    @GetMapping("/findAllSkills")
    @ResponseStatus(HttpStatus.OK)
    public List<Skill> findAllSkills() {
        return jobService.serviceFindAllSkills();
    }
//    -------------------------------------------skill end
//    -------------------------------------------company start
    // http://localhost:9999/api/findAllCompany
    @GetMapping("/findAllCompany")
    @ResponseStatus(HttpStatus.OK)
    public List<Company> findAllCompany() {
        return jobService.serviceFindAllCompany();
    }
//    -------------------------------------------company end

}// end JobApi
