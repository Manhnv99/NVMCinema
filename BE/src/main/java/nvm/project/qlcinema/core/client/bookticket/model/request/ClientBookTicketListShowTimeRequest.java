package nvm.project.qlcinema.core.client.bookticket.model.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ClientBookTicketListShowTimeRequest {

    private String movieId;

    private String branchId;

    private String areaId;

    private LocalDate date;

}
