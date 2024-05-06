package nvm.project.qlcinema.infrastructure.constant;

import lombok.Getter;

@Getter
public enum AuthenticationMessage {

    TOKEN_EXPIRATION("TOKEN_EXPIRATION"),

    TOKEN_VALID("TOKEN_VALID"),

    TOKEN_INVALID("TOKEN_INVALID"),

    TOKEN_NEED_TO_REFRESH("TOKEN_NEED_TO_REFRESH"),

    REFRESH_TOKEN_EXPIRATION("REFRESH_TOKEN_EXPIRATION");

    private final String message;

    AuthenticationMessage(String message) {
        this.message = message;
    }

}
