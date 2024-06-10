import React, { useEffect, useState } from 'react';
import List from './List';
import Logout from './Logout'






export default function Surveys() {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API}/surveys`)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching surveys:', error));
    }, []);
    return (
        <div>
            <Logout></Logout>

            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <List data={data} />
            </div>
        </div>
    )
}
