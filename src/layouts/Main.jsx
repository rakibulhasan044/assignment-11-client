
import { Outlet } from 'react-router';

const Main = () => {
    return (
        <div>
            <p>this is main</p>
            <Outlet/>
        </div>
    );
};

export default Main;