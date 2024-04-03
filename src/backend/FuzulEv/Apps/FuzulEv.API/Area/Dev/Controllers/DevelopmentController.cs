using FuzulEv.API.Filters;
using FuzulEv.Business.Seed;
using FuzulEv.Business.Seed.Configuration;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FuzulEv.API.Area.Dev.Controllers
{
    [ApiController]
    [Area("dev")]
    [Route("[area]/v1/[controller]")]
    //[Authorize("Development")]
    [ApiKey]
    public class DevelopmentController : Controller
    {

        private readonly ISeeder _seeder;
        private readonly IHostEnvironment _hostEnvironment;

        public DevelopmentController(ISeeder seeder, IHostEnvironment hostEnvironment)
        {
            _seeder = seeder;
            _hostEnvironment = hostEnvironment;
        }

        [HttpPost("Seed")]
        public async Task<IActionResult> Seed(SeedServiceType seeds, CancellationToken cancellationToken, bool recreateDb = false)
        {
            //if (_hostEnvironment.IsProduction())
            //{
            //    return StatusCode(405);
            //}

            if (recreateDb)
            {
                _seeder.ClearExecutedServices();
            }

            await _seeder.Seed(seeds, cancellationToken);

            return NoContent();
        }

        [HttpPost("MigrateAsync")]
        public async Task<IActionResult> MigrateAsync(CancellationToken cancellation)
        {
            await _seeder.MigrateAsync(cancellation);

            return NoContent();
        }
    }
}
