import { useRef, useState } from "react";
import { sliderLists } from "../../Constants/index"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Menu = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const contentRef = useRef()
    const totalCocktails = sliderLists.length;
    const goToSlide=(index)=>{
        const newIndex = (index + totalCocktails)%totalCocktails
        setCurrentIndex(newIndex)
    }

    const getCocktailAt = (indexOffset) =>{
        return sliderLists[(currentIndex+indexOffset+totalCocktails)%totalCocktails]
    }

    const currentCocktail = getCocktailAt(0)
    const prevCocktail = getCocktailAt(-1)
    const nextCocktail = getCocktailAt(1)


    useGSAP(()=>{
        gsap.fromTo("#title",{opacity:0},{opacity:1,duration:1})
        gsap.fromTo(".cocktail img",{opacity:0,xPercent:-100},{opacity:1,duration:1,xPercent:0,ease:"power1.inOut"})
        gsap.fromTo(".details h2",{opacity:0,yPercent:100},{opacity:1,duration:1,yPercent:0, ease:"power1.inOut" })
        gsap.fromTo(".details p",{opacity:0,yPercent:100},{opacity:1,duration:1,yPercent:0, ease:"power1.inOut" })

    },[currentIndex])


  return (
    <div id="menu" className="overflow-hidden" aria-labelledby="menu-heading" >
      <h2 id="menu-heading" className="sr-only"  >Cocktail Menu</h2>
      <nav className="cocktail-tabs" aria-label="Cocktail Navigation"  >
        {sliderLists.map((cocktail, index)=>{
            const isActive = index === currentIndex;

            return(
                <button key={cocktail.id}
                className={`${isActive?'text-white border-white':'text-white/50 border-white/50'}`} 
                onClick={()=>goToSlide(index)}
                >
                    {cocktail.name}
                </button>
            )
        })}
      </nav>
      <div className="content" >
        <div className="arrows" >
            <button className="text-left" onClick={()=>goToSlide(currentIndex-1)} >
                <span>{prevCocktail.name}</span>
                <img src="/images/right-arrow.png" aria-hidden="true" />
            </button>
             <button className="text-right" onClick={()=>goToSlide(currentIndex+1)} >
                <span>{nextCocktail.name}</span>
                <img src="/images/left-arrow.png" aria-hidden="true" />
            </button>
        </div>
        <div className="cocktail" >
            <img src={currentCocktail.image} className="object-contain" />
        </div>
        <div className="recipe" >
            <div ref={contentRef} className="info"  >
                <p>Recipe for:</p>
                <p id="title" >{currentCocktail.name}</p>
            </div>
            <div className="details" >
                <h2>{currentCocktail.title}</h2>
                <p>{currentCocktail.description}</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Menu
