using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KasKamSkolingas.Server.Models.ViewModels
{
    public class CreateDebtViewModel
    {
        public string GroupName { get; set; }
        public string UsernameFrom { get; set; }
        public decimal Amount { get; set; }
        public string WhatFor { get; set; }
    }
}
