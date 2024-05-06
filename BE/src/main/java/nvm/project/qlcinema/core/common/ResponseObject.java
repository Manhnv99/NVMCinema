package nvm.project.qlcinema.core.common;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseObject {

    private boolean isSuccess = false;
    private Object data;
    private String message;

    public <T> ResponseObject(T obj) {
        processResponseObject(obj);
    }

    public ResponseObject(String message) {
        processResponseMessage(message);
    }

    public void processResponseObject(Object obj) {
        if (obj != null) {
            this.isSuccess = true;
            this.data = obj;
        }
    }

    public void processResponseMessage(String message) {
        if (message != null) {
            this.isSuccess = true;
            this.message = message;
        }
    }

}
