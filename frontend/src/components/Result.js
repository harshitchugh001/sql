import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Result() {
  const { id } = useParams(); 
  const [surveyResponses, setSurveyResponses] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user.userId : null;

  useEffect(() => {
    const fetchSurveyResponses = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API}/result`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: userId, surveyId: id }), 
        });

        if (!response.ok) {
          throw new Error('Failed to fetch survey responses');
        }

        const data = await response.json();
        console.log(data.responses)
        setSurveyResponses(data.responses);
      } catch (error) {
        console.error('Error fetching survey responses:', error);
      }
    };

    fetchSurveyResponses();
  }, [id]); 
  return (
    <div className="p-6 bg-gray-100 rounded-lg max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Survey Results</h1>
      <p className="text-lg text-gray-600 mb-6">
        Thank you for completing the survey. Here is a summary of your responses:
      </p>
      <div className="space-y-4">
        {surveyResponses.map((response, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800">{`Question ${index + 1}`}:{response.question}</h2>
            <p className="text-md text-gray-600">{`Your answer: ${response.selected_answer}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
