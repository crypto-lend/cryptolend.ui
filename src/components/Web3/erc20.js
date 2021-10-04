//here we export the tokens as constant with 
//their address & their symbols,these further can be called by their adresses or symbols for use

export const supported_erc20_token = [
    {
        name: "Marijuana Infused Product.",
        symbol: "MIP",
        address: "0xaaeEbD331B94dD269c085cCB22F7643e6f70dde9"
    },
//     {
//         name: "Butane Hash Oil",
//         symbol: "BHO",
//         address: "0x4f398Fc2c31feF69981A37db76a8C3BE91d2357b"
//     },
//     {
//         name: "Medical Marijuana",
//         symbol: "MMJ",
//         address: "0x9b6F41673154f21f7cA0f23b56Ca2f74273cB90A"
//     },
//     {
//         name: "Tetrahydrocannabinol",
//         symbol: "THC",
//         address: "0xeA426bA6FE3fE260fBaf837c259EA56866125144"
//     },
//     {
//         name: "Recreational Cannabis",
//         symbol: "REC",
//         address: "0xd043Ca951A95466de0371eea7A7376528c843AFb"
//     },
//     {
//         name: "Cannabinoid",
//         symbol: "CBD",
//         address: "0xbAd69980892208C349e7EF0eF3C69D83C6Dfd960"
//     },
//     {
//         name: "WeenusToken",
//         symbol: "WEENUS",
//         address: "0xaFF4481D10270F50f203E0763e2597776068CBc5"
//     },
//     {
//         name: "XeenusToken",
//         symbol: "XEENUS",
//         address: "0x022E292b44B5a146F2e8ee36Ff44D3dd863C915c"
//     }
 ]

 // to get the token by its unique address
export const getTokenByAddress = {
  "0xaaeEbD331B94dD269c085cCB22F7643e6f70dde9": {
      name: "Marijuana Infused Product.",
      symbol: "MIP"
  } 
};

// to get the token by its unique symbol
export const getTokenBySymbol = {

  "MIP": {
      name: "Marijuana Infused Product.",
      address: "0xaaeEbD331B94dD269c085cCB22F7643e6f70dde9" 
   }
}
