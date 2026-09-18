import { useState } from "react";
import "./App.css";
import { pickRandom, useCategories, type Category } from "./categories";
import { CategoryTabs } from "./components/CategoryTabs";
import { ItemList } from "./components/ItemList";
import { NameForm } from "./components/NameForm";

function App() {
  const { categories, addCategory, removeCategory, addItem, removeItem } = useCategories();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [picked, setPicked] = useState<string | null>(null);

  const selected = categories.find((category) => category.id === selectedId) ?? null;

  function select(id: string | null) {
    setSelectedId(id);
    setPicked(null);
  }

  function create(name: string) {
    select(addCategory(name).id);
  }

  function remove(category: Category) {
    const itemCount = category.items.length;
    if (itemCount > 0 && !window.confirm(`"${category.name}"와 항목 ${itemCount}개를 삭제할까요?`)) {
      return;
    }

    removeCategory(category.id);
    if (selectedId === category.id) select(null);
  }

  return (
    <main className="container">
      <h1>뭐 할지 고르기</h1>

      <NameForm
        placeholder="카테고리 이름 (예: 게임, 음식)"
        submitLabel="카테고리 추가"
        onSubmit={create}
      />

      <CategoryTabs
        categories={categories}
        selectedId={selectedId}
        onSelect={select}
        onRemove={remove}
      />

      {selected && (
        <>
          <NameForm
            placeholder={`${selected.name} 항목 입력`}
            submitLabel="추가"
            onSubmit={(name) => addItem(selected.id, name)}
          />

          <ItemList
            items={selected.items}
            onRemove={(itemId) => removeItem(selected.id, itemId)}
          />

          <button
            type="button"
            className="pick-button"
            onClick={() => setPicked(pickRandom(selected.items))}
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
