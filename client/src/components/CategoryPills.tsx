import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./Button";
import { useState, useRef, useEffect } from "react";

type CategoryPillsProps = {
    categories: string[]
    selectedCategory: string
    onSelect: (category: string) => void
}

const TRANSLATE_AMOUNT = 200

export function CategoryPills({ 
    categories, 
    selectedCategory, 
    onSelect,
}: CategoryPillsProps) {
    
    const [isLeftVisibale, setIsLeftVisible] = useState(false)
    const [isRightVisibale, setIsRightVisible] = useState(false)
    const [translate, setTraslate] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (containerRef.current == null) return
    
        const observer = new ResizeObserver(entries => {
          const container = entries[0]?.target
          if (container == null) return
    
          setIsLeftVisible(translate > 0)
          setIsRightVisible(
            translate + container.clientWidth < container.scrollWidth
          )

          if (!isRightVisibale) {
            // match clientswidth with scrollwidth
          }
        })
    
        observer.observe(containerRef.current)
        console.log("pill translate: " + translate)
        return () => {
          observer.disconnect()
        }
      }, [categories, translate + 200])

    return (
        
        <div
            ref={containerRef}  
            className="overflow-x-hidden relative"
        >
            <div
                className="
                flex 
                whitespace-nowrap 
                gap-3 
                transition-transform 
                w-[max-content]"
                style={{ transform: `translateX(-${translate}px)`}}
            >   
                {categories.map(category=> (
                    <Button
                        key={category}
                        onClick={() => onSelect(category)}
                        variant={
                            selectedCategory === category ? 'dark': 'default'
                        } 
                        className="py-1 px-3 rounded-lg whitespace-nowrap "
                    >
                            {category}
                    </Button>
                ))}
            </div>
            {isLeftVisibale && (
                <div className="
                    absolute 
                    left-0 
                    top-0.5 
                    -translate-y-0.5
                    bg-gradient-to-r
                    from-white
                    from-50%
                    to-transparent
                    w-24
                    h-full"
                    
                >
                    <Button 
                        variant={"ghost"} 
                        size={"icon"}
                        className="h-full aspect-square w-auto p-1.5"
                        onClick={() => {
                            setTraslate(() => { 
                                const newTranslate = translate - TRANSLATE_AMOUNT
                                if (newTranslate <= 0) {
                                    return 0
                                }
                                return newTranslate
                            })
                        }}
                    >
                        <ChevronLeft/>
                    </Button>
                </div>
            )}
            {isRightVisibale && (
                <div className="
                    absolute 
                    right-0 
                    top-0.5 
                    -translate-y-0.5
                    bg-gradient-to-l
                    from-white
                    from-50%
                    to-transparent
                    w-24
                    h-full
                    flex
                    justify-end
                ">
                    <Button 
                        variant={"ghost"} 
                        size={"icon"}
                        className="h-full aspect-square w-auto p-1.5"
                        onClick={() =>{
                            setTraslate(translate => {

                                if(containerRef.current == null){
                                    return translate
                                }
                                const newTranslate = translate + TRANSLATE_AMOUNT
                                const edge = containerRef.current.scrollWidth
                                const width = containerRef.current.clientWidth
                                if (newTranslate + width >= edge) {
                                    return edge - width
                                }
                                return newTranslate
                            }) 
                            
                        }}
                    >
                        <ChevronRight/>
                    </Button>
                </div>
            )}
        </div>
    )
}