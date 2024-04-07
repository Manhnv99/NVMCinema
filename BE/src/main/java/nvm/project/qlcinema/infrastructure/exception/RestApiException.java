package nvm.project.qlcinema.infrastructure.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RestApiException extends RuntimeException{

    private List<String> errors;

    private HttpStatus httpStatus;

}
