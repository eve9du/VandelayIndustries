
import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Data from './Data/Data';


class App extends Component {
  state = {
    posts:[],
    countries:[],
    postsToShow:[]
  }
  componentDidMount = () =>{
    axios.get("https://my.api.mockaroo.com/eliza.json?key=e6ac1da0")
      .then(response=>{
        const countries=[]
        const posts = response.data.map(post => {
          if(!countries.includes(post.import_country)){
            countries.push(post.import_country)
            countries.sort()
      }
    });
    this.setState({posts: response.data, countries:countries})
      });
  }
  handleCountryClick= (country) => {
    let toShow = []
    const countryData= this.state.posts.map(post => {
      if(post.import_country==country){
        toShow.push(post)
        this.setState({postsToShow:toShow})
      }
    })
  }
   compare = (a,b) =>{
    if (a.number > b.number)
      return -1;
    if (a.number < b.number)
      return 1;
    return 0;
  }
  render() {
    let data=[];
    for(let i=0; i<this.state.countries.length; i++){
      let count = 0
      for(let j=0; j<this.state.posts.length; j++){
      if(this.state.posts[j].import_country == this.state.countries[i]){
        count++
      }
    }
    data.push({number: count, country:this.state.countries[i]})
    }
    data.sort(this.compare)
  const countriesList = data.map(country => {
  const color= "rgba("+0+","+0+","+255+","+country.number/data[0].number +")"
  return(
  <p className="Individual" tabindex="1" style={{backgroundColor:color}} onClick={()=>this.handleCountryClick(country.country)}>{country.country} </p>
);
});
  
  let infoToShow = <p className="clickInfo">Click on any country to view car details!</p>;
  if(this.state.postsToShow.length > 0){
    infoToShow = this.state.postsToShow.map(post=>{
      return(<Data model={post.model} make={post.make} sold={post.sold_by} price={post.sale_price}/>)
  })
  }
  return (
    <div className="App">
      <div className= "Information">
        <h1>Vandelay Industries Data</h1>
        <h5>Below we have listed all countries with at least one car to import. These are sorted by gradient; the darker the shade of the country, the more available cars to import. </h5>
        <div className="gradient">
          <div className="eachColor"style={{backgroundColor:"rgba(0,0,255,1)"}}> &nbsp; </div>
          <div className="eachColor"style={{backgroundColor:"rgba(0,0,255,0.9)"}}> &nbsp;</div>
          <div className="eachColor"style={{backgroundColor:"rgba(0,0,255,0.8)"}}> &nbsp;</div>
          <div className="eachColor"style={{backgroundColor:"rgba(0,0,255,0.7)"}}> &nbsp;</div>
          <div className="eachColor"style={{backgroundColor:"rgba(0,0,255,0.6)"}}>&nbsp;</div>
          <div className="eachColor"style={{backgroundColor:"rgba(0,0,255,0.5)"}}> &nbsp;</div>
          <div className="eachColor"style={{backgroundColor:"rgba(0,0,255,0.4)"}}>&nbsp;</div>
          <div className="eachColor"style={{backgroundColor:"rgba(0,0,255,0.3)"}}> &nbsp;</div>
          <div className="eachColor"style={{backgroundColor:"rgba(0,0,255,0.2)"}}>&nbsp; </div>
          <div className="eachColor"style={{backgroundColor:"rgba(0,0,255,0.1)"}}>&nbsp;</div>
        </div>
      </div>
      <div className="Countries" >
        {countriesList}
      </div>
      <div className="Data">
        {infoToShow}
      </div>
    </div>
    );
  }
}
export default App;
