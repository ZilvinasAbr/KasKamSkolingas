using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;

namespace KasKamSkolingas.Server.Models
{
    public class Group
    {
        public Group()
        {
            Debts = new Collection<Debt>();
            ApplicationUserGroups = new List<ApplicationUserGroup>();
        }

        public ICollection<Debt> Debts { get; set; }

        public IList<ApplicationUserGroup> ApplicationUserGroups { get; set; }

        public long Id { get; set; }
        public string Name { get; set; }

    }
}
