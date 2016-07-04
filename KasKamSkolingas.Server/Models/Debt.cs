using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KasKamSkolingas.Server.Models
{
    public class Debt
    {
        public long Id { get; set; }

        public DateTime DateCreated { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }

        public ApplicationUser From { get; set; }
        public ApplicationUser To { get; set; }
        public Group Group { get; set; }
    }
}
