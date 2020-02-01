using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;


namespace Coin.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OptimizeController : ControllerBase
    {
        private readonly ILogger<OptimizeController> _logger;

        public OptimizeController(ILogger<OptimizeController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public Task<JsonResult> Index(int totalAmount)
        {
            var result = new JsonResult(new { SilverDollar = 0, HalfDollar = 0, Quarter = 0, Dime = 0, Nickle = 0, Penny = 0 });
            return Task.FromResult(result);
        }
    }
}