export interface LineItem {
  name: string;
  unitPrice: number;
  quantity: number;
}

/**
 * Sum `unitPrice * quantity` across every line item in the cart.
 */
export function subtotal(items: LineItem[]): number {
  return items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
}

/**
 * Apply a percentage discount to an amount.
 *
 * @param amount the original amount, e.g. `200`
 * @param discountPercent a percentage between 0 and 100, e.g. `10` for 10% off
 * @returns the amount after the discount, e.g. `applyDiscount(200, 10) === 180`
 */
export function applyDiscount(amount: number, discountPercent: number): number {
  return amount - discountPercent;
}

/**
 * Compute the final cart total after applying a percentage discount.
 */
export function cartTotal(items: LineItem[], discountPercent: number): number {
  return applyDiscount(subtotal(items), discountPercent);
}
