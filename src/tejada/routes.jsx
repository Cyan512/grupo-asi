import { Route } from "react-router-dom"
import Home from "@/tejada/components/pages/Home"

export const Tejada = (
  <Route path="/tejada">
    <Route index element={<Home />} />
  </Route>
);
