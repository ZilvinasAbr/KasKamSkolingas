using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KasKamSkolingas.Server.Data;
using KasKamSkolingas.Server.Models;

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
    }
}
