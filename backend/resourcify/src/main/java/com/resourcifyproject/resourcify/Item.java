package com.resourcifyproject.resourcify;

import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
public class Item {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "item_Id")
    private Integer itemId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resourceId", nullable = false)
    private Resource resource;
    private ItemType itemType;
    private String serialNumber, username;
    private boolean isAvailable;
    private LocalDateTime TransactionTime;
    private Float TransactionPrice;
    private Long borrowTime;

    public Integer getItemId() {
        return itemId;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }

    public Resource getResource() {
        return resource;
    }

    public void setResource(Resource resource) {
        this.resource = resource;
    }

    public ItemType getItemType() {
        return itemType;
    }

    public void setItemType(String itemType) {
        this.itemType = ItemType.valueOf(itemType);
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }


    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }

    public LocalDateTime getTransactionTime() {
        return TransactionTime;
    }

    public void setTransactionTime(LocalDateTime transactionTime) {
        TransactionTime = transactionTime;
    }

    public Float getTransactionPrice() {
        return TransactionPrice;
    }

    public void setTransactionPrice(Float transactionPrice) {
        TransactionPrice = transactionPrice;
    }

    public Long getBorrowTime() {
        return borrowTime;
    }

    public void setBorrowTime(Long borrowTime) {
        this.borrowTime = borrowTime;
    }
}
