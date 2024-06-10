
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SurveyDetail() {
  const { id } = useParams();
  const [surveyDetails, setSurveyDetails] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/getquestionbysurvey`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id })
    })
    .then(response => response.json())
    .then(data => setSurveyDetails(data))
    .catch(error => console.error('Error fetching survey details:', error));
  }, [id]);
  

  if (surveyDetails.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-96">
      <h1 className="text-2xl font-bold mb-4 text-center">Survey Details</h1>
      <div className="mb-4">
        <h2 className="font-medium text-lg mb-2">{surveyDetails.question.title}</h2>
        <ul className="list-disc ml-5">
          {surveyDetails.options.map(option => (
            <li key={option.id} className="text-gray-600">{option.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SurveyDetail;
