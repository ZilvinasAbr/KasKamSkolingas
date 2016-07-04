﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KasKamSkolingas.Server.Services
{
    public interface IApplicationService
    {
        bool CreateGroup(string userId, string groupName);
        IEnumerable<string> GetUserGroups(string userId);
        object GetUserData(string userId);
        IEnumerable<string> FindUsernames(string searchTerm);
        bool AddUserToGroup(string userId, string groupName, string usernameToAdd);
        object GetGroupData(string userId, string groupName);
        bool CreateDebt(string groupName, string usernameFrom, string userIdTo, decimal amount, string whatFor);
        object GetUserDebts(string userId);
    }
}
