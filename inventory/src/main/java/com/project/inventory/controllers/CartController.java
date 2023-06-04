package com.project.inventory.controllers;

import com.project.inventory.models.Cart;
import com.project.inventory.models.Order;
import com.project.inventory.services.CartService;
import com.project.inventory.services.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(exposedHeaders = "errors, content-type")
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    CartService service;

    @Autowired
    StockService stockService;

    @PostMapping("/new")
    public @ResponseBody
    ResponseEntity<Cart> newCart(@RequestBody Cart cart) {
        Cart c = service.saveCart(cart);
        return new ResponseEntity<Cart>(c, HttpStatus.OK);
    }



}
