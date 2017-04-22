import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import * as actions from '../actions/actions';

export class Poll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {option_id: ''}
    }

    handleSubmit(e) {
        e.preventDefault();
        const voteData = {
            voter_id: this.props.user.get('_id'),
            poll_id: this.currentPoll.get('_id'),
            option_id: this.state.option_id
        };
        
        this.props.dispatch(actions.votePoll(voteData));
        alert('Thanks for voting');
        //make vote button inactive for user who has voted
    }

    render() {
        const id = this.props.routeParams.id;
        const {polls} = this.props;
        const resultUrl = `/polls/${id}/result`;
        if(!polls) {
            return <div>Data is Loading</div>
        } else {
        this.currentPoll = polls.filter((poll) => poll.get('_id') === id).get(0);
        const name = this.currentPoll.get('name');
        const options = this.currentPoll.get('options');
        let renderOptions = () => {
            return options.map((option) => {
                return (
                    <li key={option.get('_id')}>
                        <label>
                            <input type="radio" name="optionsRadios" value={option.get('names')} 
                                onChange={(e)=>this.setState({option_id: option.get('_id')})}
                            />
                            {option.get('name')}
                        </label>
                    </li>
                );
            });
        }

        return (
            <div>
                <h4>{name}</h4>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <ul>
                        {renderOptions()}
                    </ul>
                    <button type="submit" className="button">Vote</button>
                    <Link to={resultUrl} activeClassName="active" activeStyle={{fontWeight: 'bold'}}>View Result</Link>
                </form>
            </div>
        ); }
    }
}

export default connect(
    (state) => {
        return {
            polls: state.get('polls'),
            user: state.get('user')
        }
    }
)(Poll);