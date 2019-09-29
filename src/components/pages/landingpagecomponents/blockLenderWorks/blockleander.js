import React from 'react'

 const BlockLender=()=> {
    return (
        <div className="position-relative">
                
                        <div className="row">
                            <div className="col-sm">
                                    <div style={{textAlign:"center"}} className="card-header bg-transparent" >
                                        <h4 className="text-uppercase ls-1 text-primary py-3 mb-0">Why Blocklender </h4>
                                    </div>
                            </div>
                        </div>


                        <div className="card-deck">
                            <div className="card">
                                <img className="card-img-top" src="https://demos.creative-tim.com/argon-dashboard-pro/assets/img/theme/img-1-1000x600.jpg" alt="Card image cap" /> 
                                <div className="card-body">
                                    <h5 style={{textAlign:"center"}} className="card-title">Decentralised P2P Lending</h5>
                                    <p className="card-text">Take control of your finacne with your own lending & borrowing rates and terms in our global crypto lending marcketplace. Accesible to anyone in the world </p>
                                    
                                </div>
                            </div>
                            <div className="card">
                                <img className="card-img-top" src="https://demos.creative-tim.com/argon-dashboard-pro/assets/img/theme/img-1-1000x600.jpg" alt="Card image cap" /> 
                                <div className="card-body">
                                    <h5 style={{textAlign:"center"}} className="card-title">Instant Cash Loans</h5>
                                    <p className="card-text">Spend your money straight away with the baclender card or withdraw to your back account. For 8% APR on what you use. </p>

                                </div>
                            </div>
                            <div className="card">
                                <img className="card-img-top" src="https://demos.creative-tim.com/argon-dashboard-pro/assets/img/theme/img-1-1000x600.jpg" alt="Card image cap" /> 
                                <div className="card-body">
                                    <h5  style={{textAlign:"center"}}className="card-title">Insured custodial wallets</h5>
                                    <p className="card-text">Keep your crypto safe with our secure custodial wallets, insured with leading insurer Lloyds of London for upto $100 million USD </p>

                                </div>
                            </div>
                        </div>
                
        </div>
    )
}


export default BlockLender;