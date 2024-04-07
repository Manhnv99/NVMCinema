package nvm.project.qlcinema.infrastructure.constant;

import lombok.Getter;

@Getter
public enum AuthenticationMessage {

    TOKEN_EXPIRATION("TOKEN_EXPIRATION"),

    TOKEN_VALID("TOKEN_VALID"),

    TOKEN_INVALID("TOKEN_INVALID");


    private final String message;

    AuthenticationMessage(String message){
        this.message = message;
    }

}
