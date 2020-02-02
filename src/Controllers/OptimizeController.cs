using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;


namespace Coin
{
    [ApiController]
    [Route("[controller]")]
    public class OptimizeController : ControllerBase
    {
        private readonly ILogger<OptimizeController> _logger;
        private readonly ICoinOptimizeProvider _provider;
        
        public OptimizeController(ICoinOptimizeProvider provider, ILogger<OptimizeController> logger)
        {
            _logger = logger;
            _provider = provider;
        }

        [HttpPost]
        public JsonResult Post([FromForm] ulong totalAmount)
        {
            _logger.LogDebug(0, $"Receieved total amount: {totalAmount}");

            var coins = _provider.CountCoins(totalAmount);
            return new JsonResult(coins);
        }
    }
}