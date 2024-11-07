// import class ที่ต้องการทดสอบ
// const { GeneralTaxStrategy, LuxuryTaxStrategy, FoodTaxStrategy, ShoppingCart } = require("../../src/homework/AgilityEnchantment");

import { FoodTaxStrategy, GeneralTaxStrategy, LuxuryTaxStrategy, ShoppingCart } from "../../src/homework/homework";

describe('ShoppingCart with Tax Strategies', () => {
    let cart;

    beforeEach(() => {
        cart = new ShoppingCart();
        cart.addItem({ name: "Smartphone", price: 500 });
        cart.addItem({ name: "Headphones", price: 100 });
    });

    test('should calculate total with General Tax (10%)', () => {
        cart.setTaxStrategy(new GeneralTaxStrategy());
        const total = cart.calculateTotal();
        expect(total).toBe(660);  // 600 + 60 (10% tax)
    });

    test('should calculate total with Luxury Tax (20%)', () => {
        cart.setTaxStrategy(new LuxuryTaxStrategy());
        const total = cart.calculateTotal();
        expect(total).toBe(720);  // 600 + 120 (20% tax)
    });

    test('should calculate total with Food Tax (no tax)', () => {
        cart.setTaxStrategy(new FoodTaxStrategy());
        const total = cart.calculateTotal();
        expect(total).toBe(600);  // ไม่มีภาษี
    });

    test('should return correct total even with empty cart', () => {
        let emptyCart = new ShoppingCart();
        emptyCart.setTaxStrategy(new GeneralTaxStrategy());
        const total = emptyCart.calculateTotal();
        expect(total).toBe(0);  // ไม่มีสินค้าจะต้องเป็น 0
    });
});
