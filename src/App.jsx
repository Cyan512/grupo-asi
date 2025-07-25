import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/components/pages/Home"
import { Uyariwaychis } from "@/uyariwaychis/routes"
import { Tejada } from "@/tejada/routes"
import { Sublimados } from "@/sublimados/routes"

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {Uyariwaychis}
        {Tejada}
        {Sublimados}
      </Routes>
    </Router>
  )
}
