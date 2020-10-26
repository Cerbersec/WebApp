
    import React, { Component } from 'react'  
    import './Form.css'  
    export class Form extends Component {  
            constructor(props) {  
                    super(props)  
      
                    this.state = {  
                            Technology: '30',  
                            Kleur: 'Bruin'
      
                    }  
                    
            }

            
              
            Changetechnology = (e) => {  
                    this.setState({  
                            Technology: e.target.value  
                    })  
            }  
            
            Changekleur = (e) => {  
                this.setState({  
                        Kleur: e.target.value  
                })  
                } 
            onsubmit = (e) => {  
                    e.preventDefault();  
                    alert(`plaats deze schoenen\nin maat: ${this.state.Technology} \nen in kleur: ${this.state.Kleur} \nin uw winkelmandje?`)  
            }  
            
            render() {  
                    return (  
                            <div>  
                             <div >  
                                 
                                 </div>  
                                  <form onSubmit={this.onsubmit}>  
                                   <div >  
                                   <div >  
                                Kies uw maat  
                                </div>
                                    <select value={this.state.Technology} onChange={this.Changetechnology} >  
                                    <option>30</option>  
                                     <option>31</option>  
                                     <option>32</option> 
                                     <option>33</option> 
                                     <option>34</option> 
                                     <option>35</option> 
                                     
                                       </select>  
                                      </div> 
                                      <div >  
                                   <div >  
                                Kies uw kleur  
                                </div>
                                    <select value={this.state.Kleur} onChange={this.Changekleur} >  
                                    <option>Bruin</option>  
                                     <option>Zwart</option>  
                                     <option>Groen</option> 
                                     <option>Beige</option> 
                                     
                                     
                                       </select>  
                                      </div> 
                                    <br></br>  
                                    <div >  
                                Morgen in huis 
                                </div>
                                    <button type="submit" >In mijn winkel wagen</button>  
                                      
                                    </form>  
                                    
                            </div>  
                    )  
            }  
    }  
      
    export default Form  
