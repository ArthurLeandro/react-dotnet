using System.ComponentModel.DataAnnotations;

public class AnswerPostRequest
{
	[Required]
	public int? QuestionId { get; set; }
	[Required]
	public string Content { get; set; }
	public string UserId { get; set; }
	public string UserName { get; set; }
	public System.DateTime Created { get; set; }
}