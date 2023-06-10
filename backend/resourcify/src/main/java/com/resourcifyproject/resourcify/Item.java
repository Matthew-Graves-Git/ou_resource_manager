package com.resourcifyproject.resourcify;

import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
@SecondaryTable(name="cart", pkJoinColumns = @PrimaryKeyJoinColumn(name = "item_Id"))
public class Item {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "item_Id")
    private Integer itemId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resourceId", nullable = false)
    private Resource resource;
    private ItemType itemtype;
    private String serialNumber, username;
    private boolean isAvailable;
    private LocalDateTime TransactionTime;
    private float TransactionPrice;
    private long borrowTime;

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

    public ItemType getItemtype() {
        return itemtype;
    }

    public void setItemtype(ItemType itemtype) {
        this.itemtype = itemtype;
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

    public float getTransactionPrice() {
        return TransactionPrice;
    }

    public void setTransactionPrice(float transactionPrice) {
        TransactionPrice = transactionPrice;
    }

    public long getBorrowTime() {
        return borrowTime;
    }

    public void setBorrowTime(long borrowTime) {
        this.borrowTime = borrowTime;
    }
}
