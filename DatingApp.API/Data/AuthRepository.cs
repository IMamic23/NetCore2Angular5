using System;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Data {
    public class AuthRepository : IAuthRepository {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;
        public AuthRepository (DataContext context, IConfiguration configuration) {
            this._configuration = configuration;
            this._context = context;
        }

        public async Task<User> Login (string username, string password) {
            var user = await _context.Users
                .Include(p => p.Photos)
                .FirstOrDefaultAsync (x => x.Username == username);

            if (user == null)
                return null;

            if (!VerifyPasswordHash (password, user.PasswordHash, user.PasswordSalt))
                return null;

            // auth succesfull
            return user;
        }

        private bool VerifyPasswordHash (string password, byte[] passwordHash, byte[] passwordSalt) {
            using (var hmac = new System.Security.Cryptography.HMACSHA512 (passwordSalt)) {
                var computedHash = hmac.ComputeHash (System.Text.Encoding.UTF8.GetBytes (password));
                if (computedHash.SequenceEqual (passwordHash))
                    return true;

                return false;
            }
        }

        public async Task<User> Register (User user, string password) {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash (password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await _context.Users.AddAsync (user);
            await _context.SaveChangesAsync ();

            return user;
        }

        private void CreatePasswordHash (string password, out byte[] passwordHash, out byte[] passwordSalt) {
            using (var hmac = new System.Security.Cryptography.HMACSHA512 ()) {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash (System.Text.Encoding.UTF8.GetBytes (password));
            }
        }

        public async Task<bool> UserExists (string username) {
            if (await _context.Users.AnyAsync (x => x.Username == username))
                return true;

            return false;
        }

        public string GetConfigurationValue (string configKeyValuePair) {
            return _configuration.GetSection(configKeyValuePair).Value;
        }
    }
}