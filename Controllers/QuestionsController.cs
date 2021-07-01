using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller")]
[ApiController]
public class QuestionsController : ControllerBase
{
	private readonly IDataRepository mm_dataRepository;

	public QuestionsController(IDataRepository dataRepository)
	{
		mm_dataRepository = dataRepository;
	}

	[HttpGet]
	public IEnumerable<QuestionGetManyResponse> GetQuestions(string search)
	{
		if (string.IsNullOrEmpty(search))
		{
			return m_dataRepository.GetQuestions();
		}
		else
		{
			return m_dataRepository.GetQuestionsBySearch(search);
		}
	}

	[HttpGet("unanswered")]
	public IEnumerable<QuestionGetManyResponse> GetUnansweredQuestions()
	{
		return m_dataRepository.GetUnansweredQuestions();
	}

	[HttpGet("{questionId}")]
	public ActionResult<QuestionGetSingleResponse> GetQuestion(int questionId)
	{
		var question = m_dataRepository.GetQuestion(questionId);
		if (question == null)
		{
			return NotFound();
		}
		return question;
	}

	[HttpPost]
	public ActionResult<QuestionGetSingleResponse> PostQuestion(QuestionPostRequest questionPostRequest)
	{
		var savedQuestion = m_dataRepository.PostQuestion(new QuestionPostFullRequest
		{
			Title = questionPostRequest.Title,
			Content = questionPostRequest.Content,
			UserId = "1",
			UserName = "bob.test@test.com",
			Created = DateTime.UtcNow
		});
		return CreatedAtAction(nameof(GetQuestion), new
		{
			questionId = savedQuestion.QuestionId
		}, savedQuestion);
	}

	[HttpPut("{questionId}")]
	public ActionResult<QuestionGetSingleResponse> PutQuestion(int questionId, QuestionPutRequest questionPutRequest)
	{
		var question = m_dataRepository.GetQuestion(questionId);
		if (question == null)
		{
			return NotFound();
		}
		questionPutRequest.Title = string.IsNullOrEmpty(questionPutRequest.Title) ? question.Title : questionPutRequest.Title;
		questionPutRequest.Content = string.IsNullOrEmpty(questionPutRequest.Content) ? question.Content : questionPutRequest.Content;
		var savedQuestion = m_dataRepository.PutQuestion(questionId, questionPutRequest);
		return savedQuestion;
	}

	[HttpDelete("{questionId}")]
	public ActionResult DeleteQuestion(int questionId)
	{
		var question = m_dataRepository.GetQuestion(questionId);
		if (question == null)
		{
			return NotFound();
		}
		m_dataRepository.DeleteQuestion(questionId);
		return NoContent();
	}

	[HttpPost("answer")]
	public ActionResult<AnswerGetResponse> PostAnswer(AnswerPostRequest answerPostRequest)
	{
		var questionExists = m_dataRepository.QuestionExists(answerPostRequest.QuestionId.Value);
		if (!questionExists)
		{
			return NotFound();
		}
		var savedAnswer = m_dataRepository.PostAnswer(new AnswerPostFullRequest
		{
			QuestionId = answerPostRequest.QuestionId.Value,
			Content = answerPostRequest.Content,
			UserId = "1",
			UserName = "bob.test@test.com",
			Created = DateTime.UtcNow
		});
		return savedAnswer;
	}

}