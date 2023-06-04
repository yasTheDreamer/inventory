package com.project.inventory.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.io.Serializable;

@Entity
@Table(name = "cart")
public class Cart extends BaseEntity implements Serializable {

    private boolean sold;

    public Cart() {
        super();
    }

    public Cart(int id) {
        this.setId(id);
    }

    @Column(name="sold")
    public boolean isSold() {
        return sold;
    }

    public void setSold(boolean sold) {
        this.sold = sold;
    }
}
