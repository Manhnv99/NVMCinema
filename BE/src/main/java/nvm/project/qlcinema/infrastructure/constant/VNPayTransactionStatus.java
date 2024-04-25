package nvm.project.qlcinema.infrastructure.constant;

import lombok.Getter;

@Getter
public enum VNPayTransactionStatus {

    SUCCESS("00"),

    FAILED("01"),

    IN_PROGRESS("02"),

    EXPIRED("03"),

    CANCEL("04"),

    WAIT_APPROVAL("05");

    private final String status;

    VNPayTransactionStatus(String status){
        this.status = status;
    }

}
