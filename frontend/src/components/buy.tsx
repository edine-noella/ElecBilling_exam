import { useState } from "react";
import { toast } from "react-hot-toast";

export default function buy() {
  const [meter, setMeter] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div>
      <h1 className="text-sm font-bold text-center py-5">Buy new package</h1>

      <form
        className="flex flex-col gap-4"
        onSubmit={async (e) => {
          e.preventDefault();

          console.log({ meter, amount });

          const resp = await fetch("http://localhost:3000/api/tokens", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              meter,
              amount,
            }),
          });

          if (!resp.ok) {
            const message = await resp.json();
            toast.error(message);
          }

          const data = await resp.json();

          toast.success(`Payment was successfull token: ${data.token}`);
        }}
      >
        <label className="flex flex-col gap-2 w-[25rem]">
          <span className="font-bold">Meter</span>
          <input
            type="text"
            name="meter"
            placeholder="Meter number"
            value={meter}
            onChange={(e) => setMeter(e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="font-bold">Amount </span>
          <input
            type="number"
            name="amount"
            placeholder="Amount here"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>

        <button
          type="submit"
          className="bg-cyan-500 py-2 px-4 rounded-sm text-white"
        >
          Buy
        </button>
      </form>
    </div>
  );
}
