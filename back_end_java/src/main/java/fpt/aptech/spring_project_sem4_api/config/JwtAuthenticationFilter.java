//package fpt.aptech.spring_project_sem4_api.config;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import static io.jsonwebtoken.Jwts.claims;
//import io.jsonwebtoken.SignatureAlgorithm;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
//import org.springframework.security.web.util.matcher.RequestMatcher;
//
//import javax.crypto.KeyGenerator;
//import javax.crypto.SecretKey;
//import javax.crypto.spec.SecretKeySpec;
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//import java.security.NoSuchAlgorithmException;
//
//public class JwtAuthenticationFilter extends AbstractAuthenticationProcessingFilter {
//
//    public JwtAuthenticationFilter(RequestMatcher requiresAuthenticationRequestMatcher) {
//        super(requiresAuthenticationRequestMatcher);
//    }
//
//    //        SecretKey secretKey = "NguyenAnhVu1411987"; // Generate the secret key
//        private static final String secretKey = "NguyenAnhVu1411987"; // Generate the secret key
//        
//    @Override
//    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
//        String token = // Extract token from request
//
//        // Validate and parse the token
//
//        
//        Claims claims = Jwts.parserBuilder()
//            .setSigningKey(secretKey)
//            .build()
//            .parseClaimsJws(token)
//            .getBody();
//        
//        String subject = claims.getSubject();
//
//        Authentication authentication = new UsernamePasswordAuthenticationToken(subject, null);
//        return getAuthenticationManager().authenticate(authentication);
//    }
//
//    @Override
//    protected void successfulAuthentication(
//            HttpServletRequest request,
//            HttpServletResponse response,
//            FilterChain chain,
//            Authentication authResult) throws IOException, ServletException {
//        SecurityContextHolder.getContext().setAuthentication(authResult);
//        chain.doFilter(request, response);
//    }
//
//    private SecretKey generateSecretKey() {
//        try {
//            KeyGenerator keyGenerator = KeyGenerator.getInstance(SignatureAlgorithm.HS256.getJcaName());
//            return keyGenerator.generateKey();
//        } catch (NoSuchAlgorithmException e) {
//            throw new RuntimeException("Failed to generate secret key", e);
//        }
//    }
//}
