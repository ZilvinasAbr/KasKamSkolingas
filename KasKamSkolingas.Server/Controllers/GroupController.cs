﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
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
    }
}