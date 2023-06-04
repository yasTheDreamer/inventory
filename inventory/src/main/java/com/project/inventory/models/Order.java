package com.project.inventory.models;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "orders")
public class Order extends BaseEntity implements Serializable {

    private Stock productId;

    private int quantity;

    public Order() {
        super();
    }
    @ManyToOne
    @JoinColumn(name = "productId", referencedColumnName = "id", nullable = false)
    public Stock getProductId() {
        return productId;
    }

    public void setProductId(Stock productId) {
        this.productId = productId;
    }

    @Column(name="quantity")
    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
