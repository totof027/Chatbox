import React,{ Component} from 'react';
import  {Redirect} from 'react-router-dom'
class Connexion extends Component { // formulaire de connexion
    state = {
        pseudo: '',
        goToChat: false
    }

    handleChange = event =>{
        const pseudo = event.target.value
        this.setState({pseudo})
    }
    handleSubmit= event =>{
        event.preventDefault()
        this.setState({ goToChat : true})
    }
    render(){
        if(this.state.goToChat){ // retourne l'url personnel du pseudo tapé..
            return <Redirect push to={`/pseudo/${this.state.pseudo}`}></Redirect> // redirect prend en props "to"
        }
        return(
            <div className="connexionBox">
                <form className="connexion" onSubmit={this.handleSubmit}>
                    <input type="text" 
                    value={this.state.pseudo}
                    onChange={this.handleChange}
                    placeholder='pseudo' 
                    required/>
                    <button type="submit">GO</button>
                </form>
            </div>
        )
    }
}
export default Connexion