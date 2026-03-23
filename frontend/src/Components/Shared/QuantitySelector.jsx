import { FaMinus, FaPlus } from "react-icons/fa";
import OutlineButton from "../Common/OutlineButton";


const QuantitySelector = ({
  product,
  quantity,
  onUpdate,
  containerClass = "",
  buttonClass = "",
  displayClass = "",
}) => {
  // Logic for limits
  const maxLimit = Math.min(5, product.stock);
  const isMaxReached = quantity >= maxLimit;
  const isOutOfStock = product.stock === 0;

  return (
    <div
      className={`flex items-center gap-1 p-1 rounded-xl transition-colors ${containerClass}`}
    >
      {/* Minus Button */}
      <OutlineButton
        onClick={() => onUpdate(product, -1)}
        className={`px-4 py-3 flex-1 text-lg text-(--main-color) flex items-center justify-center ${buttonClass}`}
      >
        <FaMinus size={14} />
      </OutlineButton>

      {/* Quantity Display */}
      <span
        className={`px-2 py-1 font-bold min-w-12 text-center rounded-lg transition-all duration-300 
          text-white ${isMaxReached ? "bg-red-500 " : "bg-(--main-color)/80"} 
          ${displayClass}`}
      >
        {isOutOfStock ? 0 : quantity}
      </span>

      {/* Plus Button */}
      <OutlineButton
        onClick={() => onUpdate(product, 1)}
        className={`px-4 py-3 flex-1 text-lg flex text-(--main-color) items-center justify-center ${buttonClass}`}
        disabled={isMaxReached || isOutOfStock}
      >
        <FaPlus size={14} />
      </OutlineButton>
    </div>
  );
};

export default QuantitySelector;
