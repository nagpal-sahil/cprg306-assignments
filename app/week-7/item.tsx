export function Item({ name, quantity, category, onSelect }) {
  return (
    <li
      onClick={onSelect}
      className="flex justify-between items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer"
    >
      <div>
        <div className="font-semibold">{name}</div>
        <div className="text-sm text-gray-600">
          Quantity: {quantity} • Category: {category}
        </div>
      </div>
    </li>
  );
}
