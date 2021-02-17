import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const StartGame = props => {
  const {name} = props

  return (
    <div>
      <h3>Yo, here's the code you need to give to your friends so they can all get in on the same game: {name}</h3>
      <h3>Now see who joined here -> [user1][user2][user3]</h3>
      <h3>OK, all your firends ready? Lets Go!</h3>
      <h3>Hey if you want choose how many rounds you want to play up to, or set a timer so whoever has the most points at the end wins, or set a point total so that when someone reaches it the game is over. You can set all three if you're feeling wild and see which one comes first.</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    name: state.user.name
  }
}

export default connect(mapState)(StartGame)

/**
 * PROP TYPES
 */
StartGame.propTypes = {
  name: PropTypes.string
}
