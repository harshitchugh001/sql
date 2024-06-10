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


exports.getquestionbysurvey= async (req,res)=>{
    console.log(req.body);

    const { id } = req.body;
    console.log(id);

    try {
        
        const questionResult = await db.query('SELECT * FROM questions WHERE survey_id = $1 ORDER BY RANDOM() LIMIT 1', [id]);
        const question = questionResult.rows[0];

        if (!question) {
            return res.status(404).json({ error: 'No questions found for the given survey ID.' });
        }

        
        const optionsResult = await db.query('SELECT * FROM answeroption WHERE question_id = $1', [question.id]);
        const options = optionsResult.rows;

        
        const randomOption = options[Math.floor(Math.random() * options.length)];

        
        return res.status(200).json({
            question,
            option: randomOption
        });
    } catch (error) {
        console.error('GET QUESTION BY SURVEY ID ERROR:', error);
        return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }



}