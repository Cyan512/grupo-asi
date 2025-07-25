import { Route } from "react-router-dom"
import Home from "@/sublimados/components/pages/Home"

export const Sublimados = (
  <Route path="/sublimados">
    <Route index element={<Home />} />
  </Route>
);
