package com.resourcifyproject.resourcify;

import jakarta.persistence.*;

@Entity
@Table(name="resource")
public class Resource {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name="resource_id")
    private Integer resourceId;

    @Enumerated(EnumType.STRING)
    @Column(name="resource_category")
    private ResourceCategory resourceCategory;

    private int quantityBorrow = 0, quantitySale = 0;
    private String name, description, image, modelNumber;
    private float salePrice, borrowPrice;


    //no setter for ID

    public void setResourceCategory(String resourceCategory) {
        this.resourceCategory = ResourceCategory.valueOf(resourceCategory);
    }

    public Integer getResourceId() {
        return resourceId;
    }

    public ResourceCategory getResourceCategory() {
        return resourceCategory;
    }

    public int getQuantityBorrow() {
        return quantityBorrow;
    }

    public int getQuantitySale() {
        return quantitySale;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getImage() {
        return image;
    }

    public String getModelNumber() {
        return modelNumber;
    }

    public void setQuantityBorrow(int quantityBorrow) { this.quantityBorrow = quantityBorrow; }

    public void setQuantitySale(int quantitySale) { this.quantitySale = quantitySale; }

    public void setName(String name) {
        this.name = name;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setModelNumber(String model) {
        this.modelNumber = model;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public float getSalePrice() {
        return salePrice;
    }

    public void setSalePrice(float salePrice) {
        this.salePrice = salePrice;
    }

    public float getBorrowPrice() {
        return borrowPrice;
    }

    public void setBorrowPrice(float borrowPrice) {
        this.borrowPrice = borrowPrice;
    }
}
