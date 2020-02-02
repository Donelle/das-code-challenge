using System;
using System.Collections.Generic;

namespace Coin 
{
    public interface ICoinOptimizeProvider
    {
        IList<Coin> CountCoins(ulong amount);
    }

    internal class CoinOptimizeProvider : ICoinOptimizeProvider
    {
        private readonly Coin [] _coins;

        public CoinOptimizeProvider ()
        {
            _coins = new [] {
                new Coin("SilverDollar", 100) ,
                new Coin("HalfDollar", 50) ,
                new Coin("Quarter", 25),
                new Coin("Dime", 10),
                new Coin("Nickle", 5),
                new Coin("Penny", 1)
            };
        }

        public IList<Coin> CountCoins(ulong totalAmount)
        {
            var list = new List<Coin>();
            if (totalAmount > 0) 
            {
                for(int i=0; i < _coins.Length; i++) 
                {
                    var coin = _coins[i];
                    coin.Quantity = Convert.ToUInt64(Math.Floor(totalAmount / (double)coin.Units));
                    if (coin.Quantity > 0) 
                    {
                        totalAmount -= coin.Quantity * coin.Units;
                        list.Add(coin);
                    }
                }
            }

            return list.ToArray();
        }
    }

}