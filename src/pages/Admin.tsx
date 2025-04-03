import AddModal from "@/components/AddModal";
import DetailModal from "@/components/DetailModal";
import { Button } from "@/components/ui/button";
import { CreditCard } from "@/components/ui/credit-card";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

const Admin = () => {
  const navigate = useNavigate();
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [claimedCoupons, setClaimedCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [active, setActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const fetchCoupons = async () => {
    try {
      const response = await axios.get("http://localhost:3003/api/admin/coupons", { withCredentials: true });
      setAvailableCoupons(response.data.available_coupons);
      setClaimedCoupons(response.data.claimed_coupons);
    } catch (err) {
      setError(err?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
   
    fetchCoupons();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:3003/api/admin/logout", {}, { withCredentials: true });
      toast.success(response.data.message);
      navigate('/login');
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const handleOpenModal = (coupon = null) => {
    setSelectedCoupon(coupon);
    setModalType(coupon ? "edit" : "add");
    setIsModalOpen(true);
  };

  return (
    <div className="dark bg-neutral-800 min-h-screen">
      <nav className="flex justify-between text-2xl text-white p-4 bg-neutral-900 shadow-2xl">
        <div className="text-3xl font-semibold">Coupon Takeaway</div>
        <div className="flex space-x-20 cursor-pointer">
          <div onClick={() => setActive(false)}>Available Coupons</div>
          <div onClick={() => setActive(true)}>Claimed Coupons</div>
        </div>
        <div>
          <Button className="cursor-pointer mr-4" onClick={() => handleOpenModal()}>Add Coupon</Button>
          <Button onClick={()=>{handleLogout()}} className="cursor-pointer">Logout</Button>
        </div>
      </nav>

      <div className="flex items-center justify-center mt-5">
        <div className="grid grid-cols-3 gap-10">
          {!active
            ? availableCoupons.length === 0
              ? <div className="text-3xl font-semibold text-white">No coupons are available</div>
              : availableCoupons.map(c => (
                <div key={c.id} className="relative">
                  <CreditCard
                    data={c}
                    onCardClick={() => {
                      setSelectedCoupon(c);
                      setIsDetailModalOpen(true);
                    }}
                  />
                 
                  <Pencil 
                    className="absolute  top-6 right-2 cursor-pointer text-white bg-slate-700 p-2 rounded-full"
                    onClick={() => handleOpenModal(c)}
                   size={32}
                  />
                </div>
              ))
            : claimedCoupons.length === 0
              ? <div className="text-3xl font-semibold text-white">No coupons are claimed</div>
              : claimedCoupons.map(c => (
                <div key={c.id} className="relative">
                  <CreditCard
                    data={c}
                    variant="dark"
                    onCardClick={() => {
                      setSelectedCoupon(c);
                      setIsDetailModalOpen(true);
                    }}
                  />
                 
                  <Pencil 
                    className="absolute  top-6 right-2 cursor-pointer text-white bg-slate-700 p-2 rounded-full"
                    onClick={() => handleOpenModal(c)}
                   size={32}
                  />
                </div>
              ))
          }
        </div>
        <AddModal
          isOpen={isModalOpen}
          onClose={() => {setSelectedCoupon(null);setIsModalOpen(false)}}
          type={modalType}
          initialData={selectedCoupon}
          fetchCoupons={fetchCoupons} 
        />
        {selectedCoupon && (
          <DetailModal
            isOpen={isDetailModalOpen}
            onClose={() => {
              setIsDetailModalOpen(false);
              setSelectedCoupon(null);
            }}
            data={selectedCoupon}
          />
        )}
      </div>
    </div>
  );
};

export default Admin;
