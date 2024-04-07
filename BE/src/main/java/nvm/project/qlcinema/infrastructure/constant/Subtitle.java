package nvm.project.qlcinema.infrastructure.constant;

import lombok.Getter;

@Getter
public enum Subtitle {

    PHU_DE("Phụ Đề"),

    THUYET_MINH("Thuyết Minh");

    private final String name;

    Subtitle(String name){
        this.name = name;
    }

}
