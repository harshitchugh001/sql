const db = require('../db');


exports.getsurvey = async (req, res) => {
  try {

    const result = await db.query('SELECT * FROM surveys');

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('GET SURVEY ERROR:', error);
    return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
};


exports.getquestionbysurvey = async (req, res) => {
  console.log(req.body);

  const { id } = req.body;
  console.log(id);

  try {
    const questionResult = await db.query('SELECT * FROM questions WHERE survey_id = $1 ORDER BY RANDOM() LIMIT 1', [id]);
    const question = questionResult.rows[0];

    if (!question) {
      return res.status(404).json({ error: 'No questions found for the given survey ID.' });
    }

    const optionsResult = await db.query('SELECT * FROM answeroptions WHERE question_id = $1', [question.id]);
    const options = optionsResult.rows;

    return res.status(200).json({
      question,
      options
    });
  } catch (error) {
    console.error('GET QUESTION BY SURVEY ID ERROR:', error);
    return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
};



exports.nextquestion = async (req, res) => {
  const { userId, questionId, optionId, surveyId } = req.body;

  try {
    let nextQuestion;
    let options;
    

   
    const optionResult = await db.query('SELECT option_text, next_question_id FROM answeroptions WHERE id = $1', [optionId]);
    const option = optionResult.rows[0];
    const { option_text, next_question_id } = option;

    console.log(option_text, next_question_id);

    const resultres =await db.query(
      'INSERT INTO userresponses (user_id, survey_id, question_id, answer_id, response_text) VALUES ($1, $2, $3, $4, $5)',
      [userId, surveyId, questionId, optionId, option_text]
    );
    // console.log(resultres);



    
    

    
    const query = `
      SELECT COUNT( question_id) AS num_questions_attempted
      FROM userresponses
      WHERE user_id = $1
        AND survey_id = $2;
    `;

    const result = await db.query(query, [userId, surveyId]);
    const numQuestionsAttempted = result.rows[0].num_questions_attempted;

    console.log("Number of questions attempted:", numQuestionsAttempted);

    
    if (numQuestionsAttempted >= 5) {
      console.log("Test completed");
      return res.status(200).json({
        message: "Test completed"
      });
    }

   
    if (next_question_id === null) {
      console.log("No next question");

      
      const questionResult = await db.query('SELECT * FROM questions WHERE survey_id = $1 ORDER BY RANDOM() LIMIT 1', [surveyId]);
      const question = questionResult.rows[0];

      if (!question) {
        return res.status(404).json({ error: 'No questions found for the given survey ID.' });
      }

      const optionsResult = await db.query('SELECT * FROM answeroptions WHERE question_id = $1', [question.id]);
      options = optionsResult.rows;

      return res.status(200).json({
        question,
        options
      });
    } else {
      console.log("Next question");

      
      const nextQuestionResult = await db.query('SELECT * FROM questions WHERE id = $1', [next_question_id]);
      nextQuestion = nextQuestionResult.rows[0];

      if (!nextQuestion) {
        return res.status(404).json({ error: 'Next question not found.' });
      }

      const optionsResult = await db.query('SELECT * FROM answeroptions WHERE question_id = $1', [next_question_id]);
      options = optionsResult.rows;

      return res.status(200).json({
        question: nextQuestion,
        options
      });
    }
  } catch (error) {
    console.error('Error processing next question:', error);
    res.status(500).json({ error: 'Failed to fetch next question' });
  }
};



exports.result = async (req, res) => {
  const { userId, surveyId } = req.body; // Assuming userId and surveyId are provided in the request body

  try {
   
    const query = `
      SELECT q.question_text AS question, a.option_text AS selected_answer
      FROM userresponses ur
      JOIN questions q ON ur.question_id = q.id
      JOIN answeroptions a ON ur.answer_id = a.id
      WHERE ur.user_id = $1
        AND ur.survey_id = $2;
    `;

    const result = await db.query(query, [userId, surveyId]);
    const userResponses = result.rows;

    // Check if there are any responses
    if (userResponses.length === 0) {
      return res.status(404).json({ error: 'No responses found for the given user and survey.' });
    }

    // Format the response
    const formattedResponses = userResponses.map(response => ({
      question: response.question,
      selected_answer: response.selected_answer
    }));

    // Return the formatted response
    return res.status(200).json({
      user_id: userId,
      survey_id: surveyId,
      responses: formattedResponses
    });

  } catch (error) {
    console.error('Error fetching user responses:', error);
    res.status(500).json({ error: 'Failed to fetch user responses' });
  }
};


