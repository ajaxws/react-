import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './style';

class BlockTitle extends Component {
    render() {
        const { className, children, desc, size, separation, top } = this.props;
        const cls = clsx('comp-block-title',
            { [size]: size },
            { [`border-${separation}`]: separation },
            { top },
            className
        );
        return (<div className={cls}>
            <span className="comp-block-title-mainchild">
                {children}
            </span>
            {desc}
        </div>);
    }
}

BlockTitle.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    desc: PropTypes.node, // 标题后信息显示
    separation: PropTypes.oneOf(['dashed', 'solid']),
    top: PropTypes.bool,
    size: PropTypes.oneOf(['large', 'middle', 'small']), // large 样式待补充
};

BlockTitle.defaultProps = {
    size: 'middle',
};

export default BlockTitle;
