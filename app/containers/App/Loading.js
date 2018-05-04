import React from 'react'

import Loader from '../../components/Loader'
import styles from './Loading.scss'

export default (props) => {
  return (
    <div className={styles.loading}>
      <div>
        <span>Props:</span>
        <span>{JSON.stringify(props)}</span>
      </div>
      <Loader />
    </div>
  )
}
