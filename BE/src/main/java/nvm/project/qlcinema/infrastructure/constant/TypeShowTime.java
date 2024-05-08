package nvm.project.qlcinema.infrastructure.constant;

import lombok.Getter;

@Getter
public enum TypeShowTime {

    MOVIE_CURRENT_SHOWING("MOVIE_CURRENT_SHOWING"),

    MOVIE_PRE_TICKET("MOVIE_PRE_TICKET");

    private final String name;

    TypeShowTime(String name){
        this.name = name;
    }

}
