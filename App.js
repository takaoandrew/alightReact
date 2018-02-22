import React, { Component } from 'react';
import { Image, AppRegistry, StyleSheet, Text, View } from 'react-native';
// import * as api from './app/functions/api';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBtpn1VYbjjdwxVjybeyZ0uTJ6RwLlmrlk",
    authDomain: "alight-5214e.firebaseapp.com",
    databaseURL: "https://alight-5214e.firebaseio.com",
    projectId: "alight-5214e",
    storageBucket: "alight-5214e.appspot.com",
    messagingSenderId: "741583361490"
  };

firebase.initializeApp(config);
const database = firebase.database();

function getData (path, callback) {
    database.ref(path).once('value')
        .then(function(snapshot) {
          const exists = (snapshot.val() !== null) ;
          if (exists) route = snapshot.val();
          const data = {exists, route}
          callback(true, data, null);
        })
        .catch((error) => callback(false, null, {message: error}));
}

class Greeting extends Component {
  render() {
    return (
      <Text>Hello {this.props.name}!</Text>
    );
  }
}

class RouteRow extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <Text>Test</Text>
  }
}

class RouteList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      length: 0,
      data: ""
    }
    getData("test", function (success, data, error) {
      var length;
      if (success) {
        console.log("Length is");
        console.log(data);
        console.log("and that's it");
        // length = 1;
        length = Object.keys(data.route).length;
      } else {
        console.log("failure");
        length = 0;
      }
      this.setState({length, data:data.route})
    }.bind(this));
  }
  renderRouteRow(i) {
    return(<RouteRow></RouteRow>)
  }
  render() {
    console.log("render()");
    console.log(this.state.length);
    let routeRows = [];
    for (var i=0; i<this.state.length; i++) {
      console.log("i is " + i);
      routeRows.push(this.renderRouteRow(i))
    }
    return (
      <View>
        {routeRows}
        <Text>{this.state.length}</Text>
      </View>
    )
  }
}

class ColorChanger extends Component {
  constructor(props) {
    super(props);
    this.state = {isGreen: true};

  }

  render() {
    getData("test/direction", function (success, data, error) {
      if (success) {
        console.log(data);
      }
    })
    let style = this.state.isGreen ? styles.biggreen : styles.blue;
    return (
      <Text style = {style}>Hello Bud</Text>
    )
  }
}

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <RouteList/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  biggreen: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 20
  },
  blue: {
    color: 'blue'
  },

});
