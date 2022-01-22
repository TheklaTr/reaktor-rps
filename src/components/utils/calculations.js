const winningPlays = ['ROCKSCISSORS', 'SCISSORSPAPER', 'PAPERROCK']

export const Result = (playerA, playerB) => {
   if (!playerA || !playerB) return null

   if (playerA.played === playerB.played) return <div style={{ color: 'green' }}>DRAW!!!</div>

   if (winningPlays.includes(playerA.played + playerB.played)) {
      return <div style={{ color: '#BB5A5A' }}>{playerA.name}</div>
   }

   return <div style={{ color: '#046582' }}>{playerB.name}</div>
}

// TODO: Win ratio of specific player
export const WinRatio = (array, currSelectedPlayerName, games) => {
   let win = 0
   array.forEach((arr) => {
      let [selectedPlayer, otherPlayer] =
         currSelectedPlayerName === arr.playerA.name ? [arr.playerA, arr.playerB] : [arr.playerB, arr.playerA]

      win += winningPlays.includes(selectedPlayer.played + otherPlayer.played) ? 1 : 0
   })

   return `${(win / games) * 100}% (${win} of ${games})`
}
