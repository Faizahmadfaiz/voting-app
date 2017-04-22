import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

export class Result extends React.Component {
    render() {
        const id = this.props.routeParams.id;
        const {polls} = this.props;
        if(!polls) {
            return <div>Data is Loading</div>
        } else {
            const pollUrl = `/polls/${id}/vote`;
            const currentPoll = polls.filter((poll) => poll.get('_id') === id).get(0);
            const name = currentPoll.get('name');
            const options = currentPoll.get('options');
            const totalVotes = currentPoll.get('voters_id') ? currentPoll.get('voters_id').size : 0;

            let renderOptions = () => {
                return options.map((option) => {
                    const voteShare = option.get('voters') ? option.get('voters').size : 0;

                    const votePercent = totalVotes > 0 ? Math.round((voteShare / totalVotes) * 100) : 0;
                    return (
                        <li key={option.get('_id')}>
                                {option.get('name')}: {votePercent} %
                        </li>
                    );
                });
            }
            return (
                <div>
                    <h4>{name}</h4>
                    <p>Total Votes: {totalVotes}</p>
                    <ul>
                        {renderOptions()}
                    </ul>
                    <Link to={pollUrl} activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Back to Poll</Link>
                </div>
            );
        }
    }
}

export default connect(
    (state) => {
        return {
            polls: state.get('polls')
        };
    }
)(Result);