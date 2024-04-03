using Microsoft.AspNetCore.Mvc;

namespace FuzulEv.API.Area.API.Controllers.Base
{
    [ApiController]
    [Area("api")]
    [Route("[area]/v1/[controller]")]
    public class BaseController : Controller
    {
    }
}
