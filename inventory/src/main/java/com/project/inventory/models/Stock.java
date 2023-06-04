package com.project.inventory.models;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "product")
public class Stock extends BaseEntity implements Serializable {

    @Column(name = "productName")
    private String productName;

    @Column(name = "companyName")
    private String companyName;

    @Column(name = "expiryDate")
    private Date expiryDate;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "purchasePrice")
    private int purchasePrice;

    @Column(name = "sellingPrice")
    private int sellingPrice;

    public Stock() {
        super();
    }

    public Stock(int id) {
        this.setId(id);
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public Date getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Date expiryDate) {
        this.expiryDate = expiryDate;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getPurchasePrice() {
        return purchasePrice;
    }

    public void setPurchasePrice(int purchasePrice) {
        this.purchasePrice = purchasePrice;
    }

    public int getSellingPrice() {
        return sellingPrice;
    }

    public void setSellingPrice(int sellingPrice) {
        this.sellingPrice = sellingPrice;
    }
}
