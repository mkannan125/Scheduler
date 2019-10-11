import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

const Item = props => (
    <div className="todoItem">
        <Checkbox 
            value={props.item.checked} 
            inputProps={{ 'aria-label': 'Checkbox A' }}
            onChange={props.onCheck(props.item.id)}
            
            />
        <p className={props.item.checked ? "taskCompleted" : ""}>{props.item.label}</p>
    </div>
);

export default Item;