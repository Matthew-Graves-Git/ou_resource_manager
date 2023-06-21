package com.resourcifyproject.resourcify;

import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
public class Item {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "item_id")
    private Integer itemId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resource_id", nullable = false)
    private Resource resource;

    @Enumerated(EnumType.STRING)
    @Column(name="item_type")
    private ItemType itemType;

    private String serialNumber, username;
    private boolean isAvailable;
    private LocalDateTime TransactionTime;
    private Float TransactionPrice;
    private Long borrowTime;


    //no setter for ID

    public void setResource(Resource resource) {
        this.resource = resource;
    }

    public void setItemType(String itemType) {
        this.itemType = ItemType.valueOf(itemType);
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }

    public void setTransactionTime(LocalDateTime transactionTime) {
        TransactionTime = transactionTime;
    }

    public void setTransactionPrice(Float transactionPrice) {
        TransactionPrice = transactionPrice;
    }

    public void setBorrowTime(Long borrowTime) {
        this.borrowTime = borrowTime;
    }
}
