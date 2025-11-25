import  { useEffect, useState} from 'react';
import {  useNavigate } from 'react-router-dom';
import Search from '../Components/Search';
import Addbutton from '../Components/Addbutton';
import ShowItems from '../Components/ShowItems';


const ItemsIndex = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/');
        }
    }, [navigate]);


const [search, setSearch] = useState("");


    return (
        <>
            <Search value={search} onChange={e => setSearch(e.target.value)}/>
            <Addbutton />
            <div className="container">
            <ShowItems  search={search}/>

            </div>

        </>
            

    );
};

export default ItemsIndex;


