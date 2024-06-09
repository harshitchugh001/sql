-- Insert Surveys
INSERT INTO Surveys (title) VALUES ('Customer Satisfaction Survey');
INSERT INTO Surveys (title) VALUES ('Product Feedback Survey');

-- Insert Questions for Survey 1
INSERT INTO Questions (survey_id, question_text) VALUES (5, 'How satisfied are you with our service?');
INSERT INTO Questions (survey_id, question_text) VALUES (5, 'Would you recommend our service to others?');
INSERT INTO Questions (survey_id, question_text) VALUES (5, 'How friendly was our staff?');
INSERT INTO Questions (survey_id, question_text) VALUES (5, 'How clean was our facility?');
INSERT INTO Questions (survey_id, question_text) VALUES (5, 'How likely are you to return?');

-- Insert Questions for Survey 2
INSERT INTO Questions (survey_id, question_text) VALUES (6, 'How satisfied are you with the product quality?');
INSERT INTO Questions (survey_id, question_text) VALUES (6, 'Would you purchase this product again?');
INSERT INTO Questions (survey_id, question_text) VALUES (6, 'How satisfied are you with the product price?');
INSERT INTO Questions (survey_id, question_text) VALUES (6, 'How easy was it to use the product?');
INSERT INTO Questions (survey_id, question_text) VALUES (6, 'How likely are you to recommend this product?');

-- Answer Options for Survey 1 Questions
INSERT INTO AnswerOptions (question_id, option_text, next_question_id) VALUES (12, 'Very Satisfied', 2);
INSERT INTO AnswerOptions (question_id, option_text, next_question_id) VALUES (12, 'Satisfied', 3);
INSERT INTO AnswerOptions (question_id, option_text, next_question_id) VALUES (12, 'Neutral', 4);
INSERT INTO AnswerOptions (question_id, option_text, next_question_id) VALUES (12, 'Dissatisfied', 5);
INSERT INTO AnswerOptions (question_id, option_text, next_question_id) VALUES (1, 'Very Dissatisfied', NULL);

-- INSERT INTO AnswerOptions (question_id, option_text, next_question_id) VALUES (2, 'Yes', 3);
-- INSERT INTO AnswerOptions (question_id, option_text, next_question_id) VALUES (2, 'No', 4);

-- INSERT INTO AnswerOptions (question_id, option_text, next_question_id) VALUES (3, 'Yes', 5);
-- INSERT INTO AnswerOptions (question_id, option_text, next_question_id) VALUES (3, 'No', NULL);

-- INSERT INTO AnswerOptions (question_id, option_text, next_question_id) VALUES (4, 'Yes', 5);
-- INSERT INTO AnswerOptions (question_id, option_text, next_question_id) VALUES (4, 'No', NULL);

-- INSERT INTO AnswerOptions (question_id, option_text, next_question_id) VALUES (5, 'Yes', NULL);
-- INSERT INTO AnswerOptions (question_id, option_text, next_question_id) VALUES (5, 'No', NULL);

-- -- Answer Options for Survey 2 Questions
-- INSERT INTO AnswerOptions (question_id, option_text, next_question_id) VALUES (6, 'Very Satisfied', 7);
-- INSERT INTO AnswerOptions (question_id, option_text, next_question_id) VALUES (6, 'Satisfied', 8);
-- INSERT INTO AnswerOptions (question_id, option_text, next_question_id) VALUES (6, 'Neutral', 9);
-- INSERT INTO AnswerOptions (question_id, option_text, next_question_id) VALUES (6, 'Dissatisfied', 10);
-- INSERT INTO AnswerOptions (question_id, option_text, next_question_id) VALUES (6, 'Very Dissatisfied', NULL);

-- INSERT INTO AnswerOptions (question_id, option_text, next_question_id) VALUES (7, 'Yes', 8);
-- INSERT INTO AnswerOptions (question_id, option_text, next_question_id) VALUES (7, 'No', 9);

-- INSERT INTO AnswerOptions (question_id, option_text, next_question_id) VALUES (8, 'Yes', 10);
-- INSERT INTO AnswerOptions (question_id, option_text, next_question_id) VALUES (8, 'No', NULL);

-- INSERT INTO AnswerOptions (question_id, option_text, next_question_id) VALUES (9, 'Yes', 10);
-- INSERT INTO AnswerOptions (question_id, option_text, next_question_id) VALUES (9, 'No', NULL);

-- INSERT INTO AnswerOptions (question_id, option_text, next_question_id) VALUES (10, 'Yes', NULL);
-- INSERT INTO AnswerOptions (question_id, option_text, next_question_id) VALUES (10, 'No', NULL);

-- -- Correct Answers for Survey 1 Questions
INSERT INTO CorrectAnswers (question_id, correct_answer_id) VALUES (12, 28);
INSERT INTO CorrectAnswers (question_id, correct_answer_id) VALUES (13, 32);
INSERT INTO CorrectAnswers (question_id, correct_answer_id) VALUES (14, 37);
INSERT INTO CorrectAnswers (question_id, correct_answer_id) VALUES (15, 41);
INSERT INTO CorrectAnswers (question_id, correct_answer_id) VALUES (16, 46);

-- -- Correct Answers for Survey 2 Questions
-- INSERT INTO CorrectAnswers (question_id, correct_answer_id) VALUES (6, 26);
-- INSERT INTO CorrectAnswers (question_id, correct_answer_id) VALUES (7, 31);
-- INSERT INTO CorrectAnswers (question_id, correct_answer_id) VALUES (8, 36);
-- INSERT INTO CorrectAnswers (question_id, correct_answer_id) VALUES (9, 41);
-- INSERT INTO CorrectAnswers (question_id, correct_answer_id) VALUES (10, 46);

-- -- Sample User Responses
-- INSERT INTO UserResponses (user_id, survey_id, question_id, answer_id, response_text) VALUES (1, 1, 1, 1, 'Very Satisfied');
-- INSERT INTO UserResponses (user_id, survey_id, question_id, answer_id, response_text) VALUES (1, 1, 2, 6, 'Yes');

-- -- Sample User Results
-- INSERT INTO UserResults (user_id, survey_id, total_marks, obtained_marks) VALUES (1, 1, 5, 5);
-- INSERT INTO UserResults (user_id, survey_id, total_marks, obtained_marks) VALUES (1, 2, 5, 5);
