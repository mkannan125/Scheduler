import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

const Item = props => (
    <div className="todoItem">
        <Checkbox value="checkedA" inputProps={{ 'aria-label': 'Checkbox A' }}/>
        <p>{props.item}</p>
    </div>
);

export default Item;