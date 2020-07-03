import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import FormGrid from './Grid/FormGrid';

class Demo extends Component {
    render() {
        return (<div className="comp-demo">
            <FormGrid
                keys={[
                    'policyNo',
                    'surname',
                ]}
                valueSource={{
                    policyNo: 'ADDFB',
                    surname: '1234',
                }}
                renderCell={() => {}}
            />

        </div>);
    }
}

Demo.propTypes = {
};
export default Demo;
