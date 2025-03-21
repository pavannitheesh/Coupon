import { Copy } from "lucide-react"
import axios from "axios";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import  {ButtonNeon}  from "./ui/neon-button"
import { useState } from "react"
import { Spinner } from "./ui/spinner"
import { toast } from "sonner"
export function DialogCloseButton() {

    const [coupon, setCoupon] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const myFunction=(e: { target: any })=> {
        const text = document.getElementById("link");
   text.select();
   text.setSelectionRange(0, 99999);
   navigator.clipboard.writeText(text.value);
    
    
    }
    const handleCollect=async ()=>{
        setLoading(true);
        setError(null);
    
        try {
          const response = await axios.post(
            "http://localhost:3003/api/claim-coupon",
            {},
            { withCredentials: true }
          );
          if(response.status !== 200){
            toast.error(response.data.message);
          }
          else{
    
          setCoupon(response.data.coupon);
          toast.success(response.data.message);
          }
        } catch (err) {
          toast.error(err.response?.data?.error );
        } finally {
          setLoading(false);
        }


    }
  return (
    <Dialog>
      <DialogTrigger asChild>
     <div className="flex justify-center">
                <ButtonNeon size="lg" onClick={handleCollect} >Collect</ButtonNeon>
                </div>
               
         
      </DialogTrigger>
      {loading ? <div key="default" className="flex flex-col items-center justify-center gap-4">
                <Spinner key="default" variant="bars" />
              </div> : coupon==null ?<></>:
      <DialogContent className="dark sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Coupon Details</DialogTitle>
        </DialogHeader>
        <div>
       
          <p className="text-white text-lg">$ {coupon.discount_amount}</p>
          <p className="text-neutral-300 mt-2 "> {coupon.description}</p>

        </div>
       
        <div className="flex items-center space-x-2">

          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Code
            </Label>
            <Input
              id="link"
              defaultValue="ABCDEF"
              readOnly value={coupon.code}
            />
          </div>
          <Button type="submit" size="sm" className="px-3" onClick={myFunction}>
            <span className="sr-only">Copy</span>
            <Copy />
          </Button>
        </div>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
}
    </Dialog>
  )
}
