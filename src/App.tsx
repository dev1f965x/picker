import { useEffect, useState } from "react";
import "./App.css";

type Item = { id: string; name: string };
type Category = { id: string; name: string; items: Item[] };

const STORAGE_KEY = "picker-categories";

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function App() {
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [categoryInput, setCategoryInput] = useState("");
  const [itemInput, setItemInput] = useState("");
  const [picked, setPicked] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  }, [categories]);

  const selected = categories.find((c) => c.id === selectedId) ?? null;

  function addCategory() {
    const name = categoryInput.trim();
    if (!name) return;
    const category: Category = { id: uid(), name, items: [] };
    setCategories((prev) => [...prev, category]);
    setCategoryInput("");
    setSelectedId(category.id);
  }

  function removeCategory(id: string) {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    if (selectedId === id) {
      setSelectedId(null);
      setPicked(null);
    }
  }

  function addItem() {
    const name = itemInput.trim();
    if (!name || !selected) return;
    const targetId = selected.id;
    setCategories((prev) =>
      prev.map((c) => (c.id === targetId ? { ...c, items: [...c.items, { id: uid(), name }] } : c)),
    );
    setItemInput("");
  }

  function removeItem(itemId: string) {
    if (!selected) return;
    const targetId = selected.id;
    setCategories((prev) =>
      prev.map((c) => (c.id === targetId ? { ...c, items: c.items.filter((i) => i.id !== itemId) } : c)),
    );
  }

  function pick() {
    if (!selected || selected.items.length === 0) return;
    const index = Math.floor(Math.random() * selected.items.length);
    setPicked(selected.items[index].name);
  }

  return (
    <div className="container">
      <h1>뭐 할지 고르기</h1>

      <div className="add-row">
        <input
          type="text"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addCategory()}
          placeholder="카테고리 이름 (예: 게임, 음식)"
        />
        <button onClick={addCategory}>카테고리 추가</button>
      </div>

      <div className="category-tabs">
        {categories.map((c) => (
          <button
            key={c.id}
            className={`category-tab ${c.id === selectedId ? "active" : ""}`}
            onClick={() => {
              setSelectedId(c.id);
              setPicked(null);
            }}
          >
            {c.name}
            <span
              className="remove-category"
              onClick={(e) => {
                e.stopPropagation();
                removeCategory(c.id);
              }}
            >
              ✕
            </span>
          </button>
        ))}
        {categories.length === 0 && <p className="empty-hint">카테고리를 먼저 만들어주세요.</p>}
      </div>

      {selected && (
        <>
          <div className="add-row">
            <input
              type="text"
              value={itemInput}
              onChange={(e) => setItemInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addItem()}
              placeholder={`${selected.name} 항목 입력`}
            />
            <button onClick={addItem}>추가</button>
          </div>

          <ul className="item-list">
            {selected.items.map((item) => (
              <li key={item.id}>
                <span>{item.name}</span>
                <button className="remove" onClick={() => removeItem(item.id)}>
                  ✕
                </button>
              </li>
            ))}
            {selected.items.length === 0 && <li className="empty">목록이 비어있습니다.</li>}
          </ul>

          <button className="pick-button" onClick={pick} disabled={selected.items.length === 0}>
            고르기
          </button>

          {picked && (
            <div className="result">
              <p>이거 하세요:</p>
              {/* TODO: 게임/음식처럼 고정된 카테고리에 한해 도메인 특화 가중치 알고리즘 추가될 수도, 안 될 수도 있음 */}
              <strong>{picked}</strong>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
