package com.project.inventory.controllers;

import com.project.inventory.models.Customer;
import com.project.inventory.models.Stock;
import com.project.inventory.services.CustomerService;
import com.project.inventory.services.StockService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(exposedHeaders = "errors, content-type")
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    CustomerService service;

    @GetMapping("/")
    public @ResponseBody
    ResponseEntity<List<Customer>> getProducts(HttpServletRequest request) {

        List<Customer> customers = service.getAllCustomers();

        return new ResponseEntity<List<Customer>>(customers, HttpStatus.OK);
    }

    @GetMapping("/{id}/pay")
    public @ResponseBody
    ResponseEntity<Customer> payCredit(HttpServletRequest request, @PathVariable("id") int id) {

        Customer customer = service.findCustomerById(id);

        customer.setCredit(0);

        service.saveCustomer(customer);

        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PostMapping("/new")
    public @ResponseBody
    ResponseEntity<Customer> saveProduct(@RequestBody Customer body) {

        service.saveCustomer(body);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PostMapping("/{id}")
    public @ResponseBody
    ResponseEntity<Customer> editProduct(@RequestBody Customer body, @PathVariable("id") int id) {

        Customer customer = service.findCustomerById(id);

        customer.setName(body.getName());
        customer.setTel(body.getTel());
        customer.setAddress(body.getAddress());
        customer.setCredit(body.getCredit());

        service.saveCustomer(customer);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }


}
