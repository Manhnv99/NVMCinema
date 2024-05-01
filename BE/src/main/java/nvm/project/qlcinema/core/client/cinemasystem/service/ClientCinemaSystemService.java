package nvm.project.qlcinema.core.client.cinemasystem.service;

import nvm.project.qlcinema.core.common.ResponseObject;

public interface ClientCinemaSystemService {

    ResponseObject getListBranch();

    ResponseObject getDetailBranch(String branchId);

}
