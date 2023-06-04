package com.project.inventory.services;

import com.project.inventory.models.Cart;
import com.project.inventory.models.Sale;
import com.project.inventory.repositories.SalesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public class SalesServiceImpl implements SalesService {

    @Autowired
    SalesRepository repository;

    @Override
    public void saveSale(Sale sale) {
        repository.save(sale);
    }

    @Override
    public int calculateDailyProfit() {
        List<Sale> todaySales = repository.findBySaleDate(new Date(System.currentTimeMillis())).stream().filter((sale) -> sale.getCartId().isSold()).toList();
        return todaySales.stream().mapToInt(i -> i.getSaleAmount()).sum();
    }

    @Override
    public int calculateMonthlyProfit() {
        Date date = new Date(System.currentTimeMillis());
        int month = date.getMonth();
        int year = date.getYear();
        List<Sale> todaySales = repository.findBySaleDateBetween(new Date(year, month,1), date).stream().filter((sale) -> sale.getCartId().isSold()).toList();
        return todaySales.stream().mapToInt(i -> i.getSaleAmount()).sum();
    }

    @Override
    public int calculateYearlyProfit() {
        Date date = new Date(System.currentTimeMillis());
        int year = date.getYear();
        List<Sale> todaySales = repository.findBySaleDateBetween(new Date(year, 0,1), date).stream().filter((sale) -> sale.getCartId().isSold()).toList();
        return todaySales.stream().mapToInt(i -> i.getSaleAmount()).sum();
    }

    @Override
    public List<Sale> findAllByCartId(Cart cartId) {
        return repository.findAllByCartId(cartId);
    }
}
