package nvm.project.qlcinema.utils;

import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class ValidUtils{

    public boolean isEmptyString(String string){
        return string.trim().isEmpty();
    }

    public boolean isNullLocaldate(LocalDate localDate){
        return localDate == null;
    }

    public boolean isCccdValid(String cccd) {
        if (cccd.length() != 12) {
            return false;
        }
        if (!cccd.startsWith("0")) {
            return false;
        }
        return true;
    }

    public boolean isPhoneValid(String phone) {
        if (phone.length() != 10) {
            return false;
        }
        if (!phone.startsWith("0")) {
            return false;
        }
        return true;
    }

}
