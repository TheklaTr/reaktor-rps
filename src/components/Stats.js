import React, { useEffect, useState } from 'react'
import { countBy, entries, flow, head, last, maxBy, partialRight, sample } from 'lodash'

import Table from 'react-bootstrap/Table'
import axios from 'axios'

const History = () => {
   const [history, setHistory] = useState([])
   const [specificPlayer, setSpecificPlayer] = useState()

   const fetchStats = async () => {
      const response = await axios(`/rps/history`).catch((error) => console.log(error))

      if (response) {
         const history = response.data.data
         // Name arrays with no duplicate
         const playerNames = [
            ...new Set([...history.map((h) => h.playerA.name), ...history.map((h) => h.playerB.name)]),
         ]
         // console.log('history: ', history[0].playerA.name)
         setSpecificPlayer(sample(playerNames))
         setHistory(history)
      }
   }

   // Get players' name
   const playerNames = [...history.map((h) => h.playerA.name), ...history.map((h) => h.playerB.name)]

   // Number of games played
   const numberOfGames = playerNames.filter((name) => name === specificPlayer).length

   // Get players' details
   const playersDetails = [...history.map((h) => h.playerA), ...history.map((h) => h.playerB)]

   // Get specific player details
   const specificPlayerInfo = playersDetails.filter((p) => p.name === specificPlayer)

   // Get specific player played
   const specificPlayerPlayed = specificPlayerInfo.map((f) => f.played)

   // Get most specific player played
   const maxPlayed = flow(countBy, entries, partialRight(maxBy, last), head)(specificPlayerPlayed)

   // Matches that specific player played
   const matches = history.filter(
      (h) => h.playerA.name === specificPlayer || h.playerB.name === specificPlayer
   )

   const winRatio = (array) => {
      let win = 0
      array.forEach((arr) => {
         if (
            (arr.playerA.played === 'ROCK' && arr.playerB.played === 'SCISSORS') ||
            (arr.playerA.played === 'SCISSORS' && arr.playerB.played === 'PAPER') ||
            (arr.playerA.played === 'PAPER' && arr.playerB.played === 'ROCK')
         ) {
            win += 1
         }
      })

      return (win / numberOfGames) * 100 + ' %'
   }

   const winMatch = (playerA, playerB) => {
      if (
         (playerA.played === 'ROCK' && playerB.played === 'SCISSORS') ||
         (playerA.played === 'SCISSORS' && playerB.played === 'PAPER') ||
         (playerA.played === 'PAPER' && playerB.played === 'ROCK')
      ) {
         return `${playerA.name}`
      } else if (
         (playerA.played === 'ROCK' && playerB.played === 'ROCK') ||
         (playerA.played === 'SCISSORS' && playerB.played === 'SCISSORS') ||
         (playerA.played === 'PAPER' && playerB.played === 'PAPER')
      ) {
         return `DRAW!!!`
      } else return `${playerB.name}`
   }

   useEffect(() => {
      fetchStats()
   }, [])

   return (
      <>
         <h2>Player Statistics</h2>
         <Table striped bordered hover>
            <thead>
               <tr>
                  <th>Name</th>
                  <th>Numbers of games</th>
                  <th>Win ratio</th>
                  <th>Most played hand</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td>{specificPlayer}</td>
                  <td>{numberOfGames}</td>
                  <td>{winRatio(matches)}</td>
                  <td>{maxPlayed}</td>
               </tr>
            </tbody>
         </Table>
         <br />

         <h2>Statistics</h2>
         <Table striped bordered hover>
            <thead>
               <tr>
                  <th>Game ID</th>
                  <th>Player A Name</th>
                  <th>Player A Played</th>
                  <th>Player B Name</th>
                  <th>Player B Played</th>
                  <th>RESULT</th>
               </tr>
            </thead>
            <tbody>
               <tr></tr>
               {matches &&
                  matches.map((h) => (
                     <tr key={h.t}>
                        <td>{h.gameId}</td>
                        <td>{h.playerA.name}</td>
                        <td>{h.playerA.played}</td>
                        <td>{h.playerB.name}</td>
                        <td>{h.playerB.played}</td>
                        <td>{winMatch(h.playerA, h.playerB)}</td>
                     </tr>
                  ))}
            </tbody>
         </Table>
      </>
   )
}

export default History
