import React, { Component } from 'react';
import { CsvToHtmlTable } from 'react-csv-to-table';
import axios from 'axios';
import Cookies from 'universal-cookie';
import './App.css';

const baseURl = "http://ec2-3-91-133-41.compute-1.amazonaws.com:8080/"

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filename: "",
            csvdata: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleClick(event) {
        event.preventDefault();
        const cookies = new Cookies();
        var auth_header = 'Basic ' + cookies.get('cdrive_token');
        const request = axios({
            method: 'GET',
            url: `${baseURl}cdrive/file-content/?file_name=${this.state.filename}`,
            headers: {'Authorization': auth_header}
        });
        request.then(
            response => {
                this.setState({csvdata: response.data})
            }
        );

    }

  render() {
      return (
      <div className="App">
        <div>
            <div className="input-group mb-3" style={{marginTop: '20px', marginLeft: '25%', width: '50%'}}>
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon3">S3 File Name:</span>
                </div>
                <input type="text" aria-describedby="basic-addon3" className="form-control" id="filename" placeholder="Enter S3 file name" name="filename" value={this.state.filename} onChange={this.handleChange}/>
                &nbsp;&nbsp;&nbsp;
                <button className="btn btn-primary" type="button" onClick={this.handleClick}>View File</button>
           </div>
        </div>
        <div>
            <CsvToHtmlTable data={this.state.csvdata} csvDelimiter="," />
        </div>
      </div>
    );
  }
}

export default App;
