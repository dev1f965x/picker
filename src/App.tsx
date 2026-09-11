import { useEffect, useState, type FormEvent } from "react";
import "./App.css";

type Item = { id: string; name: string };
type Category = { id: string; name: string; items: Item[] };

const STORAGE_KEY = "picker-categories";

function loadCategories(): Category[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as Category[];
  } catch {
    return [];
  }
}

function App() {
  const [categories, setCategories] = useState(loadCategories);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [categoryInput, setCategoryInput] = useState("");
  const [itemInput, setItemInput] = useState("");
  const [picked, setPicked] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  }, [categories]);

  const selected = categories.find((c) => c.id === selectedId) ?? null;

  function select(id: string | null) {
    setSelectedId(id);
    setPicked(null);
  }

  function updateItems(update: (items: Item[]) => Item[]) {
    if (!selected) return;
    setCategories((prev) =>
      prev.map((c) => (c.id === selected.id ? { ...c, items: update(c.items) } : c)),
    );
  }

  // Submitting through a form, rather than listening for Enter, keeps Korean IME
  // composition from adding the last syllable a second time.
  function addCategory(event: FormEvent) {
    event.preventDefault();
    const name = categoryInput.trim();
    if (!name) return;
    const category: Category = { id: crypto.randomUUID(), name, items: [] };
    setCategories((prev) => [...prev, category]);
    setCategoryInput("");
    select(category.id);
  }

  function removeCategory(category: Category) {
    const count = category.items.length;
    if (count > 0 && !window.confirm(`"${category.name}"와 항목 ${count}개를 삭제할까요?`)) {
      return;
    }
    setCategories((prev) => prev.filter((c) => c.id !== category.id));
    if (selectedId === category.id) select(null);
  }

  function addItem(event: FormEvent) {
    event.preventDefault();
    const name = itemInput.trim();
    if (!name) return;
    updateItems((items) => [...items, { id: crypto.randomUUID(), name }]);
    setItemInput("");
  }

  function pick() {
    if (!selected?.items.length) return;
    const index = Math.floor(Math.random() * selected.items.length);
    setPicked(selected.items[index].name);
  }

  return (
    <main className="container">
      <h1>뭐 할지 고르기</h1>

      <form className="add-row" onSubmit={addCategory}>
        <input
          type="text"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
          placeholder="카테고리 이름 (예: 게임, 음식)"
        />
        <button type="submit">카테고리 추가</button>
      </form>

      <div className="category-tabs">
        {categories.map((c) => (
          <div key={c.id} className={`category-tab${c.id === selectedId ? " active" : ""}`}>
            <button type="button" onClick={() => select(c.id)}>
              {c.name}
            </button>
            <button
              type="button"
              className="remove-category"
              aria-label={`${c.name} 삭제`}
              onClick={() => removeCategory(c)}
            >
              ✕
            </button>
          </div>
        ))}
        {categories.length === 0 && <p className="empty-hint">카테고리를 먼저 만들어주세요.</p>}
      </div>

      {selected && (
        <>
          <form className="add-row" onSubmit={addItem}>
            <input
              type="text"
              value={itemInput}
              onChange={(e) => setItemInput(e.target.value)}
              placeholder={`${selected.name} 항목 입력`}
            />
            <button type="submit">추가</button>
          </form>

          <ul className="item-list">
            {selected.items.map((item) => (
              <li key={item.id}>
                <span>{item.name}</span>
                <button
                  type="button"
                  className="remove"
                  aria-label={`${item.name} 삭제`}
                  onClick={() => updateItems((items) => items.filter((i) => i.id !== item.id))}
                >
                  ✕
                </button>
              </li>
            ))}
            {selected.items.length === 0 && <li className="empty">목록이 비어있습니다.</li>}
          </ul>

          <button
            type="button"
            className="pick-button"
            onClick={pick}
            disabled={selected.items.length === 0}
          >
            고르기
          </button>

          {picked && (
            <div className="result">
              <p>이거 하세요:</p>
              <strong>{picked}</strong>
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default App;
