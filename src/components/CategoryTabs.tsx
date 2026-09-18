import type { Category } from "../categories";

type Props = {
  categories: Category[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onRemove: (category: Category) => void;
};

export function CategoryTabs({ categories, selectedId, onSelect, onRemove }: Props) {
  if (categories.length === 0) {
    return (
      <div className="category-tabs">
        <p className="empty-hint">카테고리를 먼저 만들어주세요.</p>
      </div>
    );
  }

  return (
    <div className="category-tabs">
      {categories.map((category) => (
        <div
          key={category.id}
          className={`category-tab${category.id === selectedId ? " active" : ""}`}
        >
          <button type="button" onClick={() => onSelect(category.id)}>
            {category.name}
          </button>
          <button
            type="button"
            className="remove-category"
            aria-label={`${category.name} 삭제`}
            onClick={() => onRemove(category)}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
