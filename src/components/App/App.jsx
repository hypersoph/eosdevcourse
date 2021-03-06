
import React, { Component } from 'react';
//Components
import { connect } from 'react-redux';
import { Game, Login } from 'components';

class App extends Component {

  render() {
    const { user: {name}} = this.props;

    // if there is a user name ie. logged in then display <Game/> otherwise display Login form
    return (
      <div className="App">
        { name && <Game/> } 
        { !name && <Login /> }
      </div>
    );
  }

}

const mapStateToProps = state => state;

// export a redux-connected react component
export default connect(mapStateToProps)(App);
