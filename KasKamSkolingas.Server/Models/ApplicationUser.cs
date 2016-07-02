using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace KasKamSkolingas.Server.Models
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser()
        {
            ApplicationUserGroups = new List<ApplicationUserGroup>();
        }

        public IList<ApplicationUserGroup> ApplicationUserGroups { get; set; }
    }
}
