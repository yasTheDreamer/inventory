package com.project.inventory.services;

import com.project.inventory.models.Cart;
import com.project.inventory.models.Sale;

import java.util.List;

public interface SalesService {

    void saveSale(Sale sale);

    int calculateDailyProfit();

    int calculateMonthlyProfit();

    int calculateYearlyProfit();

    List<Sale> findAllByCartId(Cart cartId);
}
