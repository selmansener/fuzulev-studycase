using FuzulEv.API.Area.API.Controllers.Base;
using FuzulEv.Business.CQRS.RealEstateDomain.DTOs;
using FuzulEv.Business.CQRS.RealEstateDomain.Queries;
using FuzulEv.Business.DTOs;

using MediatR;

using Microsoft.AspNetCore.Mvc;

namespace FuzulEv.API.Area.API.Controllers
{
    public class RealEstateController : BaseController
    {
        private readonly IMediator _mediator;

        public RealEstateController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("Query")]
        [Produces<PaginationDTO<RealEstateDTO>>()]
        public async Task<IActionResult> BasicQuery([FromQuery] RealEstatesQuery realEstatesBasicQuery)
        {
            var result = await _mediator.Send(realEstatesBasicQuery);

            return Ok(result);
        }
    }
}
