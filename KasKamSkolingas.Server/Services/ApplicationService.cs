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

            return new { users, debts = GetGroupDebts(groupName, userId) };
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
                .Where(d => d.From.Id == userId || d.To.Id == userId)
                .Where(d => d.IsDebtPaid == false);

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
        public bool DeleteDebt(string userId, long debtId)
        {
            var user = _dbContext.ApplicationUsers
                .SingleOrDefault(u => u.Id == userId);
            var debt = _dbContext.Debts
                .Include(d => d.To)
                .SingleOrDefault(d => d.Id == debtId);

            if (user == null || debt == null)
            {
                return false;
            }

            if (debt.To.Id != user.Id)
            {
                return false;
            }

            _dbContext.Debts.Remove(debt);
            _dbContext.SaveChanges();

            return true;
        }
        public object GetGroupDebts(string groupName, string userId)
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
                .SingleOrDefault(ag => ag.GroupId == group.Id &&
                                       ag.ApplicationUserId == userId);

            if (applicationUserGroup == null)
            {
                return null;
            }

            var groupDebts = _dbContext.Debts
                .Include(d => d.From)
                .Include(d => d.To)
                .Where(d => d.Group.Id == group.Id &&
                            d.IsDebtPaid == false);

            IList<object> result = new List<object>();

            foreach (var groupDebt in groupDebts)
            {
                var debt = new
                {
                    id = groupDebt.Id,
                    dateCreated = groupDebt.DateCreated,
                    userFrom = groupDebt.From.UserName,
                    userTo = groupDebt.To.UserName,
                    group = groupDebt.Group.Name,
                    amount = groupDebt.Amount,
                    whatFor = groupDebt.Description
                };

                result.Add(debt);
            }

            return result;
        }
        public bool EndDebt(string userId, long debtId)
        {
            var user = _dbContext.ApplicationUsers
                .SingleOrDefault(u => u.Id == userId);
            var debt = _dbContext.Debts
                .Include(d => d.To)
                .SingleOrDefault(d => d.Id == debtId);

            if (user == null || debt == null)
            {
                return false;
            }

            if (debt.To.Id != user.Id)
            {
                return false;
            }

            debt.IsDebtPaid = true;
            _dbContext.SaveChanges();

            return true;
        }
        public bool LeaveGroup(string userId, string groupName)
        {
            var user = _dbContext.ApplicationUsers
                .SingleOrDefault(a => a.Id == userId);
            var group = _dbContext.Groups
                .SingleOrDefault(g => g.Name == groupName);

            if (user == null || group == null)
            {
                return false;
            }

            var userGroupDebts = _dbContext.Debts
                .Where(g => g.Group == group)
                .SingleOrDefault(g => g.From.Id == userId || g.To.Id == userId);

            if (userGroupDebts != null)
            {
                return false;
            }

            var applicationUserGroupToRemove = _dbContext.ApplicationUserGroups
                .SingleOrDefault(ag => ag.ApplicationUserId == userId &&
                                       ag.GroupId == group.Id);

            _dbContext.ApplicationUserGroups.Remove(applicationUserGroupToRemove);
            _dbContext.SaveChanges();

            return true;
        }
        public object GetUserStatistics(string userId)
        {
            var user = _dbContext.ApplicationUsers
                .SingleOrDefault(u => u.Id == userId);

            if (user == null)
            {
                return null;
            }

            var debtFrom = _dbContext.Debts
                .Where(d => d.From.Id == userId)
                .Select(d => d.Amount);
            var debtTo = _dbContext.Debts
                .Where(d => d.To.Id == userId)
                .Select(d => d.Amount);

            decimal overallDebtFrom = 0M;
            decimal overallDebtTo = 0M;

            foreach (var debtAmount in debtFrom)
            {
                overallDebtFrom += debtAmount;
            }

            foreach (var debtAmount in debtTo)
            {
                overallDebtTo += debtAmount;
            }

            return new
            {
                overallBalance = overallDebtTo - overallDebtFrom,
                inDebt = overallDebtFrom,
                debtTo = overallDebtTo
            };
        }
        public object GetHomePageData(string userId)
        {
            var user = _dbContext.ApplicationUsers
                .SingleOrDefault(u => u.Id == userId);

            if (user == null)
            {
                return null;
            }

            var userGroups = _dbContext.ApplicationUserGroups
                .Where(ag => ag.ApplicationUserId == userId)
                .Select(ag => ag.Group);

            var result = new List<object>();

            foreach (var group in userGroups)
            {
                var groupData = GetHomePageGroupData(user, group);
                result.Add(groupData);
            }

            return new
            {
                groups = result
            };
        }
        public object GetHomePageGroupData(ApplicationUser user, Group group)
        {
            // TODO: This should be implemented better, the view string is needed for the client side, the default value is "default"
            const string view = "default";
            var name = group.Name;

            var inDebt = _dbContext.Debts
                .Where(d => d.Group.Id == group.Id)
                .Where(d => d.From.Id == user.Id)
                .Select(d => d.Amount)
                .Sum();

            var debtTo = _dbContext.Debts
                .Where(d => d.Group.Id == group.Id)
                .Where(d => d.To.Id == user.Id)
                .Select(d => d.Amount)
                .Sum();

            var allGroupDebts = _dbContext.Debts
                .Include(d => d.From)
                .Include(d => d.To)
                .Where(d => d.Group.Id == group.Id);

            var debts = new List<object>();
            foreach (var debt in allGroupDebts)
            {
                var debtToAdd = new
                {
                    userInDebt = debt.From.UserName,
                    userDebtTo = debt.To.UserName,
                    whatFor = debt.Description,
                    amount = debt.Amount
                };

                debts.Add(debtToAdd);
            }

            return new
            {
                view,
                name,
                inDebt,
                debtTo,
                debts
            };
        }
    }
}
