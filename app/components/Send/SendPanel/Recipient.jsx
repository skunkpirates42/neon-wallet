// @flow
import React from 'react'

import AddressInput from '../../Inputs/AddressInput'
import AssetInput from '../../Inputs/AssetInput'
// import SelectInput from '../../Inputs/SelectInput'

import styles from './Recipient.scss'

type RecipientType = {
  address: string,
  amount: string,
  scriptHash: string
}

type Props = {
  recipient: RecipientType,
  number: number,
  onChange: Function,
  onDelete: ?Function
}

export default class Recipient extends React.Component<Props> {
  render () {
    const { recipient, number } = this.props
    const { address, scriptHash } = recipient

    return (
      <div className={styles.recipient}>
        <h3>
          Recipient #{number}
          {this.renderDelete()}
        </h3>

        <AddressInput
          placeholder='Address'
          value={address}
          onChange={this.handleChange('address')} />
        <AssetInput
          placeholder='Asset'
          value={scriptHash}
          onChange={this.handleChange('symbol')} />
      </div>
    )
  }

  renderDelete = () => {
    const { onDelete } = this.props

    if (!onDelete) {
      return null
    }

    return <span onClick={onDelete}>x</span>
  }

  handleChange = (field: string) => {
    return (value: string) => {
      const { recipient, onChange } = this.props
      onChange({ ...recipient, [field]: value })
    }
  }
}
