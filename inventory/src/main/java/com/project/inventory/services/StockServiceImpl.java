package com.project.inventory.services;

import com.project.inventory.models.Stock;
import com.project.inventory.repositories.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class StockServiceImpl implements StockService{

    @Autowired
    StockRepository repository;

    @Override
    public List<Stock> getAllProducts() {
        return repository.findAll();
    }

    @Override
    public void saveProduct(Stock s) {
        repository.save(s);
    }

    @Override
    public Stock findProductById(int id) {
        return repository.findById(id).get();
    }

    @Override
    public List<Stock> findLowStockProducts() {
        return repository.findByQuantityLessThan(10);
    }

    @Override
    public List<Stock> findOutOfStockProducts() {
        return repository.findByQuantityEquals(0);
    }

    @Override
    public List<Stock> findExpiredProducts() {
        return repository.findByExpiryDateLessThanEqual(new Date());
    }

    @Override
    public List<Stock> findExpireSoonProducts() {
        Date today = new Date();
        Date afterSevenDays = new Date(new Date().getTime() + (1000 * 60 *60 * 24 * 7));

        return repository.findByExpiryDateBetween(today, afterSevenDays);
    }
}
