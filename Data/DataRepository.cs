using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using Dapper;

public class DataRepository : IDataRepository
{
	private readonly string m_connectionString;
	public DataRepository(IConfiguration configuration)
	{
		m_connectionString = configuration["ConnectionStrings:defaultConnection"];
	}

	public void DeleteQuestion(int questionId)
	{
		using (var connection = new SqlConnection(m_connectionString))
		{
			connection.Open();
			connection.Execute(@"EXEC Question_Delete @QuestionId = @QuestionId", new { QuestionId = questionId });
		}
	}

	public AnswerGetResponse GetAnswer(int answerId)
	{
		using (var connection = new SqlConnection(m_connectionString))
		{
			connection.Open();
			return connection.QueryFirstOrDefault<AnswerGetResponse>(@"EXEC Answer_Get_ByAnswerId @AnswerId = @AnswerId", new { AnswerId = answerId });
		}
	}

	public QuestionGetSingleResponse GetQuestion(int questionId)
	{
		using (var connection = new SqlConnection(m_connectionString))
		{
			connection.Open();
			var question = connection.QueryFirstOrDefault<QuestionGetSingleResponse>(@"EXEC Question_GetSingle @QuestionId = @QuestionId", new { QuestionId = questionId });
			if (question != null)
				question.Answers = connection.Query<AnswerGetResponse>(@"EXEC Answer_Get_ByQuestionId @QuestionId = @QuestionId", new { QuestionId = questionId });
			return question;
		}
	}

	public IEnumerable<QuestionGetManyResponse> GetQuestions()
	{
		using (var connection = new SqlConnection(m_connectionString))
		{
			connection.Open();
			return connection.Query<QuestionGetManyResponse>(@"EXEC Question_GetMany");
		}
	}

	public IEnumerable<QuestionGetManyResponse> GetQuestionsBySearch(string search)
	{
		using (var connection = new SqlConnection(m_connectionString))
		{
			connection.Open();
			return connection.Query<QuestionGetManyResponse>(@"EXEC Question_GetMany_BySearch @Search = @Search", new { Search = search });
		}
	}

	public IEnumerable<QuestionGetManyResponse> GetUnansweredQuestions()
	{
		using (var connection = new SqlConnection(m_connectionString))
		{
			connection.Open();
			return connection.Query<QuestionGetManyResponse>(
			"EXEC Question_GetUnanswered"
			);
		}
	}

	public AnswerGetResponse PostAnswer(AnswerPostRequest answer)
	{
		using (var connection = new SqlConnection(m_connectionString))
		{
			connection.Open();
			return connection.QueryFirst<AnswerGetResponse>(@"EXEC Answer_Post @QuestionId = @QuestionId, @Content = @Content, @UserId = @UserId, @UserName = @UserName, @Created = @Created", answer);
		}
	}

	public QuestionGetSingleResponse PostQuestion(QuestionPostRequest question)
	{
		using (var connection = new SqlConnection(m_connectionString))
		{
			connection.Open();
			var questionId = connection.QueryFirst<int>(@"EXEC Question_Post @Title = @Title, @Content = @Content, @UserId = @UserId, @UserName = @UserName, @Created = @Created", question);
			return GetQuestion(questionId);
		}
	}

	public QuestionGetSingleResponse PutQuestion(int questionId, QuestionPutRequest question)
	{
		using (var connection = new SqlConnection(m_connectionString))
		{
			connection.Open();
			connection.Execute(@"EXEC Question_Put @QuestionId = @QuestionId, @Title = @Title, @Content = @Content", new { QuestionId = questionId, question.Title, question.Content });
			return GetQuestion(questionId);
		}
	}

	public bool QuestionExists(int questionId)
	{
		using (var connection = new SqlConnection(m_connectionString))
		{
			connection.Open();
			return connection.QueryFirst<bool>(@"EXEC Question_Exists @QuestionId = @QuestionId", new { QuestionId = questionId });
		}
	}
}