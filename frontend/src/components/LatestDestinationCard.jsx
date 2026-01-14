import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

const LatestDestinationCard = ({ hotel }) => {
  return (
    <Link
      to={`/detail/${hotel._id}`}
      className="block border border-slate-300 rounded-lg p-4 hover:shadow-lg transition-shadow"
    >
      <div className="w-full h-[200px] mb-3">
        <img
          src={hotel.imageUrls[0]}
          className="w-full h-full object-cover object-center rounded"
        />
      </div>
      <div className="flex items-center mb-2">
        <span className="flex">
          {Array.from({ length: hotel.starRating }).map((_, index) => (
            <AiFillStar key={index} className="fill-yellow-400" />
          ))}
        </span>
        <span className="ml-1 text-sm">{hotel.type}</span>
      </div>
      <h3 className="text-lg font-bold">{hotel.name}</h3>
      <p className="text-sm text-gray-600 line-clamp-2">{hotel.description}</p>
      <div className="mt-2">
        <span className="font-bold">£{hotel.pricePerNight} per night</span>
      </div>
    </Link>
  );
};

export default LatestDestinationCard;