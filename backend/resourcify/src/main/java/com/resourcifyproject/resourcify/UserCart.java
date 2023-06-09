package com.resourcifyproject.resourcify;

import jakarta.persistence.*;

@Entity
@Table(name="cart")
public class UserCart {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "userCart_Id")
    private Integer userCartId;
    @Column(name = "item_Id")
    private Integer itemId;

    public Integer getUserCartId() {
        return userCartId;
    }

    public void setUserCartId(Integer userCartId) {
        this.userCartId = userCartId;
    }
}
