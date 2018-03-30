// @flow
import React from 'react'
import classNames from 'classnames'
import { map } from 'lodash'

import Recipient from './Recipient'
import Panel from '../../Panel'
import Button from '../../Button'

import styles from './SendPanel.scss'

type RecipientType = {
  address: string,
  amount: string,
  scriptHash: string
}

type Props = {
  className: string,
  balances: { [scriptHash: string]: string }
}

type State = {
  recipients: Array<RecipientType>
}

// TODO: default to NEO scriptHash
const createRecipient = (scriptHash: string = '') => ({
  address: '',
  amount: '',
  scriptHash
})

export default class SendPanel extends React.Component<Props, State> {
  state = {
    recipients: [createRecipient()]
  }

  render () {
    const { className } = this.props
    const { recipients } = this.state

    return (
      <Panel className={classNames(styles.sendPanel, className)} renderHeader={this.renderHeader}>
        {map(recipients, this.renderRecipient)}
        {this.renderAddRecipient()}
        <Button className={styles.button}>
          Send
        </Button>
      </Panel>
    )
  }

  renderHeader = () => {
    return 'Send'
  }

  renderRecipient = (recipient: RecipientType, index: number) => {
    const number = index + 1
    const handleDelete = this.state.recipients.length > 1 ? this.handleDelete(index) : null

    return (
      <Recipient
        key={index}
        recipient={recipient}
        number={number}
        balances={this.getRemainingBalances(number)}
        onChange={this.handleChange(index)}
        onDelete={handleDelete}
      />
    )
  }

  renderAddRecipient = () => {
    return (
      <div onClick={this.handleAddRecipient}>
        Add Recipient
      </div>
    )
  }

  handleChange = (index: number) => {
    return (recipient: RecipientType) => {
      const recipients = [...this.state.recipients]
      recipients.splice(index, 1, recipient)
      this.setState({ recipients })
    }
  }

  handleDelete = (index: number) => {
    return () => {
      const recipients = [...this.state.recipients]
      recipients.splice(index, 1)
      this.setState({ recipients })
    }
  }

  handleAddRecipient = () => {
    this.setState({ recipients: [...this.state.recipients, createRecipient()] })
  }

  getRemainingBalances = (_recipientNumber: number) => {
    // TODO calculate remainining balances based upon all balances applied to other recipients
    return this.props.balances
  }
}
