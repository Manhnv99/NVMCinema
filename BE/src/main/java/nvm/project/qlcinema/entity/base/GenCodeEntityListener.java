//package nvm.project.qlcinema.entity.base;
//
//import jakarta.persistence.PrePersist;
//import nvm.project.qlcinema.entity.Chair;
//import nvm.project.qlcinema.repository.ChairRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//
//import java.util.Optional;
//
//@Component
//public class GenCodeEntityListener {
//
//    @Autowired
//    private ChairRepository chairRepository;
//
//    @PrePersist
//    private void onGen(Chair chair){
//        Optional<Chair> isChairExist = chairRepository.getNewest();
//        if(isChairExist.isEmpty()){
//            chair.setCode("CHAIR1");
//        }else{
//            String code = isChairExist.get().getCode();
//            chair.setCode(code.substring(0,5)+((Integer.parseInt(code.substring(5)))+1));
//        }
//    }
//
//}
