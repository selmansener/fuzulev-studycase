using FuzulEv.API.Area.API.Controllers.Base;
using FuzulEv.API.Auth;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FuzulEv.API.Area.API.Controllers
{
    public class UsersController : BaseController
    {
        [HttpGet("Query")]
        [Authorize(Permissions.ReadUsers)]
        public async Task<IActionResult> Query()
        {
            await Task.CompletedTask;

            return Ok();
        }

        [HttpPost("Update")]
        [Authorize(Permissions.ManageUsers)]
        public async Task<IActionResult> UpdateUser()
        {
            return Ok();
        }

        [HttpPost("UpdateTimestamp")]
        public async Task<IActionResult> UpdateTimestamp()
        {

            return Ok();
        }

        [HttpPost("VideoSavepoint")]
        [Authorize(Permissions.ReadPlaylists)]
        public async Task<IActionResult> VideoSavepoint()
        {
            return Ok();
        }
    }
}
