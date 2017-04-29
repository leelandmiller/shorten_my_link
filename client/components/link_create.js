import React, { Component } from 'react';

class LinkCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: ''
        };
    }

    handleSubmit(event) {
        event.preventDefault();

        console.log(this.refs.link.value);
        Meteor.call('links.insert', this.refs.link.value, (error) => {
            if (error) {
                this.setState({error: 'Enter a valid URL'});
            } else {
                this.setState({error: ''});
                this.refs.link.value = '';
            }
        });
    }

    render() {
        return (
           <div className="container"> 
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group">
                        <label>Link to Shorten</label>
                        <input ref="link"  className="form-control" />
                    </div>
                    <div className="text-danger">
                        {this.state.error}
                    </div>
                    <button className="btn btn-primary">Shorten</button>
                </form>
            </div>
        );
    }
}

export default LinkCreate;
