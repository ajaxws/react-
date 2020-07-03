import React from 'react';
import PropTypes from 'prop-types';
import './ExpandBar.less';
class App extends React.Component {
    render() {
        const { LANG, show } = this.props;
        return (
            <div className="expandBar">
                <input type="checkbox" id="btn" checked={show} />
                <div className="element">{this.props.children}</div>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.array,
    LANG: PropTypes.object,
    show: PropTypes.bool
};
// App.defaultProps = {
//     show: false
// };
export default App;
