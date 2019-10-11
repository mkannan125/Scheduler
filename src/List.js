import React from 'react';
import Item from './Item.js'

const List = props => (
  <div className="todoList">
      {
        props.items.map((item, index) => <Item key={index} item={item}></Item>)
      }
  </div>
);

export default List;