using System;
using System.Diagnostics.CodeAnalysis;

namespace Coin
{
    public class Coin 
    {    
        public Coin(string name, ushort units) 
        {
            this.Name = name;
            this.Units = units;
        }

        public string Name { get; private set; }
        
        public ushort Units { get; private set; }

        public ulong Quantity { get; set; }
    }
}