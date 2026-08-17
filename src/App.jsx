import { useRef, useState } from "react";
import "./App.css";

export default function App() {
  const LOCAL_STORAGE_NAME = "wap_items";

  const [items, setItems] = useState(() => {
    const data = localStorage.getItem(LOCAL_STORAGE_NAME);

    if (data) {
      return JSON.parse(data);
    }

    // Preexisting items
    const defaultItems = [
      {
        name: "Apple",
        amount: "5",
        price: "20",
      },
      {
        name: "Banana",
        amount: "3",
        price: "10",
      },
      {
        name: "Orange",
        amount: "10",
        price: "15",
      },
    ];

    // Save the preexisting items to localStorage
    localStorage.setItem(
      LOCAL_STORAGE_NAME,
      JSON.stringify(defaultItems)
    );

    return defaultItems;
  });

  const itemName = useRef();
  const itemAmount = useRef();
  const itemPrice = useRef();

  const addItem = () => {
    const name = itemName.current.value;
    const amount = itemAmount.current.value;
    const price = itemPrice.current.value;

    const item = {
      name: name,
      amount: amount,
      price: price,
    };

    const appendItems = [...items, item];

    localStorage.setItem(
      LOCAL_STORAGE_NAME,
      JSON.stringify(appendItems)
    );

    setItems(appendItems);
  };

  return (
    <div>
      <div className="mt-2 text-lg font-bold text-left ml-1 mb-5">
        Items
      </div>

      <div className="mt-2 text-left ml-1 mb-3">
        <label className="mr-2">Name</label>

        <input
          className="mr-2"
          type="text"
          ref={itemName}
        />

        <label className="mr-2">Amount</label>

        <input
          className="mr-2"
          type="text"
          ref={itemAmount}
        />

        <label className="mr-2">Price</label>

        <input
          type="text"
          ref={itemPrice}
        />

        <button
          className="ml-2 border-1 rounded-md px-4 py-1 bg-blue-700 text-white"
          onClick={addItem}
        >
          Add
        </button>
      </div>

      <hr />

      <div className="mt-10">
        <table className="table-auto m-auto w-9/10">
          <thead>
            <tr className="border-b-1">
              <th className="min-w-1/3">Name</th>
              <th className="min-w-1/3">Amount</th>
              <th className="min-w-1/3">Price</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.amount}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}