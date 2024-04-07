package nvm.project.qlcinema.core.common;

import lombok.Getter;
import lombok.Setter;
import nvm.project.qlcinema.infrastructure.constant.PaginationConstant;

@Getter
@Setter
public abstract class PageableRequest {

    private int page = PaginationConstant.DEFAULT_PAGE;

    private int size = PaginationConstant.DEFAULT_SIZE;

}
