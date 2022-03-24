import { Fragment } from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import Buy from "./components/buy";
import Check from "./components/check";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="buy" element={<Buy />} />
          <Route path="check" element={<Check />} />
        </Route>
      </Routes>
    </Fragment>
  );
}

function Home() {
  return (
    <section className="flex flex-col gap-12">
      <h1 className="text-4xl font-bold italic">
        Buy elecricity at the lowest price
      </h1>

      <div className="flex gap-4 items-center justify-center">
        <Link to="/buy" className="bg-cyan-700 py-4 px-2 rounded-sm text-white">
          Buy units{" "}
        </Link>
        <Link
          to="/check"
          className="bg-green-600 py-4 px-2 text-white rounded-sm"
        >
          Check units
        </Link>
      </div>
    </section>
  );
}

function Layout() {
  return (
    <section>
      <nav className="flex shadow-sm bg-sky-900 text-white items-center justify-center gap-8 py-4">
        <Link to="/" className="font-bold">
          Electri-C
        </Link>
        <div className="flex gap-4">
          <Link to="/buy">Buy</Link>
          <Link to="/check">Check</Link>
        </div>
      </nav>
      <div className="flex justify-center items-center py-20 flex-col">
        <Outlet />
      </div>
    </section>
  );
}

export default App;
