﻿using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using KasKamSkolingas.Server.Models;
using KasKamSkolingas.Server.Models.ViewModels;
using KasKamSkolingas.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace KasKamSkolingas.Server.Controllers
{
    [Route("api/account/")]
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IApplicationService _applicationService;

        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IApplicationService applicationService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _applicationService = applicationService;
        }

        [HttpPost("register")]
        /*[AllowAnonymous]
        [ValidateAntiForgeryToken]*/
        public async Task<bool> Register([FromBody] RegisterViewModel model)
        {
            if (model.Password != model.ConfirmPassword)
            {
                return false;
            }

            var user = new ApplicationUser { UserName = model.UserName };
            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, isPersistent: false);
                return true;
            }

            return false;
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<bool> RegisterAccount(RegisterViewModel model)
        {
            if (model.Password != model.ConfirmPassword)
            {
                return false;
            }

            var user = new ApplicationUser { UserName = model.UserName };
            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, isPersistent: false);
                return true;
            }

            return false;
        }

        [HttpPost("login")]
        /*[AllowAnonymous]
        [ValidateAntiForgeryToken]*/
        public async Task<bool> Login([FromBody] LoginViewModel model)
        {
            var result = await _signInManager.PasswordSignInAsync(model.UserName, model.Password, true, lockoutOnFailure: false);
            if (result.Succeeded)
            {
                return true;
            }
            if (result.IsLockedOut)
            {
                return false;
            }

            return false;
        }

        [HttpPost("logoff")]
        /*[AllowAnonymous]
        [ValidateAntiForgeryToken]*/
        public async Task<bool> LogOff()
        {
            await _signInManager.SignOutAsync();
            return true;
        }

        [HttpGet("issignedin")]
        public bool IsSignedIn()
        {
            if (_signInManager.IsSignedIn(User))
            {
                return true;
            }

            return false;
        }

        [HttpGet("homepagedata")]
        public object GetHomePageData()
        {
            if (_signInManager.IsSignedIn(User))
            {
                var userId = HttpContext.User.GetUserId();

                return _applicationService.GetHomePageData(userId);
            }

            return false;
            
        }

        [HttpGet("getuserdata")]
        public object GetUserData()
        {
            var userId = HttpContext.User.GetUserId();

            if (userId == null)
            {
                return null;
            }

            var result = _applicationService.GetUserData(userId);

            return result;
        }

        [HttpGet("findusers")]
        public IEnumerable<string> FindUsernames(string searchTerm)
        {
            var userId = HttpContext.User.GetUserId();
            if (userId == null)
            {
                return null;
            }

            var result = _applicationService.FindUsernames(searchTerm);

            return result;
        }

        [HttpGet("getuserstatistics")]
        public object GetUserStatistics()
        {
            if (_signInManager.IsSignedIn(User))
            {
                var userId = User.GetUserId();

                var result = _applicationService.GetUserStatistics(userId);

                return result;
            }

            return null;
        }

    }
}
