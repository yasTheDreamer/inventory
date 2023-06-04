package com.project.inventory.services;

import com.project.inventory.models.Order;
import com.project.inventory.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderRepository repository;

    @Override
    public List<Order> getAllOrders() {
        return repository.findAll();
    }

    @Override
    public void saveOrder(Order order) {
        repository.save(order);
    }

    @Override
    public Order findOrderById(int id) {
        return repository.findById(id).get();
    }

    @Override
    public void deleteOrderById(int id) {
        repository.deleteById(id);
    }
}
