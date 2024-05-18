import { Link } from "react-router-dom";


const RoomCard = ({room}) => {
    const {_id, title, price, size, images, occupancy} = room;
    
    return (
        <div>
            <Link to={`/room-details/${_id}`}>
                <img src={images[0]} alt="" />
            </Link>
            <div className="mt-5 space-y-2">
                <p className="text-xl font-bold">{title}</p>
                <div className="flex gap-2">
                <p className="font-semibold">${price} per night,</p>
                {
                    room.offer ? `$${price - ((room.offer /100) * price)} per night after ${room.offer} discount` : ''
                }
                </div>
                <p>{size}</p>
                <p>{occupancy}</p>
                <Link to={`/room-details/${_id}`} className="btn btn-outline btn-accent w-full">Details</Link>
            </div>
        </div>
    );
};

export default RoomCard;