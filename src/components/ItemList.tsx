import type { Item } from "../categories";

type Props = {
  items: Item[];
  onRemove: (id: string) => void;
};

export function ItemList({ items, onRemove }: Props) {
  if (items.length === 0) {
    return (
      <ul className="item-list">
        <li className="empty">목록이 비어있습니다.</li>
      </ul>
    );
  }

  return (
    <ul className="item-list">
      {items.map((item) => (
        <li key={item.id}>
          <span>{item.name}</span>
          <button
            type="button"
            className="remove"
            aria-label={`${item.name} 삭제`}
            onClick={() => onRemove(item.id)}
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}
