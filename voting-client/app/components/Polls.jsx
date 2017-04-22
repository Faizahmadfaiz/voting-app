import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

export class Polls extends React.Component {
    render() {
        const {polls} = this.props;
        const renderElements = () => {
            return polls.map((poll) => {
                const id = poll.get('_id');
                const voteUrl = `/polls/${id}/vote`;
                const title = poll.get('name');
                const totalVotes = poll.get('voters_id') ? poll.get('voters_id').size : 0;
                return (
                    //<li key={poll.get('_id')}>{title}: {totalVotes}</li>

                    <li key={poll.get('_id')}>
                        <Link to={voteUrl} activeClassName="active"activeStyle={{fontWeight: 'bold'}}>
                            {title}: {totalVotes}
                        </Link>
                    </li>

                );
            })
        }

        if(!polls) {
            return <div>Loading...</div>
        } else {
            return (
                <div>
                    <ul>
                        {renderElements()}
                    </ul>
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
)(Polls);
