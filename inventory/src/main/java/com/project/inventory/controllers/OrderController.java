package com.project.inventory.controllers;

import com.project.inventory.models.Order;
import com.project.inventory.models.Stock;
import com.project.inventory.services.OrderService;
import com.project.inventory.services.StockService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(exposedHeaders = "errors, content-type")
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    OrderService orderService;

    @Autowired
    StockService stockService;

    @GetMapping("/")
    public @ResponseBody
    ResponseEntity<List<Order>> getProducts(HttpServletRequest request) {

        List<Order> orders = orderService.getAllOrders();

        return new ResponseEntity<List<Order>>(orders, HttpStatus.OK);
    }

    @PostMapping("/new")
    public @ResponseBody
    ResponseEntity<Order> saveProduct(@RequestBody Order body) {
        orderService.saveOrder(body);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PostMapping("/{id}")
    public @ResponseBody
    ResponseEntity<Order> receiveOrder(@RequestBody Stock body, @PathVariable("id") int id) {

        Order order = orderService.findOrderById(id);

        Stock product = stockService.findProductById(order.getProductId().getId());

        product.setQuantity(order.getQuantity());
        product.setExpiryDate(body.getExpiryDate());

        stockService.saveProduct(product);

        orderService.deleteOrderById(id);

        return new ResponseEntity<>(null, HttpStatus.OK);
    }


}
