package com.project.inventory.services;

import com.project.inventory.models.Cart;
import com.project.inventory.repositories.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    CartRepository repository;

    @Override
    public Cart saveCart(Cart c) {
        Cart cart = repository.save(c);
        return cart;
    }

    @Override
    public Cart findCartById(int id) {
        return repository.findById(id);
    }
}
