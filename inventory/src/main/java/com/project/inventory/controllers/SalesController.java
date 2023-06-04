package com.project.inventory.controllers;

import com.project.inventory.models.*;
import com.project.inventory.services.CartService;
import com.project.inventory.services.CustomerService;
import com.project.inventory.services.SalesService;
import com.project.inventory.services.StockService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(exposedHeaders = "errors, content-type")
@RequestMapping("/api/sales")
public class SalesController {

    @Autowired
    SalesService salesService;

    @Autowired
    StockService stockService;

    @Autowired
    CustomerService customerService;

    @Autowired
    CartService cartService;

    @GetMapping("/sell/{option}/{id}")
    public @ResponseBody
    ResponseEntity<Sale> validateSale(HttpServletRequest request, @PathVariable("option") String option, @PathVariable("id") int id) {

        Cart cart = cartService.findCartById(id);

        if (!cart.isSold()) {
            List<Sale> sales = salesService.findAllByCartId(cart);

            sales.stream().forEach((sale) -> {
                if (option.equals("credit")){
                    Customer customer = customerService.findCustomerById(sale.getCustomerId().getId());
                    customer.setCredit(customer.getCredit() + sale.getSaleAmount());
                    customerService.saveCustomer(customer);
                }

                Stock product = stockService.findProductById(sale.getProductId().getId());
                product.setQuantity(product.getQuantity() - sale.getQuantity());
                stockService.saveProduct(product);

            });

            cart.setSold(true);
            cartService.saveCart(cart);
        }

        return new ResponseEntity<>(null, HttpStatus.OK);
    }


    @PostMapping("/sell/cash")
    public @ResponseBody
    ResponseEntity<String> sellProducts(@RequestBody Sale body) {


        int quantity = body.getQuantity();
        Stock product = stockService.findProductById(body.getProductId().getId());
        int totalAmount = quantity * product.getSellingPrice();

        if (quantity > product.getQuantity()) {
            return new ResponseEntity<String>("Selected quantity is higher than stock", HttpStatus.resolve(404));
        }

        Sale sale = body;
        sale.setSaleAmount(totalAmount);

        salesService.saveSale(sale);

        return new ResponseEntity<String>("", HttpStatus.OK);
    }

    @PostMapping("/sell/credit")
    public @ResponseBody
    ResponseEntity<Sale> sellProductsOnCredit(@RequestBody Sale body) {

        int quantity = body.getQuantity();
        int price = stockService.findProductById(body.getProductId().getId()).getSellingPrice();
        int totalAmount = quantity * price;

        Sale sale = body;
        sale.setSaleAmount(totalAmount);

        salesService.saveSale(sale);

        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @GetMapping("/profit")
    public @ResponseBody
    ResponseEntity<Profit> getProfit(HttpServletRequest request) {
        int dailyProfit = salesService.calculateDailyProfit();
        int monthlyProfit = salesService.calculateMonthlyProfit();
        int yearlyProfit = salesService.calculateYearlyProfit();

        Profit profit = new Profit();
        profit.setDaily(dailyProfit);
        profit.setMonthly(monthlyProfit);
        profit.setYearly(yearlyProfit);

        return new ResponseEntity<Profit>(profit, HttpStatus.OK);
    }

    @PostMapping("/cart")
    public @ResponseBody
    ResponseEntity<List<Sale>> getSalesByCartId(@RequestBody Sale body) {

        List<Sale> list = salesService.findAllByCartId(body.getCartId());

        return new ResponseEntity<List<Sale>>(list, HttpStatus.OK);
    }
}
