import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function SurveyDetail() {
  const { id } = useParams(); 
  const [surveyDetails, setSurveyDetails] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user.userId : null;
  const navigate = useNavigate();

  useEffect(() => {
    fetchSurveyDetails(id);
  }, [id]);

  const fetchSurveyDetails = (surveyId) => {
    fetch(`${process.env.REACT_APP_API}/getquestionbysurvey`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: surveyId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.question && data.options) {
          console.log(data)
          setSurveyDetails(data);
        } else {
          throw new Error('Invalid response format');
        }
      })
      .catch((error) => {
        console.error('Error fetching survey details:', error);
        setSubmissionStatus('Error fetching survey details. Please try again later.');
      });
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedOption) {
      const questionId = surveyDetails.question.id;
      const surveyId = id;

      fetch(`${process.env.REACT_APP_API}/nextquestion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          questionId,
          optionId: selectedOption,
          surveyId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data && data.question && data.options) {
            
            console.log(data);
            setSurveyDetails(data);
           
            setSelectedOption(null);
            
            setSubmissionStatus('Your answer has been submitted successfully.');
          } else if(data.message=="Test completed"){
            console.log("navigate");
            navigate(`/result/${surveyId}`)


          }
          else {
            throw new Error('Invalid response format');
          }
        })
        .catch((error) => {
          console.error('Error submitting answer:', error);
          setSubmissionStatus('Error submitting your answer. Please try again later.');
        });
    } else {
      setSubmissionStatus('Please select an option before submitting.');
    }
  };

  if (!surveyDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-96">
      <h1 className="text-2xl font-bold mb-4 text-center">Survey Details</h1>
      <div className="mb-4">
        <h2 className="font-medium text-lg mb-2">{surveyDetails.question.question_text}</h2>
        <form onSubmit={handleSubmit}>
          <ul className="list-disc ml-5">
            {surveyDetails.options.map((option) => (
              <li key={option.id} className="text-gray-600">
                <label>
                  <input
                    type="radio"
                    name="option"
                    value={option.id}
                    onChange={handleOptionChange}
                  />
                  {option.option_text}
                </label>
              </li>
            ))}
          </ul>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white p-2 rounded"
          >
            Submit
          </button>
        </form>
        {submissionStatus && <p className="mt-4 text-red-500">{submissionStatus}</p>}
      </div>
    </div>
  );
}

export default SurveyDetail;
