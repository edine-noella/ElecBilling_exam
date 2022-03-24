import { Fragment, useState } from "react";
import { toast } from "react-hot-toast";
import {Token} from "@prisma/client"

export default function Check() {
  const [meterId, setMeterId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [meter, setMeter] = useState<Token | undefined>();


  function getDays(date: string){
    const oneDay = 24 * 60 * 60 * 1000
    const firstDate = new Date()
    const secondDate = new Date(date)

    return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/oneDay))
  }

  return (
    <Fragment>
      <h1 className="font-bold text-center py-6">Check your meter</h1>

      <form
        className="flex flex-col gap-5"
        onSubmit={async (e) => {
          e.preventDefault();

          if (meterId.length < 6) {
            toast.error("Please enter a valid meter ID");
            return;
          }

          const resp = await fetch(
            `http://localhost:3000/api/check/${meterId}`
          );

          if (!resp.ok) {
            toast.error(await resp.json());
            return;
          }

          const data = await resp.json();

          setSubmitted(true);

          setMeter(data);
        }}
      >
        <input
          type="text"
          value={meterId}
          onChange={(e) => setMeterId(e.target.value)}
          className="w-[30rem]"
          name="meter"
          placeholder=" Your meter number here"
        />

        <button type="submit" className="bg-cyan-600 py-2 rounded text-white">
          submit
        </button>
      </form>

      <section>
        {(meter && getDays(meter.expiresAt) !== 0) && (
          <div className="my-6 bg-emerald-700 px-3 py-4 rounded-sm text-white w-[30rem]">
            <p className="flex justify-between py-4 px-2">
              <span>Token</span> <span>{meter?.token}</span>
            </p>
            <p className="flex justify-between py-4 px-2">
              <span>Meter </span>
              <span> {meter?.meter}</span>
            </p>
            <p className="flex justify-between py-4 px-2"><span>Expires in </span>
<span>{getDays(meter.expiresAt)} {getDays(meter.expiresAt) > 1 ? "days" : "day"}</span>
            </p>
          </div>
        )}


        {(meter && getDays(meter.expiresAt)== 0) && <div className="bg-pink-700 my-4 w-[30rem] text-white py-4 text-center">
          <p>Token have expired</p>
        </div>}
      </section>

      <section>
        {submitted && !meter && <div>No token found for this meter</div>}
      </section>
    </Fragment>
  );
}
