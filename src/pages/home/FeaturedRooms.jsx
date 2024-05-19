import axios from 'axios';
import { useEffect, useState } from 'react';

const FeaturedRooms = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const {data} = await axios(`${import.meta.env.VITE_API_URL}/suite`);
                setRooms(data)
            }
            catch (error) {
                console.log(error);
            }
        }
        getData();
    },[])
    console.log(rooms);
    return (
        <div>
            
        </div>
    );
};

export default FeaturedRooms;