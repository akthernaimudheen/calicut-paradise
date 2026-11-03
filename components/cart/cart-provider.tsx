"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { allDishes, type Dish } from "@/lib/menu";
import { itemsCount, itemsTotal, type OrderLine } from "@/lib/whatsapp";
import {
  EMPTY as EMPTY_QUANTITIES,
  getServerSnapshot,
  getSnapshot,
  subscribe,
  update,
} from "@/lib/cart-store";

export type CartDish = Dish & { categoryId: string; categoryName: string };

export type CartItem = {
  dish: CartDish;
  quantity: number;
};

type CartContextValue = {
  quantities: Record<string, number>;
  items: CartItem[];
  lines: OrderLine[];
  count: number;
  total: number | null;
  hasUnpricedItems: boolean;
  add: (dishId: string) => void;
  decrement: (dishId: string) => void;
  remove: (dishId: string) => void;
  clear: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  lastAdded: string | null;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const quantities = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  const add = useCallback((dishId: string) => {
    const current = getSnapshot();
    update({ ...current, [dishId]: Math.min(99, (current[dishId] ?? 0) + 1) });
    setLastAdded(dishId);
    window.setTimeout(() => setLastAdded((value) => (value === dishId ? null : value)), 900);
  }, []);

  const decrement = useCallback((dishId: string) => {
    const current = getSnapshot();
    const next = { ...current };
    const value = (next[dishId] ?? 0) - 1;
    if (value <= 0) {
      delete next[dishId];
    } else {
      next[dishId] = value;
    }
    update(next);
  }, []);

  const remove = useCallback((dishId: string) => {
    const next = { ...getSnapshot() };
    delete next[dishId];
    update(next);
  }, []);

  const clear = useCallback(() => update(EMPTY_QUANTITIES), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(() => {
    const items: CartItem[] = allDishes
      .filter((dish) => (quantities[dish.id] ?? 0) > 0)
      .map((dish) => ({ dish, quantity: quantities[dish.id] }));

    const lines: OrderLine[] = items.map((item) => ({
      name: item.dish.name,
      quantity: item.quantity,
      price: item.dish.price,
    }));

    return {
      quantities,
      items,
      lines,
      count: itemsCount(lines),
      total: itemsTotal(lines),
      hasUnpricedItems: items.some((item) => typeof item.dish.price !== "number"),
      add,
      decrement,
      remove,
      clear,
      isOpen,
      openCart,
      closeCart,
      lastAdded,
    };
  }, [quantities, add, decrement, remove, clear, isOpen, openCart, closeCart, lastAdded]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside <CartProvider>");
  }
  return context;
}
