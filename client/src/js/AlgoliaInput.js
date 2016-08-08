import React, { PropTypes, Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';

export default class AlgoliaInput extends Component {
  static propTypes = {
    client: PropTypes.object.isRequired,
    index: PropTypes.string.isRequired,
    options: PropTypes.object,
    onResults: PropTypes.func,
    onError: PropTypes.func,
    onEmptyField: PropTypes.func, // when user empty the field
    className: PropTypes.string,
    style: PropTypes.object,
    placeholder: PropTypes.string,
    autocomplete: PropTypes.array
  }
  constructor(props) {
    super(props)
    this.state = {
      dataSource: []
    }
  }
  static defaultProps = {
    options: {},
    placeholder: null,
  }
  componentDidMount() {
    this.index = this.props.client.initIndex(this.props.index);
  }
  onKeyUp = (e, request) => {
    let target;
    if (request){
      target = e;
    } else {
      target = e.target.value;
    }
    console.log(target);
    if (target) {
      this.index.search(target, this.props.options, (err, content) => {
        if (err && this.props.onError) {
          this.props.onError(err);
        }
        if (content && this.props.onResults) {
          this.props.onResults(content);
        }
      });
    } else if (this.props.onEmptyField){
      this.props.onEmptyField();
    }
  }



  handleUpdateInput = (value) => {
    let results = [];
     this.index.search( value, {
      attributesToRetrieve: ['name', 'brand', 'description', 'popularity', 'price'],
      hitsPerPage: 10
    }, function searchDone(err, content) {
      if (err) {
        console.error(err);
        return;
      }
      for (var h in content.hits) {
        results.push(content.hits[h].name);
      }
    })

    this.setState({dataSource: results});
  };



  render() {
    return (
      <div>
        <AutoComplete id='search-input'
          onKeyUp={this.onKeyUp}
          onNewRequest={this.onKeyUp.bind('request')}
          filter={AutoComplete.caseInsensitiveFilter}
          type='text'
          fullWidth={true}
          className={ this.props.className || 'algolia-react-input' }
          hintText={this.props.placeholder}
          dataSource={this.state.dataSource}
          onUpdateInput={this.handleUpdateInput}
          style={{width:'350px', color:'white', marginTop:'5px'}}
         />
      </div>
    );
  }

}
