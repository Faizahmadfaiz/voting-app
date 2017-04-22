import React from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';

import {createPoll} from '../actions/actions'
export class NewPoll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            optionsText: ''
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        var {dispatch, user} = this.props;
        let options = this.state.optionsText.split('\n').filter((val) => val);
        options = options.map((option) => {
            return ({
                name: option
            });
        });
    
        const pollData = {
            name: this.state.title,
            options: options,
            author: {username: 'Anonymous'}
        };
        
        dispatch(createPoll(pollData));
        alert('Poll created');
        browserHistory.push('/');
    }
    render() {
        return (
            <div>
                <h4>Creating your new poll</h4>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label>
                        Title
                        <input type="text" onChange={(e) => this.setState({title: e.target.value})}/>
                    </label>
                    <label>
                        You must write at least two options separated by newlines
                        <textarea rows="5" onChange={(e) => this.setState({optionsText: e.target.value})}></textarea>
                    </label>
                    <button type="submit" className="success button expanded">Create</button>
                </form>
            </div>
        );
    }
}
export default connect(
    (state) => {
        return {
            user: state.get('user')
        }
    }
)(NewPoll);