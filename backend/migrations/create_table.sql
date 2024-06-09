-- Surveys Table
CREATE TABLE Surveys (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL
);

-- Questions Table
CREATE TABLE Questions (
    id SERIAL PRIMARY KEY,
    survey_id INT NOT NULL,
    question_text TEXT NOT NULL,
    FOREIGN KEY (survey_id) REFERENCES Surveys(id)
);

-- AnswerOptions Table
CREATE TABLE AnswerOptions (
    id SERIAL PRIMARY KEY,
    question_id INT NOT NULL,
    option_text VARCHAR(255) NOT NULL,
    next_question_id INT,
    FOREIGN KEY (question_id) REFERENCES Questions(id),
    FOREIGN KEY (next_question_id) REFERENCES Questions(id)
);

-- CorrectAnswers Table
CREATE TABLE CorrectAnswers (
    id SERIAL PRIMARY KEY,
    question_id INT NOT NULL,
    correct_answer_id INT NOT NULL,
    FOREIGN KEY (question_id) REFERENCES Questions(id),
    FOREIGN KEY (correct_answer_id) REFERENCES AnswerOptions(id)
);

-- UserResponses Table
CREATE TABLE UserResponses (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    survey_id INT NOT NULL,
    question_id INT NOT NULL,
    answer_id INT NOT NULL,
    response_text TEXT,
    FOREIGN KEY (survey_id) REFERENCES Surveys(id),
    FOREIGN KEY (question_id) REFERENCES Questions(id),
    FOREIGN KEY (answer_id) REFERENCES AnswerOptions(id)
);

-- UserResults Table
CREATE TABLE UserResults (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    survey_id INT NOT NULL,
    total_marks INT NOT NULL,
    obtained_marks INT NOT NULL,
    FOREIGN KEY (survey_id) REFERENCES Surveys(id)
);
