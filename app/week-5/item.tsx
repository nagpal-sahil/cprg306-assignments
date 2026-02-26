export type ItemProps = {
  name: string;
  quantity: number;
  category: string;
};

export default function Item({ name, quantity, category }: ItemProps) {
  return (
    <li className="border-b py-2">
      <div className="font-semibold">{name}</div>
      <div className="text-sm text-gray-600">
        Quantity: {quantity} • Category: {category}
      </div>
    </li>
  );
}