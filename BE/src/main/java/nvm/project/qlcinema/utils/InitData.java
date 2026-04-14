package nvm.project.qlcinema.utils;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import nvm.project.qlcinema.entity.Area;
import nvm.project.qlcinema.repository.AreaRepository;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import javax.sql.DataSource;
import java.util.List;

@Component
@RequiredArgsConstructor
public class InitData {

    private final DataSource dataSource;

    private final AreaRepository areaRepository;

    @PostConstruct
    public void runSql() {
        List<Area> areas = areaRepository.findAll();
        if(!CollectionUtils.isEmpty(areas)) {
            return;
        }

        ResourceDatabasePopulator populator = new ResourceDatabasePopulator();

        populator.addScript(new ClassPathResource("script-init.sql"));

        populator.execute(dataSource);
    }

}
