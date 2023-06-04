package com.project.inventory.models;

import jakarta.persistence.*;

import java.io.Serializable;
import java.sql.Date;

@Entity
@Table(name = "sales")
public class Sale extends BaseEntity implements Serializable {

    private Customer customerId;

    private Stock productId;

    private Date saleDate;

    private int quantity;

    private int saleAmount;

    private String payment;

    private Cart cartId;

    public Sale() {
        super();
    }

    @ManyToOne
    @JoinColumn(name = "customerId", referencedColumnName = "id", nullable = false)
    public Customer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Customer customerId) {
        this.customerId = customerId;
    }

    @ManyToOne
    @JoinColumn(name = "productId", referencedColumnName = "id", nullable = false)
    public Stock getProductId() {
        return productId;
    }

    public void setProductId(Stock productId) {
        this.productId = productId;
    }

    @Column(name="saleDate")
    public Date getSaleDate() {
        return saleDate;
    }

    public void setSaleDate(Date saleDate) {
        this.saleDate = saleDate;
    }

    @Column(name="quantity")
    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Column(name="saleAmount")
    public int getSaleAmount() {
        return saleAmount;
    }

    public void setSaleAmount(int saleAmount) {
        this.saleAmount = saleAmount;
    }

    @Column(name="payment")
    public String getPayment() {
        return payment;
    }

    public void setPayment(String payment) {
        this.payment = payment;
    }

    @ManyToOne
    @JoinColumn(name = "cartId", referencedColumnName = "id", nullable = false)
    public Cart getCartId() {
        return cartId;
    }

    public void setCartId(Cart cartId) {
        this.cartId = cartId;
    }

}
