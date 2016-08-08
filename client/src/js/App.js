import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { grey400, grey50 } from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import algoliasearch from 'algoliasearch';
import AlgoliaInput from './AlgoliaInput.js';
import Product from './Product.js';
injectTapEventPlugin();

const algoliaClient = algoliasearch('X0AEHLCYM5', 'f2c4d187230ed2f463930a3abf90f41e');

export default class App extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      hits: []
    };
  }
 onError = () => {
   console.log('onError', arguments);
 }
 onResults = (content) => {
   this.setState({
     hits: content.hits
   });
 }
 onEmptyField = () => {
   this.setState({
     hits: [],
     autocomplete: []
   });
 }

 renderResult(hit) {
    return (<Product
              key={ hit.objectID }
              image={hit.image}
              name={hit.name.slice(0,74)}
              description={hit.description}
              price={hit.price}
           />);
  }


  render() {
      return (
        <div>
          <AppBar
            title="Algolia Product Search"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            style={{ position:'fixed' }}
          >
            <AlgoliaInput
              placeholder="Product search..."
              client={ algoliaClient }
              options={ { hitsPerPage: 30 } }
              index='bestbuy'
              onResults={ this.onResults }
              onEmptyField={ this.onEmptyField }
              onError={ this.onError }
            />
          </AppBar>
          <div className="container">
          { this.state.hits.map(this.renderResult) }
          </div>
        </div>
      )
  }
}
