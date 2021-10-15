//here we export the tokens as constant with
//their address & their symbols,these further can be called by their adresses or symbols for use

export const supported_erc20_token = [
    {
        name: "Matic Token",
        symbol: "MATIC",
        address: "0x70Bb12F4A179D816767aB4e8d24A914D573A2839"
    }
 ];

 // to get the token by its unique address
export const getTokenByAddress = {
  "0x70Bb12F4A179D816767aB4e8d24A914D573A2839": {
      name: "Matic Token",
      symbol: "MATIC"
  }
};

// to get the token by its unique symbol
export const getTokenBySymbol = {

  "MATIC": {
      name: "Matic Token",
      address: "0x70Bb12F4A179D816767aB4e8d24A914D573A2839"
   }
};
