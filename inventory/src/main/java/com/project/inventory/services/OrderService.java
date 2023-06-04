package com.project.inventory.services;

import com.project.inventory.models.Order;

import java.util.List;

public interface OrderService {

    List<Order> getAllOrders();

    void saveOrder(Order order);

    Order findOrderById(int id);

    void deleteOrderById(int id);
}
