package nvm.project.qlcinema.infrastructure.constant;

import lombok.Getter;

@Getter
public enum TypeUser {

    USER("USER"),

    CLIENT("CLIENT");

    private final String type;

    TypeUser(String type){
        this.type = type;
    }

}
