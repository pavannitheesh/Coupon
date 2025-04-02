import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { toast } from "sonner";

const AddModal = ({ isOpen, onClose, type = 'add', initialData,fetchCoupons }) => {
  const [formData, setFormData] = useState({
    code: "" as string,
   discount_amount: 0 as number,
    description: "" as string,
    isActive: true as boolean
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (type === "edit" && initialData) {
      setFormData({
        code: initialData.code || "",
       discount_amount: initialData.discount_amount || 0,
        description: initialData.description || "",
        isActive: initialData.isActive ?? true
      });
    }
    else{ setFormData({
        code: "",
   discount_amount: 0,
    description: "",
    isActive: true
      });}
  }, [type, initialData]);

  const modalRef = useRef(null);

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value, typei } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: typei === "radio" 
        ? prevState.isActive === (value === "true") ? !prevState.isActive : prevState.isActive
        : value,
    }));
  };

  const handleSubmit = async() => {
   
   
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:3003/api/admin/${type=='add'?'add-coupon':'coupons/'+initialData.id}`, {
        method: type=='add'?'POST':'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
      
        toast.error(data.error );
      }else{

        fetchCoupons();
      toast.success(data.message);
      }

    } catch (err) {
      toast.info((err as Error).message);
    }
    finally{
        setLoading(false);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div ref={modalRef} onClick={closeModal} className="h-screen fixed inset-0 flex items-center justify-center backdrop-blur-sm opacity-98 md:rounded-2xl p-4 md:p-8 shadow-input ">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-black shadow-lg p-6 w-96 text-white font-semibold rounded-2xl"
      >
        <h2 className="text-xl font-semibold mb-4">
          <div className="flex justify-between">
            {type === 'add' ? "Add" : "Edit"} Coupon
            <div className="cursor-pointer" onClick={onClose}><X /></div>
          </div>
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Coupon Code</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input  px-3 py-2 mt-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter coupon code"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Amount</label>
            <input
              type="number"
              name="discount_amount"
               step="any"
              value={formData.discount_amount}
              onChange={handleChange}
              className="flex mt-2 h-10 w-full rounded-md border border-input  px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 "
              placeholder="Enter discount amount"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input  px-3 py-2 text-sm mt-2  ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="isActive"
                  value="true"
                 defaultChecked={formData.isActive === true}
                 
                  onChange={handleChange}
                />
                <span>Active</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="isActive"
                  value="false"
                
                  defaultChecked={formData.isActive === false}
                  onChange={handleChange}
                />
                <span>Inactive</span>
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <button onClick={()=>handleSubmit()} className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]">
            {type === 'add' ? "Add" : "Update"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AddModal;
