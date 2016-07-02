using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KasKamSkolingas.Server.Models
{
    public class ApplicationUserGroup
    {
        public string ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }

        public long GroupId { get; set; }
        public Group Group { get; set; }
    }
}
