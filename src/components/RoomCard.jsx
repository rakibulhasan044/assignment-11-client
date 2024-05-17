

const RoomCard = ({room}) => {
    const {category, price, size, images, occupancy} = room;
    
    return (
        <div>
            <div>
                <img src={images[0]} alt="" />
            </div>
            <div className="mt-5 space-y-2">
                <p className="text-xl font-bold">{category}</p>
                <div className="flex gap-10">
                <p className="font-semibold">${price} per night</p>
                <p className="text-red-500 font-medium">{room?.offers}</p>
                </div>
                <p>{size}</p>
                <p>{occupancy}</p>
            </div>
        </div>
    );
};

export default RoomCard;