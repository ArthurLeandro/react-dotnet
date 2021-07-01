using System.ComponentModel.DataAnnotations;

public class QuestionPostRequest
{
	[Required]
	[StringLength(100)]
	public string Title { get; set; }
	[Required(ErrorMessage = "Please include some content for this question")]
	public string Content { get; set; }
	public string UserId { get; set; }
	public string UserName { get; set; }
	public System.DateTime Created { get; set; }
}