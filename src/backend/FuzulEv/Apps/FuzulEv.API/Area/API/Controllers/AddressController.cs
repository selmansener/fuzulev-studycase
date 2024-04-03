using FuzulEv.API.Area.API.Controllers.Base;
using FuzulEv.Business.Utils.AddressDomain;
using FuzulEv.Business.Utils.AddressDomain.Models;

using Microsoft.AspNetCore.Mvc;

namespace FuzulEv.API.Area.API.Controllers
{
    public class AddressController : BaseController
    {
        private readonly IAddressService _addressService;

        public AddressController(IAddressService addressService)
        {
            _addressService = addressService;
        }

        [HttpGet("Cities")]
        [Produces<IEnumerable<City>>()]
        public async Task<IActionResult> GetCities()
        {
            return Ok(_addressService.GetCities());
        }

        [HttpGet("GetDistricts")]
        [Produces<IEnumerable<District>>()]
        public async Task<IActionResult> GetDistricts([FromQuery] string cityIds)
        {
            if (string.IsNullOrEmpty(cityIds))
            {
                return Ok(Array.Empty<District>());
            }

            return Ok(_addressService.GetDistricts(cityIds.Split(',')));
        }
    }
}
