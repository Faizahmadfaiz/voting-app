var React = require('react');
var Nav = require('Nav');
import FlashMessagesList from './flash/FlashMessagesList';

var Main = (props) => {
    return (
        <div>
            <Nav/>
            {/*<FlashMessagesList />*/}
            <div className="row">
                <div className="columns medium-6 large-4 small-centered">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

module.exports = Main;