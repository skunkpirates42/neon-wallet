// @flow
import React from 'react'

import SendPanel from '../../components/Send/SendPanel'

import styles from './Send.scss'

type Props = {
  address: string
}

export default class Send extends React.Component<Props> {
  render () {
    return (
      <div className={styles.send}>
        <SendPanel className={styles.panel} address={this.props.address} />
      </div>
    )
  }
}
