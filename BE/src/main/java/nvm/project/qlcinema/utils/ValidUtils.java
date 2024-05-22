package nvm.project.qlcinema.utils;

import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class ValidUtils {

    //    private static final String EMAIL_REGEX = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
    private static final String EMAIL_REGEX = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@gmail\\.com$";
    private static final Pattern pattern = Pattern.compile(EMAIL_REGEX);

    public boolean isEmptyString(String string) {
        return string.trim().isEmpty();
    }

    public boolean isNullLocaldate(LocalDate localDate) {
        return localDate == null;
    }

    public boolean isCccdValid(String cccd) {
        if (cccd.length() != 12) {
            return true;
        }
        if (!cccd.startsWith("0")) {
            return true;
        }
        return false;
    }

    public boolean isPhoneValid(String phone) {
        if (phone.length() != 10) {
            return true;
        }
        if (!phone.startsWith("0")) {
            return true;
        }
        return false;
    }

    public boolean isValidEmail(String email) {
        Matcher matcher = pattern.matcher(email);
        return !matcher.matches();
    }

    public static void main(String[] args) {
        ValidUtils validUtils = new ValidUtils();
    }

}
