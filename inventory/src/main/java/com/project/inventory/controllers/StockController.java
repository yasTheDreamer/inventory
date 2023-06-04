package com.project.inventory.controllers;

import com.project.inventory.models.Stock;
import com.project.inventory.services.StockService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(exposedHeaders = "errors, content-type")
@RequestMapping("/api/products")
public class StockController {

    @Autowired
    StockService service;

    @GetMapping("/")
    public @ResponseBody
    ResponseEntity<List<Stock>> getProducts(HttpServletRequest request) {

        List<Stock> products = service.getAllProducts();

        return new ResponseEntity<List<Stock>>(products, HttpStatus.OK);
    }

    @GetMapping("/low")
    public @ResponseBody
    ResponseEntity<List<Stock>> getLowStockProducts(HttpServletRequest request) {

        List<Stock> products = service.findLowStockProducts();

        return new ResponseEntity<List<Stock>>(products, HttpStatus.OK);
    }

    @GetMapping("/out")
    public @ResponseBody
    ResponseEntity<List<Stock>> getOutOfStockProducts(HttpServletRequest request) {

        List<Stock> products = service.findOutOfStockProducts();

        return new ResponseEntity<List<Stock>>(products, HttpStatus.OK);
    }

    @GetMapping("/expired")
    public @ResponseBody
    ResponseEntity<List<Stock>> getExpiredProducts(HttpServletRequest request) {

        List<Stock> products = service.findExpiredProducts();

        return new ResponseEntity<List<Stock>>(products, HttpStatus.OK);
    }

    @GetMapping("/expireSoon")
    public @ResponseBody
    ResponseEntity<List<Stock>> getExpireSoonProducts(HttpServletRequest request) {

        List<Stock> products = service.findExpireSoonProducts();

        return new ResponseEntity<List<Stock>>(products, HttpStatus.OK);
    }

    @PostMapping("/new")
    public @ResponseBody
    ResponseEntity<Stock> saveProduct(@RequestBody Stock body) {

        service.saveProduct(body);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PostMapping("/{id}")
    public @ResponseBody
    ResponseEntity<Stock> editProduct(@RequestBody Stock body, @PathVariable("id") int id) {

        Stock product = service.findProductById(id);

        product.setProductName(body.getProductName());
        product.setCompanyName(body.getCompanyName());
        product.setExpiryDate(body.getExpiryDate());
        product.setPurchasePrice(body.getPurchasePrice());
        product.setQuantity(body.getQuantity());
        product.setSellingPrice(body.getSellingPrice());

        service.saveProduct(product);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }


}
