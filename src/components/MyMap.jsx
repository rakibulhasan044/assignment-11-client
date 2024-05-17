
import { Map, Marker, Overlay } from 'pigeon-maps';
import logo from '../assets/logo.png'

const MyMap = () => {
    return (
        <div className='flex flex-col md:flex-row gap-5 md:gap-10 mt-10 md:mt-16'>
            <div className='w-2/5 flex flex-col justify-center space-y-3'>
                <p className='text-2xl font-bold text-center'>You can find us here</p>
                <p className='text-lg font-medium'>
                    We are located in the heart of California. Use the interactive map below to find the exact location of <span className='text-red-500 font-semibold'>SplenDico</span>.
                </p>
            </div>
            <Map height={400} defaultCenter={[36.7783, -119.4179]} defaultZoom={6}>
                <Marker anchor={[36.7783, -119.4179]} payload={1} />
                <Overlay anchor={[36.7783, -119.4179]} offset={[120, 79]}>
                <div className='text-lg text-black font-semibold'>Splendico</div>
                </Overlay>
            </Map>
        </div>
    );
};

export default MyMap;
