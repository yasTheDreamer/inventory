package com.project.inventory.services;

import com.project.inventory.models.Customer;
import com.project.inventory.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    CustomerRepository repository;

    @Override
    public List<Customer> getAllCustomers() {
        return repository.findAll();
    }

    @Override
    public void saveCustomer(Customer s) {
        repository.save(s);
    }

    @Override
    public Customer findCustomerById(int id) {
        return repository.findById(id).get();
    }
}
