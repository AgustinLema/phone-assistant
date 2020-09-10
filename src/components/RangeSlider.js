import React from 'react'
import { Slider } from '@material-ui/core'

export default props => {
    if (!props.options || props.options.length === 0) {
        return null
    }
    const options = props.options.map((n, i) => ({ value: i, label: n }));
    const maxValue = options.reduce((p, n) => (p && p.value > n.value) ? p : n).value;
    const [value, setValue] = React.useState([0, maxValue]);
    return (
            <Slider
                value={value}
                onChange={(_event, value) => {setValue(value)}}
                onChangeCommitted={(_event, value) => props.onChange && props.onChange(value)}
                aria-labelledby="range-slider"
                // getAriaValueText={valuetext}
                // valueLabelFormat={valueLabelFormat}
                valueLabelFormat ={(idx) => options[idx].label}
                valueLabelDisplay="auto" // Display label on hover
                marks={options}
                step={null}
                max={maxValue}
            />
    )
}
