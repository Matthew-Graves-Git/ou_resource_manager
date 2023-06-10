package com.resourcifyproject.resourcify;

import jakarta.persistence.*;

@Entity
@Table(name="resource")
public class Resource {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer resourceId;

    @Enumerated(EnumType.STRING)
    private ResourceCategory resourcecategory;
    private String name, description, image, model;
    private float salePrice, borrowPrice;

    public Integer getResourceId() {
        return resourceId;
    }

    public void setResourceId(Integer resourceId) {
        this.resourceId = resourceId;
    }

    public ResourceCategory getResourcecategory() {
        return resourcecategory;
    }

    public void setResourcecategory(String resourcecategory) {
        this.resourcecategory = ResourceCategory.valueOf(resourcecategory);
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

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
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
