using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KasKamSkolingas.Server.Data;
using KasKamSkolingas.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace KasKamSkolingas.Server.Services
{
    public class ApplicationService : IApplicationService
    {
        private readonly ApplicationDbContext _dbContext;

        public ApplicationService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public bool CreateGroup(string userId, string groupName)
        {
            var user = _dbContext.Users
                .SingleOrDefault(u => u.Id == userId);

            if (user == null)
            {
                return false;
            }

            Group group = new Group()
            {
                Name = groupName
            };

            ApplicationUserGroup applicationUserGroup = new ApplicationUserGroup()
            {
                ApplicationUser = user,
                Group = group
            };

            _dbContext.ApplicationUserGroups
                .Add(applicationUserGroup);
            _dbContext.SaveChanges();

            return true;
        }

        public IEnumerable<string> GetUserGroups(string userId)
        {
            var groupNames = _dbContext
                .ApplicationUserGroups
                .Where(ag => ag.ApplicationUserId == userId)
                .Select(ag => ag.Group.Name);

            return groupNames;
        }

        public object GetUserData(string userId)
        {
            var groupNames = GetUserGroups(userId);

            return new {groups = groupNames};
        }

        public IEnumerable<string> FindUsernames(string searchTerm)
        {
            List<string> mockDataList = new List<string>()
            {
                "Test1",
                "Test2",
                "Test3"
            };

            return mockDataList;
        }

        public bool AddUserToGroup(string userId, string groupName, string usernameToAdd)
        {
            var userToAdd = _dbContext.ApplicationUsers
                .SingleOrDefault(a => a.UserName == usernameToAdd);
            var group = _dbContext.Groups
                .SingleOrDefault(g => g.Name == groupName);
            var userThatIsAdding = _dbContext.ApplicationUsers
                .SingleOrDefault(a => a.Id == userId);

            if (userToAdd == null || group == null || userThatIsAdding == null || userToAdd.Id == userThatIsAdding.Id)
            {
                return false;
            }

            var applicationUserGroup = _dbContext.ApplicationUserGroups
                .SingleOrDefault(ag => ag.ApplicationUserId == userThatIsAdding.Id && ag.GroupId == group.Id);

            if (applicationUserGroup == null)
            {
                return false;
            }

            var newApplicationUserGroup = new ApplicationUserGroup()
            {
                ApplicationUser = userToAdd,
                Group = group
            };

            _dbContext.ApplicationUserGroups.Add(newApplicationUserGroup);
            _dbContext.SaveChanges();
            return true;
        }

        public object GetGroupData(string userId, string groupName)
        {
            var user = _dbContext.ApplicationUsers
                .SingleOrDefault(a => a.Id == userId);
            var group = _dbContext.Groups
                .SingleOrDefault(g => g.Name == groupName);

            if (user == null || group == null)
            {
                return null;
            }

            var applicationUserGroup = _dbContext.ApplicationUserGroups
                .SingleOrDefault(ag => ag.ApplicationUserId == user.Id &&
                ag.GroupId == group.Id);

            if (applicationUserGroup == null)
            {
                return null;
            }

            var users = _dbContext.ApplicationUserGroups
                .Where(ag => ag.GroupId == group.Id)
                .Select(ag => ag.ApplicationUser.UserName);

            return new { users};
        }

        public bool CreateDebt(DateTime dateCreated, string groupName, string usernameFrom, string userIdTo, decimal amount, string whatFor)
        {
            var group = _dbContext.Groups
                .SingleOrDefault(g => g.Name == groupName);
            var userFrom = _dbContext.ApplicationUsers
                .SingleOrDefault(u => u.UserName == usernameFrom);
            var userTo = _dbContext.ApplicationUsers
                .SingleOrDefault(u => u.Id == userIdTo);

            if (group == null || userFrom == null || userTo == null)
            {
                return false;
            }

            var applicationUserGroups = _dbContext.ApplicationUserGroups
                .Where(ag => ag.GroupId == group.Id)
                .Where(ag => ag.ApplicationUserId == userFrom.Id || ag.ApplicationUserId == userTo.Id);

            // Looks if both users belong to the group. This if clause also checks if both users are not the same user
            if (applicationUserGroups.Count() < 2)
            {
                return false;
            }

            Debt newDebt = new Debt()
            {
                DateCreated = dateCreated,
                Amount = amount,
                Description = whatFor,
                From = userFrom,
                Group = group,
                To = userTo
            };

            _dbContext.Debts.Add(newDebt);
            _dbContext.SaveChanges();

            return true;
        }

        public object GetUserDebts(string userId)
        {
            var user = _dbContext.ApplicationUsers
                .SingleOrDefault(u => u.Id == userId);

            if (user == null)
            {
                return null;
            }

            var debts = _dbContext.Debts
                .Include(d => d.From)
                .Include(d => d.To)
                .Include(d => d.Group)
                .Where(d => d.From.Id == userId || d.To.Id == userId);

            List<object> result = new List<object>();

            foreach (var debt in debts)
            {
                var newDebt = new
                {
                    id = debt.Id,
                    dateCreated = debt.DateCreated,
                    userFrom = debt.From.UserName,
                    userTo = debt.To.UserName,
                    group = debt.Group.Name,
                    amount = debt.Amount,
                    whatFor = debt.Description,
                    isUserInDebt = (debt.From.Id == userId)
                };

                result.Add(newDebt);
            }

            return result;
        }
    }
}
