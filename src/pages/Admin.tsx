import { DarkCreditCardDemo, DefaultCreditCardDemo } from "@/components/card-demo";
import { Button } from "@/components/ui/button";
import { CreditCard } from "@/components/ui/credit-card";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

const Admin = () => {
  const navigate=useNavigate()
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [claimedCoupons, setClaimedCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [active,setActive]=useState(false);
  useEffect(() => {
    const fetchCoupons = async (
    ) => {
      try {
       const response=  await axios.get("http://localhost:3003/api/admin/coupons",
      
         { withCredentials: true }
        )
        console.log(response);
        setAvailableCoupons(response.data.available_coupons);
        setClaimedCoupons(response.data.claimed_coupons);
      } catch (err) {
        setError(err?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);
  const handleLogout=async ()=>{
    try {
      const response=  await axios.post("http://localhost:3003/api/admin/logout",
     {},
        { withCredentials: true }
       )
       console.log(response);
       toast.success(response.data.message);
       navigate('/login');
    
     } catch (err) {
     toast.error(err?.message);
     } finally {
       setLoading(false);
     }
  }


  return (
    <div className="dark bg-neutral-800 min-h-screen">
      <nav className="flex justify-between text-2xl text-white p-4 bg-neutral-900 shadow-2xl">
        <div className="text-3xl font-semibold">Coupon Takeaway</div>
        <div className="flex space-x-20 cursor-pointer">
          <div onClick={()=>setActive(false)}>Available Coupons</div>
          <div onClick={()=>setActive(true)}>Claimed Coupons</div>
        </div>
        <div>
          <Button  className="cursor-pointer mr-4" >Add Coupon</Button>
          <Button onClick={handleLogout} className="cursor-pointer" >Logout</Button>
        </div>
      </nav>
      <div className="flex items-center justify-center mt-5">
          <div className="grid grid-cols-3 gap-10">
        {!active ?   availableCoupons.length==0 ? <div className="text-3xl font-semibold text-white">No coupons are avaialble</div> : availableCoupons.map(c => (
          <CreditCard key={c.id}
          couponCode={c.code}
          cardHolder={c.description}
          expiryDate={c.discount_amount}
          />
        ))
      
      : claimedCoupons.length==0 ? <div className="text-3xl font-semibold text-white">No coupons are claimed</div> : claimedCoupons.map(c => (
          <CreditCard key={c.id}
          variant="dark"
          couponCode={c.code}
          cardHolder={c.description}
          expiryDate={c.discount_amount}
          />
        ))
      }
      
        </div>
        <AddModal/>
    </div>
   
    
    </div>
  )
}

export default Admin;