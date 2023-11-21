//
//package fpt.aptech.spring_project_sem4_api.config;
//
////package fpt.aptech.api.TokenUtil;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import java.security.Key;
//import java.util.Base64;
//import java.util.Date;
//import javax.crypto.spec.SecretKeySpec;
//
//public class TokenUtil {
//
//    private static final String SECRET_KEY = "qwertyuiopasdfghjklzxcvbnm";
//    private static final long EXPIRATION_TIME = 86400000; // 24 hours
//
//    
//    public static String generateToken(String email) {
//        byte[] apiKeySecretBytes = Base64.getEncoder().encode(SECRET_KEY.getBytes());
//        Key signingKey = new SecretKeySpec(apiKeySecretBytes, SignatureAlgorithm.HS512.getJcaName());
//
//        return Jwts.builder()
//                .claim("email", email)
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
//                .signWith(signingKey)
//                .compact();
//    }
//
//    public static Integer getEmailFromToken(String token) {
//        byte[] apiKeySecretBytes = Base64.getEncoder().encode(SECRET_KEY.getBytes());
//        Key signingKey = new SecretKeySpec(apiKeySecretBytes, SignatureAlgorithm.HS512.getJcaName());
//
//        Claims claims = Jwts.parserBuilder()
//                .setSigningKey(signingKey)
//                .build()
//                .parseClaimsJws(token)
//                .getBody();
//
//        return claims.get("email", Integer.class);
//    }
//
////    public static Integer getRoleIdFromToken(String token) {
////        byte[] apiKeySecretBytes = Base64.getEncoder().encode(SECRET_KEY.getBytes());
////        Key signingKey = new SecretKeySpec(apiKeySecretBytes, SignatureAlgorithm.HS512.getJcaName());
////
////        Claims claims = Jwts.parserBuilder()
////                .setSigningKey(signingKey)
////                .build()
////                .parseClaimsJws(token)
////                .getBody();
////
////        return claims.get("roleId", Integer.class);
////    }
//
////    public static boolean validateToken(String token) {
////        try {
////            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
////            return true;
////        } catch (Exception e) {
////            return false;
////        }
////    }
//}