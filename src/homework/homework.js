// Strategy Interface (กำหนดรูปแบบการคำนวณ)
class TaxStrategy {
    calculateTax(price) {
        throw new Error("This method should be overridden!");
    }
}

// Concrete Strategy 1: คำนวณภาษีสำหรับสินค้าทั่วไป
class GeneralTaxStrategy extends TaxStrategy {
    calculateTax(price) {
        return price * 0.10; // ภาษี 10%
    }
}

// Concrete Strategy 2: คำนวณภาษีสำหรับสินค้าฟุ่มเฟือย
class LuxuryTaxStrategy extends TaxStrategy {
    calculateTax(price) {
        return price * 0.20; // ภาษี 20%
    }
}

// Concrete Strategy 3: คำนวณภาษีสำหรับอาหาร
class FoodTaxStrategy extends TaxStrategy {
    calculateTax(price) {
        return 0; // ไม่มีภาษี
    }
}

// Context: คลาสที่เลือกและใช้ Strategy
class ShoppingCart {
    constructor() {
        this.items = [];
        this.taxStrategy = null; // Default tax strategy
    }

    // เพิ่มสินค้าลงในตะกร้า
    addItem(item) {
        this.items.push(item);
    }

    // กำหนด Strategy สำหรับการคำนวณภาษี
    setTaxStrategy(taxStrategy) {
        this.taxStrategy = taxStrategy;
    }

    // คำนวณราคาสินค้ารวมภาษี
    calculateTotal() {
        let total = 0;
        for (let item of this.items) {
            total += item.price;
        }
        
        // คำนวณภาษีด้วย Strategy ที่กำหนด
        let tax = this.taxStrategy.calculateTax(total);
        
        return total + tax;
    }
}

// ใช้งานตัวอย่าง
let cart = new ShoppingCart();
cart.addItem({ name: "Smartphone", price: 500 });
cart.addItem({ name: "Headphones", price: 100 });

// กำหนดว่าให้ใช้ Strategy สำหรับสินค้าทั่วไป
cart.setTaxStrategy(new GeneralTaxStrategy());

console.log("Total with General Tax: " + cart.calculateTotal()); // คำนวณภาษี 10%

// กำหนดว่าให้ใช้ Strategy สำหรับสินค้าฟุ่มเฟือย
cart.setTaxStrategy(new LuxuryTaxStrategy());

console.log("Total with Luxury Tax: " + cart.calculateTotal()); // คำนวณภาษี 20%

// กำหนดว่าให้ใช้ Strategy สำหรับอาหาร
cart.setTaxStrategy(new FoodTaxStrategy());

console.log("Total with Food Tax: " + cart.calculateTotal()); // ไม่มีภาษี

module.exports = { TaxStrategy, GeneralTaxStrategy, LuxuryTaxStrategy, FoodTaxStrategy, ShoppingCart };
