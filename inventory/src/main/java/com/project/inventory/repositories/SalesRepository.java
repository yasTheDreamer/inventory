package com.project.inventory.repositories;

import com.project.inventory.models.Cart;
import com.project.inventory.models.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface SalesRepository extends JpaRepository<Sale, Integer> {

    List<Sale> findBySaleDate(Date date);

    List<Sale> findBySaleDateBetween(Date date1, Date date2);

    List<Sale> findAllByCartId(Cart cartId);
}
