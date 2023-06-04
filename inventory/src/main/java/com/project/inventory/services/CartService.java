package com.project.inventory.services;

import com.project.inventory.models.Cart;

public interface CartService {

    Cart saveCart(Cart c);

    Cart findCartById(int id);
}
