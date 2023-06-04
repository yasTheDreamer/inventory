package com.project.inventory.repositories;

import com.project.inventory.models.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface StockRepository extends JpaRepository<Stock, Integer> {

    List<Stock> findAll();

    List<Stock> findByQuantityLessThan(int quantity);

    List<Stock> findByQuantityEquals(int quantity);

    List<Stock> findByExpiryDateLessThanEqual(Date date);

    List<Stock> findByExpiryDateBetween(Date d1, Date d2);
}
