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
            Users = new Collection<ApplicationUser>();
        }

        public ICollection<Debt> Debts { get; set; }
        public ICollection<ApplicationUser> Users { get; set; }

        public long Id { get; set; }
        public string Name { get; set; }

    }
}
