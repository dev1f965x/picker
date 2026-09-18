import { useEffect, useState } from "react";

export type Item = { id: string; name: string };
export type Category = { id: string; name: string; items: Item[] };

const STORAGE_KEY = "picker-categories";

function loadCategories(): Category[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as Category[];
  } catch {
    return [];
  }
}

/** The categories and their items, kept in this browser. */
export function useCategories() {
  const [categories, setCategories] = useState(loadCategories);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  }, [categories]);

  function addCategory(name: string): Category {
    const category: Category = { id: crypto.randomUUID(), name, items: [] };
    setCategories((current) => [...current, category]);
    return category;
  }

  function removeCategory(id: string) {
    setCategories((current) => current.filter((category) => category.id !== id));
  }

  function addItem(categoryId: string, name: string) {
    updateItems(categoryId, (items) => [...items, { id: crypto.randomUUID(), name }]);
  }

  function removeItem(categoryId: string, itemId: string) {
    updateItems(categoryId, (items) => items.filter((item) => item.id !== itemId));
  }

  function updateItems(categoryId: string, update: (items: Item[]) => Item[]) {
    setCategories((current) =>
      current.map((category) =>
        category.id === categoryId ? { ...category, items: update(category.items) } : category,
      ),
    );
  }

  return { categories, addCategory, removeCategory, addItem, removeItem };
}

export function pickRandom(items: Item[]): string | null {
  if (items.length === 0) return null;
  return items[Math.floor(Math.random() * items.length)].name;
}
