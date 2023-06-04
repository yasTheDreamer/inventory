package com.project.inventory.services;

import com.project.inventory.models.Stock;

import java.util.List;

public interface StockService {

    List<Stock> getAllProducts();

    void saveProduct(Stock s);

    Stock findProductById(int id);

    List<Stock> findLowStockProducts();

    List<Stock> findOutOfStockProducts();

    List<Stock> findExpiredProducts();

    List<Stock> findExpireSoonProducts();
}
