import { Button } from "@/components/ui/neon-button"


const Default = () => {
    const handleCollect=()=>{
        

    }
    return (
        <>
            <div className="flex flex-col gap-3">
                <Button size="lg" onClick={handleCollect}>Collect</Button>
              
               
            </div>
        </>
    )
}


export { Default}