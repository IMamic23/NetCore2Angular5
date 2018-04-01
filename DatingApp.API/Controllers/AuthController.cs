using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using DatingApp.API.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API.Controllers {
    [AllowAnonymous]
    [Route ("api/auth")]
    public class AuthController : Controller {
        private readonly IAuthRepository _repo;
        public AuthController (IAuthRepository repo) {
            this._repo = repo;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserForRegisterDto userForRegisterDto) 
        {    
            if(!string.IsNullOrEmpty(userForRegisterDto.Username))
                userForRegisterDto.Username = userForRegisterDto.Username.ToLower();
            
            // validate req
            if (await _repo.UserExists(userForRegisterDto.Username))
                ModelState.AddModelError("Username", "Username already exists");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userToCreate = new User {
                Username = userForRegisterDto.Username
            };

            var createUser = await _repo.Register(userToCreate, userForRegisterDto.Password);

            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserForLoginDto userForLoginDto) {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var userFromRepo = await _repo.Login(userForLoginDto.Username, userForLoginDto.Password);

            if(userFromRepo == null)
                return Unauthorized();

            // generate token
            var tokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes(_repo.GetConfigurationValue("AppSettings:Token"));
            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity(new Claim[]{
                    new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                    new Claim(ClaimTypes.Name, userFromRepo.Username)
                }),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new AuthResponse {
                TokenString = tokenString
            });
        }
    }
}