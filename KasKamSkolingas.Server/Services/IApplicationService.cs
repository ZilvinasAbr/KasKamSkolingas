using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KasKamSkolingas.Server.Services
{
    public interface IApplicationService
    {
        bool CreateGroup(string userId, string groupName);
    }
}
