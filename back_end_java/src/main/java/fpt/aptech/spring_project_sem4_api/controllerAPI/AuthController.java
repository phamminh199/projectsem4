//
//package fpt.aptech.spring_project_sem4_api.controllerAPI;
//import fpt.aptech.spring_project_sem4_api.entities.Candidate;
//import fpt.aptech.spring_project_sem4_api.entities.Signinobject;
//import fpt.aptech.spring_project_sem4_api.services.iJobService;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.Date;
//import java.util.HashMap;
//import java.util.Map;
//
//@RestController
//public class AuthController {
//    private final AuthenticationManager authenticationManager;
////    private final UserService userService;
//    public final iJobService jobService;
//    private final PasswordEncoder passwordEncoder;
//
//    @Autowired
//    public AuthController(AuthenticationManager authenticationManager, iJobService jobService, PasswordEncoder passwordEncoder) {
//        this.authenticationManager = authenticationManager;
////        this.userService = userService;
//        this.passwordEncoder = passwordEncoder;
//        this.jobService = jobService;
//    }
//
//    @PostMapping("/api/login")
//    public Map<String, String> login(@RequestBody Signinobject user) {
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
//        );
//
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//
//        Candidate objCandidate = jobService.serviceFindEmailCandidateObject(user.getEmail());
//
//        String token = generateToken(objCandidate);
//
//        Map<String, String> response = new HashMap<>();
//        response.put("token", token);
//
//        return response;
//    }
//
//    private String generateToken(Candidate user) {
//        Date now = new Date();
//        Date expiryDate = new Date(now.getTime() + 86400000); // Token valid for 24 hours
//
//        return Jwts.builder()
//                .setSubject(Long.toString(user.getIdcandidate()))
//                .setIssuedAt(now)
//                .setExpiration(expiryDate)
//                .signWith(SignatureAlgorithm.HS512, "YourSecretKey")
//                .compact();
//    }
//}
