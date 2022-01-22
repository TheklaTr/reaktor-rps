const Hand = Object.freeze({
   ROCK: 'ROCK',
   SCISSORS: 'SCISSORS',
   PAPER: 'PAPER',
})

export const Result = (playerA, playerB) => {
   if (
      (playerA.played === Hand.ROCK && playerB.played === Hand.SCISSORS) ||
      (playerA.played === Hand.SCISSORS && playerB.played === Hand.PAPER) ||
      (playerA.played === Hand.PAPER && playerB.played === Hand.ROCK)
   ) {
      return <div style={{ color: '#BB5A5A' }}>{playerA.name}</div>
   } else if (
      (playerA.played === Hand.ROCK && playerB.played === Hand.ROCK) ||
      (playerA.played === Hand.SCISSORS && playerB.played === Hand.SCISSORS) ||
      (playerA.played === Hand.PAPER && playerB.played === Hand.PAPER)
   ) {
      return <div style={{ color: 'green' }}>DRAW!!!</div>
   } else return <div style={{ color: '#046582' }}>{playerB.name}</div>
}

// TODO: Win ratio of specific player
export const WinRatio = (array, currSelectedPlayerName, games) => {
   let win = 0
   array.forEach((arr) => {
      let [selectedPlayer, otherPlayer] =
         currSelectedPlayerName === arr.playerA.name ? [arr.playerA, arr.playerB] : [arr.playerB, arr.playerA]

      win +=
         (selectedPlayer.played === Hand.ROCK && otherPlayer.played === Hand.SCISSORS) ||
         (selectedPlayer.played === Hand.SCISSORS && otherPlayer.played === Hand.PAPER) ||
         (selectedPlayer.played === Hand.PAPER && otherPlayer.played === Hand.ROCK)
            ? 1
            : 0
   })

   return `${(win / games) * 100}% (${win} of ${games})`
}
