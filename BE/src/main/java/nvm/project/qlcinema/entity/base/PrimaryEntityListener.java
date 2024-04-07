package nvm.project.qlcinema.entity.base;

import jakarta.persistence.PrePersist;

import java.util.UUID;

public class PrimaryEntityListener {

    @PrePersist
    private void onCreate(PrimaryEntity entity) {
        entity.setId(UUID.randomUUID().toString());
    }

}
