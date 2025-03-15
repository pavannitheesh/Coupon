import { NavBarDemo } from "@/components/ui/navbar-demo";
import axios from "axios";
import { useEffect, useState } from "react";

const Admin = () => {
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [claimedCoupons, setClaimedCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchCoupons = async (req,res) => {
      try {
       const response=  await axios.get("http://localhost:3003/api/admin/coupons", {
          headers: {
            Cookie: req.headers.cookie, 
            // passing the client's cookies to the external server
          },
        })
        console.log(response);
        setAvailableCoupons(response.data.available_coupons);
        setClaimedCoupons(response.data.claimed_coupons);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);
  return (
    <div className="dark bg-black min-h-screen">
     <NavBarDemo/>

     <div className="coupon-container text-white">
      <h2>All Coupons</h2>

     {loading && <p>Loading coupons...</p>}
     {/* {error && <p className="error">{error}</p>} */}

      {!loading && !error && (
        <>
         <div>
      <h2>Available Coupons</h2>
      {availableCoupons.length > 0 ? (
        <ul>
          {availableCoupons.map((coupon) => (
            <li key={coupon.id}>
              <strong>{coupon.code}</strong> - {coupon.discount_amount} off ({coupon.description})
            </li>
          ))}
        </ul>
      ) : (
        <p>No available coupons.</p>
      )}

      <h2>Claimed Coupons</h2>
      {claimedCoupons.length > 0 ? (
        <ul>
          {claimedCoupons.map((coupon) => (
            <li key={coupon.id}>
              <strong>{coupon.code}</strong> - {coupon.discount_amount} off ({coupon.description})
              <br />
              Claimed on: {new Date(coupon.claimed_at).toLocaleString()} (IP: {coupon.ip_address})
            </li>
          ))}
        </ul>
      ) : (
        <p>No coupons have been claimed yet.</p>
      )}
    </div>
        </>
      )}
    </div>
    </div>
  )
}

export default Admin;