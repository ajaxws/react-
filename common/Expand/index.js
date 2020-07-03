import React from 'react';
import PropTypes from 'prop-types';
import './ExpandBar.less';
class App extends React.Component {
    render() {
        const { LANG } = this.props;
        return (
            <div className="expandBar">
                <label htmlFor="btn" className="labelbtn" onClick={this.expand}>{LANG.expand_or_shrink || '展开/收起全部信息'}</label>
                <input type="checkbox" id="btn" />
                <div className="element">{this.props.children}</div>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.array,
    LANG: PropTypes.object
};
export default App;
