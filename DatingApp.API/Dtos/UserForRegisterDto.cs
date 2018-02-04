using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        [StringLength(15, MinimumLength = 5)]
        public string Username { get; set; }
        [Required]
        [StringLength(15, MinimumLength = 5, ErrorMessage = "You must specify a password between 5 and 15 characters")]
        public string Password { get; set; }
    }
}