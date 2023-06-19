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
    private String name, description, image, modelNumber;
    private float salePrice, borrowPrice;

    public Integer getResourceId() {
        return resourceId;
    } //no setter for ID

    public ResourceCategory getResourceCategory() {
        return resourceCategory;
    }

    public void setResourceCategory(String resourceCategory) {
        this.resourceCategory = ResourceCategory.valueOf(resourceCategory);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getModelNumber() {
        return modelNumber;
    }

    public void setModelNumber(String model) {
        this.modelNumber = model;
    }

    public String getDescription() {
        return description;
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
