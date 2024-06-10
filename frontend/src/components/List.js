import React from 'react';
import { useNavigate } from 'react-router-dom';

function List({ data }) {
  const navigate = useNavigate();

  const handleItemClick = (id) => {
    navigate(`/test/${id}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-96">
      <h1 className="text-2xl font-bold mb-4 text-center">Surveys</h1>
      <ul>
        {data.map(item => (
          <li
            key={item.id}
            className="border-b border-gray-200 py-2 flex justify-between items-center cursor-pointer"
            onClick={() => handleItemClick(item.id)}
          >
            <span className="font-medium">{item.title}</span>
            <span className="text-gray-600">{item.marks !== undefined ? item.marks : ''}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
