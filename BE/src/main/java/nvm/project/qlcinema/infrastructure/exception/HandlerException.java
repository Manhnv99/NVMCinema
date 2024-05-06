package nvm.project.qlcinema.infrastructure.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.ArrayList;
import java.util.List;

@RestControllerAdvice
public class HandlerException {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleException(MethodArgumentNotValidException ex) {
        List<String> valueErrors = new ArrayList<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String value = error.getDefaultMessage();
            valueErrors.add(value);
        });
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(valueErrors);
    }

    @ExceptionHandler(RestApiException.class)
    public ResponseEntity<?> restApiException(RestApiException restApiException) {
        return ResponseEntity.status(restApiException.getHttpStatus()).body(restApiException.getErrors());
    }

}
