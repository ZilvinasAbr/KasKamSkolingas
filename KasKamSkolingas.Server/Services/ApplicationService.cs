﻿using System;
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
    }
}
