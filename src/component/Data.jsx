import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { BASE_URL, ENDPOINT } from '../constant';

const Data = () => {
    const [dataa, setdataa] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    let name = useRef();
    let price = useRef();

    const filteredData = dataa.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    let getData = async () => {
        let res = await axios.get(BASE_URL + ENDPOINT)
        // console.log(res);
        setdataa(res.data)
    }

    useEffect(() => {
        getData()
    }, [])

    let addData = async () => {
        let data = {
            name: name.current.value,
            price: price.current.value,
        }
        console.log(data);
        let res = await axios.post(BASE_URL + ENDPOINT, data)
        console.log(res);
        setdataa([...dataa, res.data])
    }
    console.log(dataa);

    let handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };
    return (
        <div>
            Search: <input type="search" value={searchQuery} onChange={handleSearch} /><br />

            <input type="text" name='name' ref={name} />
            <input type="number" name='name' ref={price} />
            <button onClick={addData}>submit</button>

            <table border="1px" cellPadding="10px" >
                <thead>
                    <tr>
                        <td>name</td>
                        <td>price</td>
                    </tr>
                </thead>
                <thead>
                    {
                        filteredData.map((val, ind) => (
                            <tr>
                                <td>{val.name}</td>
                                <td>{val.price}</td>
                            </tr>
                        ))
                    }
                </thead>
            </table>
        </div>

    )
}

export default Data;