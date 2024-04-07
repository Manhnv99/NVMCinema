package nvm.project.qlcinema.entity.base;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@MappedSuperclass
@EntityListeners(PrimaryEntityListener.class)
public abstract class PrimaryEntity {

    @Id
    @Column(name = "id")
    private String id;

}
