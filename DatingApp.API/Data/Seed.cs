using System.Collections.Generic;
using DatingApp.API.Models;
using Newtonsoft.Json;

namespace DatingApp.API.Data {
    public class Seed {
        private readonly DataContext _ctx;
        public Seed (DataContext ctx) {
            this._ctx = ctx;
        }

        public void SeedUsers () {
            // delete exsistig users
            _ctx.Users.RemoveRange (_ctx.Users);
            _ctx.SaveChanges ();

            // seed the users
            var userData = System.IO.File.ReadAllText ("Data/UserSeedData.json");
            var users = JsonConvert.DeserializeObject<List<User>> (userData);
            foreach (var user in users) {
                // create the password hash
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash ("password", out passwordHash, out passwordSalt);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
                user.Username = user.Username.ToLower();
                
                _ctx.Users.Add(user);
            }
            _ctx.SaveChanges();
        }

        private void CreatePasswordHash (string password, out byte[] passwordHash, out byte[] passwordSalt) {
            using (var hmac = new System.Security.Cryptography.HMACSHA512 ()) {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash (System.Text.Encoding.UTF8.GetBytes (password));
            }
        }
    }
}