package com.project.inventory.services;

import com.project.inventory.models.Customer;
import com.project.inventory.models.Stock;

import java.util.List;

public interface CustomerService {

    List<Customer> getAllCustomers();

    void saveCustomer(Customer s);

    Customer findCustomerById(int id);
}
