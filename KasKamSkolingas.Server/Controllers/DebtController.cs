using System;
using System.Security.Claims;
using KasKamSkolingas.Server.Models;
using KasKamSkolingas.Server.Models.ViewModels;
using KasKamSkolingas.Server.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace KasKamSkolingas.Server.Controllers
{
    [Route("api/debt/")]
    public class DebtController : Controller
    {
        private readonly IApplicationService _applicationService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public DebtController(IApplicationService applicationService,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _applicationService = applicationService;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("create")]
        public bool CreateDebt([FromBody] CreateDebtViewModel model)
        {
            if (_signInManager.IsSignedIn(User))
            {
                var userIdTo = HttpContext.User.GetUserId();

                var result = _applicationService
                    .CreateDebt(DateTime.Now, model.GroupName, model.UsernameFrom,
                        userIdTo, model.Amount, model.WhatFor);

                return result;
            }

            return false;
        }

        [HttpGet("userdebts")]
        public object GetUserDebts()
        {
            if (_signInManager.IsSignedIn(User))
            {
                var userId = HttpContext.User.GetUserId();

                var result = _applicationService.GetUserDebts(userId);

                return result;
            }

            return null;
        }

        [HttpPost]
        public bool DeleteDebt([FromBody] Debt debt)
        {
            if (_signInManager.IsSignedIn(User))
            {
                var userId = User.GetUserId();

                var result = _applicationService.DeleteDebt(userId, debt.Id);

                return result;
            }

            return false;
        }

        [HttpPost("groupdebts")]
        public object GetGroupDebts([FromBody] Group group)
        {
            if (_signInManager.IsSignedIn(User))
            {
                var userId = User.GetUserId();

                var result = _applicationService.GetGroupDebts(group.Name, userId);
            }

            return null;
        }
    }
}
