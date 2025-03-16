import { Button } from "@/components/ui/button";
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
          <div>Available Coupons</div>
          <div>Claimed Coupons</div>
        </div>
        <div>
          <Button onClick={handleLogout} className="cursor-pointer" >Logout</Button>
        </div>
      </nav>
    
    </div>
  )
}

export default Admin;