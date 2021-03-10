import React from 'react';
import styles from './index.module.scss';

const Square = (props) => {
  return (
    <button className={ styles.square } key={ props.value } onClick={ props.onClick }>
      { props.value }
    </button>
  );
}

export default Square;