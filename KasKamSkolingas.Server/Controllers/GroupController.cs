using System.Collections.Generic;
using System.Security.Claims;
using KasKamSkolingas.Server.Models;
using KasKamSkolingas.Server.Models.ViewModels;
using KasKamSkolingas.Server.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace KasKamSkolingas.Server.Controllers
{
    [Route("api/group/")]
    public class GroupController : Controller
    {
        private readonly IApplicationService _applicationService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public GroupController(IApplicationService applicationService,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _applicationService = applicationService;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("create")]
        public bool CreateGroup([FromBody] CreateGroupViewModel model)
        {
            if (_signInManager.IsSignedIn(User))
            {
                var userId = HttpContext.User.GetUserId();
                bool result = _applicationService.CreateGroup(userId,
                    model.GroupName);

                return result;
            }

            return false;
        }

        [HttpPost("addtogroup")]
        public bool AddToGroup([FromBody] AddToGroupViewModel model)
        {
            if (_signInManager.IsSignedIn(User))
            {
                var userId = User.GetUserId();
                var result = _applicationService.AddUserToGroup(userId, model.GroupName, model.Username);

                return result;
            }

            return false;
        }

        [HttpPost("getgroupdata")]
        public object GetGroupData([FromBody] GetGroupDataViewModel model)
        {
            if (_signInManager.IsSignedIn(User))
            {
                var userId = User.GetUserId();
                var result = _applicationService.GetGroupData(userId, model.GroupName);

                return result;
            }

            return null;
        }

        [HttpPost("leave")]
        public bool LeaveGroup([FromBody] Group group)
        {
            if (_signInManager.IsSignedIn(User))
            {
                var userId = User.GetUserId();
                var result = _applicationService.LeaveGroup(userId, group.Name);

                return result;
            }

            return false;
        }

        // Probably not needed for now
        /*[HttpGet("usergroups")]
        public IEnumerable<string> GetUserGroups()
        {
            if (_signInManager.IsSignedIn(User))
            {
                var userId = User.GetUserId();
                var result = _applicationService.GetUserGroups(userId);

                return result;
            }

            return null;
        }*/
    }
}
