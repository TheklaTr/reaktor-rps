import React, { useEffect, useState } from 'react'
import { countBy, entries, flow, head, last, maxBy, partialRight, sample } from 'lodash'

import Select from 'react-select'
import Table from 'react-bootstrap/Table'
import axios from 'axios'

const History = () => {
   const [history, setHistory] = useState([])
   const [playerList, setPlayerList] = useState([])
   const [specificPlayer, setSpecificPlayer] = useState()

   const fetchStats = async () => {
      const response = await axios(`/rps/history`).catch((error) => console.log(error))

      if (response) {
         const history = response.data.data

         // Name arrays with no duplicate
         const playerNames = [
            ...new Set([...history.map((h) => h.playerA.name), ...history.map((h) => h.playerB.name)]),
         ]
         setPlayerList(playerNames)
         setSpecificPlayer(sample(playerNames))
         setHistory(history)
      }
   }

   // Get options data for Select
   const optionNames = playerList.map((player) => Object.create({ value: player, label: player }))

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

   const winRatio = (array, selectedPlayer) => {
      let win = 0
      array.forEach((arr) => {
         if (
            (selectedPlayer === arr.playerA.name &&
               ((arr.playerA.played === 'ROCK' && arr.playerB.played === 'SCISSORS') ||
                  (arr.playerA.played === 'SCISSORS' && arr.playerB.played === 'PAPER') ||
                  (arr.playerA.played === 'PAPER' && arr.playerB.played === 'ROCK'))) ||
            (selectedPlayer === arr.playerB.name &&
               ((arr.playerB.played === 'ROCK' && arr.playerA.played === 'SCISSORS') ||
                  (arr.playerB.played === 'SCISSORS' && arr.playerA.played === 'PAPER') ||
                  (arr.playerB.played === 'PAPER' && arr.playerA.played === 'ROCK')))
         ) {
            win += 1
         }
      })

      return `${win} of ${numberOfGames} = ${(win / numberOfGames) * 100} %`
   }

   const winMatch = (playerA, playerB) => {
      if (
         (playerA.played === 'ROCK' && playerB.played === 'SCISSORS') ||
         (playerA.played === 'SCISSORS' && playerB.played === 'PAPER') ||
         (playerA.played === 'PAPER' && playerB.played === 'ROCK')
      ) {
         return <div style={{ color: 'red' }}>{playerA.name}</div>
      } else if (
         (playerA.played === 'ROCK' && playerB.played === 'ROCK') ||
         (playerA.played === 'SCISSORS' && playerB.played === 'SCISSORS') ||
         (playerA.played === 'PAPER' && playerB.played === 'PAPER')
      ) {
         return <div style={{ color: 'green' }}>DRAW!!!</div>
      } else return <div style={{ color: 'blue' }}>{playerB.name}</div>
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
                  <td style={{ textAlign: 'left' }}>
                     <Select
                        options={optionNames}
                        onChange={(e) => setSpecificPlayer(e.value)}
                        placeholder={specificPlayer}
                        defaultValue={specificPlayer}
                        isSearchable
                     />
                  </td>
                  <td>{numberOfGames}</td>
                  <td>{winRatio(matches, specificPlayer)}</td>
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
                  <th style={{ backgroundColor: '#E7FBBE' }}>RESULT</th>
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
                        <td style={{ backgroundColor: '#FFFDDE' }}>{winMatch(h.playerA, h.playerB)}</td>
                     </tr>
                  ))}
            </tbody>
         </Table>
      </>
   )
}

export default History
