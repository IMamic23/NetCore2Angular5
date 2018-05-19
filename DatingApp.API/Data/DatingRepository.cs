using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data {
    public class DatingRepository : IDatingRepository {
        private readonly DataContext _ctx;
        public DatingRepository (DataContext ctx) {
            this._ctx = ctx;

        }

        public void Add<T> (T entity) where T : class {
            _ctx.Add(entity);
        }

        public void Delete<T> (T entity) where T : class {
            _ctx.Remove(entity);
        }

        public Task<Photo> GetMainPhoto(int userId)
        {
            return _ctx.Photos.FirstOrDefaultAsync(u => u.UserId == userId && u.IsMain);
        }

        public Task<Photo> GetPhoto(int id)
        {
            var photo = _ctx.Photos.FirstOrDefaultAsync(p => p.Id == id);
            return photo;
        }

        public async Task<User> GetUser (int id) {
            var user = await _ctx.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var users = _ctx.Users.Include(p => p.Photos).OrderByDescending(u => u.LastActive).AsQueryable();

            users = users.Where(u => u.Id != userParams.UserId);
            users = users.Where(u => u.Gender == userParams.Gender);

            if (userParams.MinAge != 18 || userParams.MaxAge != 99)
                users = users.Where(u => u.DateOfBirth.CalculateAge() >= userParams.MinAge
                    && u.DateOfBirth.CalculateAge() <= userParams.MaxAge);

            if (!string.IsNullOrEmpty(userParams.OrderBy)) 
            {
                switch (userParams.OrderBy) 
                {
                    case "created":
                        users = users.OrderByDescending(u => u.Created);
                        break;
                    default:
                        users = users.OrderByDescending(u => u.LastActive);
                        break;
                }
            }
            
            return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<bool> SaveAll() {
            return await _ctx.SaveChangesAsync() > 0;
        }
    }
}