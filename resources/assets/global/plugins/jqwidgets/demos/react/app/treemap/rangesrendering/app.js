import React from 'react';
import ReactDOM from 'react-dom';

import JqxTreeMap from '../../../jqwidgets-react/react_jqxtreemap.js';

class App extends React.Component {
    render () {
        let data = [
                {
                    label: 'China',
                    value: 1354040000
                },
                {
                    label: 'India',
                    value: 1210193422
                },
                {
                    label: 'United States',
                    value: 315498000
                },
                {
                    label: 'Indonesia',
                    value: 237641326
                },
                {
                    label: 'Brazil',
                    value: 193946886
                },
                {
                    label: 'Pakistan',
                    value: 182228000
                },
                {
                    label: 'Nigeria',
                    value: 166629000
                },
                {
                    label: 'Bangladesh',
                    value: 152518015
                },
                {
                    label: 'Russia',
                    value: 143369806
                },
                {
                    label: 'Japan',
                    value: 127460000
                },
                {
                    label: 'Mexico',
                    value: 112336538
                },
                {
                    label: 'Philippines',
                    value: 92337852
                },
                {
                    label: 'Vietnam',
                    value: 87840000
                },
                {
                    label: 'Ethiopia',
                    value: 84320987
                },
                {
                    label: 'Egypt',
                    value: 84320987
                },
                {
                    label: 'Germany',
                    value: 81946000
                }
        ];
        
        let legendScaleCallback = (v) => {
            v /= 1000000000;
            v = v.toFixed(2);
            return v;
        }

        let colorRanges = [
            { min: 1254040000, max: 1454040000, color: '#de290b' },
            { min: 1054040000, max: 1254039999, color: '#de440c' },
            { min: 300000000, max: 1054040000, color: '#ea7707' },
            { min: 210000000, max: 460000000, color: '#ee8a06' },
            { min: 190000000, max: 209999999, color: '#f19505' },
            { min: 180000000, max: 189999999, color: '#f6a903' },
            { min: 160000000, max: 179999999, color: '#f8b203' },
            { min: 140000000, max: 159999999, color: '#fabb02' },
            { min: 100000000, max: 139999999, color: '#fbbf01' },
            { min: 90000000, max: 99999999, color: '#fbcd01' },
            { min: 10000000, max: 89999999, color: '#fbde33' }
        ];
        return (
            <JqxTreeMap
                width={850} height={400} 
                source={data}
                colorMode={'rangeColors'}
                colorRanges={colorRanges}
                baseColor={'#52CBFF'}
                legendScaleCallback={legendScaleCallback}
                legendLabel={'Population (in billions)'}
            />
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
