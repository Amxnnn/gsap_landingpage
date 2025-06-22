import gsap from "gsap"
import { ScrollTrigger, SplitText } from "gsap/all"
import Navbar from "./Components/Navbar"
import Hero from "./Components/Hero"
import Cocktails from "./Components/Cocktails"
import About from "./Components/About"

gsap.registerPlugin(ScrollTrigger, SplitText)

const App = () => {
  return (
    <main>
      <Navbar/>
      <Hero/>
      <Cocktails/>
      <About/>
    </main>
  )
}

export default App
