import { Route } from "react-router-dom"
import Home from "@/uyariwaychis/components/pages/Home"

export const Uyariwaychis = (
  <Route path="/uyariwaychis">
    <Route index element={<Home />} />
  </Route>
);
