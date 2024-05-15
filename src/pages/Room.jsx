import { useLoaderData } from "react-router-dom";
import RoomCard from "../components/RoomCard";


const Room = () => {
    const rooms = useLoaderData()
    
    console.log(rooms);
    return (
        <div className="grid grid-cols-2 gap-5">
            {
                rooms.map(room => <RoomCard key={room._id}
                room={room}>
                </RoomCard>)
            }
        </div>
    );
};

export default Room;