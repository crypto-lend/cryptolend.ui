//here we export the tokens as constant with
//their address & their symbols,these further can be called by their adresses or symbols for use

export const supported_erc20_token = [
    {
        name: "Matic Token",
        symbol: "MATIC",
        address: "0x4092d0Bb7eA9b783D6976c3aD78F896E9afFA1B9"
    }
 ];

 // to get the token by its unique address
export const getTokenByAddress = {
  "0x4092d0Bb7eA9b783D6976c3aD78F896E9afFA1B9": {
      name: "Matic Token",
      symbol: "MATIC"
  }
};

// to get the token by its unique symbol
export const getTokenBySymbol = {

  "MATIC": {
      name: "Matic Token",
      address: "0x4092d0Bb7eA9b783D6976c3aD78F896E9afFA1B9"
   }
};
