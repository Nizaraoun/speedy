package com.ski.speedygobackend.Repository;
import com.ski.speedygobackend.Entity.OfferManagement.Store;
import com.ski.speedygobackend.Enum.StoreType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IStoreRepository extends JpaRepository<Store, Long> {

    List<Store> findByStoreType(StoreType storeType);
    boolean existsById(Long storeId);

}
