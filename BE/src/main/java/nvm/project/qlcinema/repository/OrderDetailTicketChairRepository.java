package nvm.project.qlcinema.repository;

import nvm.project.qlcinema.entity.OrderDetailTicketChair;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDetailTicketChairRepository extends JpaRepository<OrderDetailTicketChair, String> {
}
