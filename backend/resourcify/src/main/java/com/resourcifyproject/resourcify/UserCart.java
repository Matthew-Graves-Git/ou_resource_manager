package com.resourcifyproject.resourcify;

import jakarta.persistence.*;

import java.util.*;

@Entity
@Table(name="cart")
public class UserCart {
        @Id
        @Column(name="cart_id")
        @GeneratedValue(strategy= GenerationType.AUTO)
        private Integer cartId;

        @Column(name = "userCart_Id")
        private Integer userCartId;



        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "item_Id", nullable = false)
        private Item item;

        public Integer getCartId() {
                return cartId;
        }

        public void setCartId(Integer cartId) {
                this.cartId = cartId;
        }

        public Integer getUserCartId() {
                return userCartId;
        }

        public void setUserCartId(Integer userCartId) {
                this.userCartId = userCartId;
        }

        public Item getItem() {
                return item;
        }

        public void setItem(Item item) {
                this.item = item;
        }


}

