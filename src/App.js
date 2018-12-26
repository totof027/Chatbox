import React, { Component, createRef } from 'react'
import './App.css'
import './animations.css'
import Message from './components/Message'
import Formulaire from './components/Formulaire'
// plugin raccourci react - Javascript standardjs styled snippets

//firebase
import base from './base'


// Animation
import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group'
class App extends Component { // Ici le contenu de notre ChatBox comprenant les messages et le formulaire.

  state = {
    messages : {},
    pseudo : this.props.match.params.pseudo
  }

  messageRef = createRef() // on crée la ref ici

  componentDidMount (){ // effectue une action au moment ou l'application se charge.
    base.syncState('/',{
      context: this,
      state: 'messages'
    })
  }
  // Pour gerer la hauteur du scroll à l'arrivé d'un nouveau msg.
  componentDidUpdate(){ 
    const ref = this.messageRef.current // grace a current on accede à n'importe quelle propriété .
    ref.scrollTop = ref.scrollHeight
  }


  addMessage = message =>{  // message est recuperé depuis le formulaire.
    const messages = {...this.state.messages}
    messages[`message-${Date.now()}`] = message  // on utilise un timestamps afin que le message soit toujours unique.

    Object.keys(messages).slice(0,-10).forEach(key=>{ // là, on boucle les messages pour garder les 10 derniers.
      messages[key] = null
    })
    this.setState({ messages })
  }
 // Pour savoir si l'utilisateur de la page est l'auteur du msg
  isUser = pseudo => pseudo === this.state.pseudo
  render () {
    const mess = Object.keys(this.state.messages).map(key => (
    <CSSTransition
        key={key}
        classNames = 'cool'>
        <Message
          
          isUser={this.isUser}
          message={this.state.messages[key].message} // On defini la ref ici.
          pseudo={this.state.messages[key].pseudo}
        />
    </CSSTransition>
      
    ))
    
    return (
      <div className='box'>
        <div>
            <div className="messages" ref={this.messageRef}>
              <TransitionGroup className="message">
                { mess }
            </TransitionGroup>
            </div>
        </div>
          <Formulaire 
          length={140}
          addMessage={this.addMessage}
          pseudo={this.state.pseudo}/>
        </div>
    )
  }
}

export default App
