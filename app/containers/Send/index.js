// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import { omit } from 'lodash'

import Send from './Send'
import balancesActions from '../../actions/balancesActions'
import withData from '../../hocs/api/withData'
import withAuthData from '../../hocs/withAuthData'
import withNetworkData from '../../hocs/withNetworkData'
import { sendTransaction } from '../../modules/transactions'
import { ASSETS } from '../../core/constants'

const mapBalancesDataToProps = (balances) => ({
  balances: {
    [ASSETS.NEO]: balances[ASSETS.NEO],
    [ASSETS.GAS]: balances[ASSETS.GAS],
    tokens: omit(balances, ASSETS.NEO, ASSETS.GAS)
  }
})

const mapDispatchToProps = (dispatch) => bindActionCreators({ sendTransaction }, dispatch)

export default compose(
  connect(null, mapDispatchToProps),
  withAuthData(),
  withNetworkData(),
  withData(balancesActions, mapBalancesDataToProps)
)(Send)
