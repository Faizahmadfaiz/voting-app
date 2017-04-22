var React = require('react');
var {Link, IndexLink, browserHistory} = require('react-router');

var Nav = React.createClass({
    onSearch: function(e) {
        e.preventDefault();
        var location = this.refs.location.value;
        var encodedLocation = encodeURIComponent(location);

        if(location.length > 0) {
            this.refs.location.value = '';
            browserHistory.push(`/?location=${encodedLocation}`);
        }
    },
    render: function() {
        return (
            <div className="top-bar">
                <div className="top-bar-left">
                    <ul className="menu">
                        <li className="menu-text">Voting App</li>
                        <li>
                            <IndexLink to="/" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Home</IndexLink>
                        </li>
                        <li>
                            <Link to="/about" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>About</Link>
                        </li>
                        <li>
                            <Link to="/polls/new" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Create Poll</Link>
                        </li>
                    </ul>
                </div>
                <div className="top-bar-right">
                    <ul className="menu">
                        <li>
                            <Link to="/login" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Login</Link>
                        </li>
                        <li>
                            <Link to="/logout" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
});

module.exports = Nav;