using System;
using System.Collections.Generic;

public interface IDataRepository
{
	IEnumerable<QuestionGetManyResponse> GetQuestions();
	IEnumerable<QuestionGetManyResponse> GetQuestionsBySearch(string search);
	IEnumerable<QuestionGetManyResponse> GetUnansweredQuestions();
	QuestionGetSingleResponse GetQuestion(int questionId);
	bool QuestionExists(int questionId);
	AnswerGetResponse GetAnswer(int answerId);
	QuestionGetSingleResponse PostQuestion(QuestionPostRequest question);
	QuestionGetSingleResponse PutQuestion(int quesitonId, QuestionPutRequest quesiton);
	void DeleteQuestion(int questionId);
	AnswerGetResponse PostAnswer(AnswerPostRequest answer);
}