import { FaStar } from "react-icons/fa";

export const RenderStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((i) => {
        if (i <= fullStars) {
          return <FaStar key={i} className="text-yellow-500" />;
        } else if (i === fullStars + 1 && halfStar) {
          return <FaStar key={i} className="text-yellow-500 opacity-50" />;
        } else {
          return <FaStar key={i} className="text-gray-300" />;
        }
      })}
    </div>
  );
};
