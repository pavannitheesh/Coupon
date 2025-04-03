import { motion } from "framer-motion";
import { X } from "lucide-react";
// import { format } from "date-fns";
import  {formatInTimeZone}  from "date-fns-tz";

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    code: string;
    description: string;
    discount_amount: string;
    is_claimed?: boolean;
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
    ip_address?: string;
    claimed_at?: string;
  };
}

const DetailModal = ({ isOpen, onClose, data }: DetailModalProps) => {
  if (!isOpen) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const timeZone = 'Etc/UTC'; // Example: "America/New_York"
    const date = formatInTimeZone(new Date(dateString), timeZone,'PPpp');
    console.log(date);
    return date;
  };

  return (
    
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-sm opacity-98 md:rounded-2xl p-4 md:p-8 shadow-input"
      onClick={onClose}
    >
      {console.log(data)}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-neutral-900 shadow-lg p-6 w-[500px] text-white font-semibold rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Coupon Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 text-sm">Code</p>
              <p className="text-lg font-medium">{data.code}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Amount</p>
              <p className="text-lg font-medium">${data.discount_amount}</p>
            </div>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Description</p>
            <p className="text-lg font-medium">{data.description}</p>
          </div>

          <div className="pt-4 border-t border-neutral-700">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Status</p>
                <p className="text-lg font-medium flex items-center">
                  <span
                    className={`inline-block w-2 h-2 rounded-full mr-2 ${data.is_claimed ? "bg-yellow-500" : "bg-green-500"}`}
                  ></span>
                  {data.is_claimed ? "Claimed" : "Available"}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Activity</p>
                <p className="text-lg font-medium flex items-center">
                  <span
                    className={`inline-block w-2 h-2 rounded-full mr-2 ${!data.is_active ? "bg-yellow-500" : "bg-green-500"}`}
                  ></span>
                  {data.is_claimed ? "active" : "Inactive"}
                </p>
              </div>
           
              {data.is_claimed && (
                <div>
                  <p className="text-gray-400 text-sm">IP Address</p>
                  <p className="text-lg font-medium">{data.ip_address}</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <p className="text-gray-400 text-sm">Created At</p>
              <p className="text-base">{formatDate(data.created_at)}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Last Updated</p>
              <p className="text-base">{formatDate(data.updated_at)}</p>
            </div>
            {data.is_claimed && (
              <div>
                <p className="text-gray-400 text-sm">Claimed At</p>
                <p className="text-base">{formatDate(data.claimed_at)}</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DetailModal;