import React, { useEffect, useState } from 'react'
import { Result, WinRatio } from './utils/calculations'
import { countBy, entries, flow, head, last, maxBy, partialRight, sample } from 'lodash'

import Select from 'react-select'
import Table from 'react-bootstrap/Table'
import axios from 'axios'

const History = () => {
   const [history, setHistory] = useState([])
   const [playerList, setPlayerList] = useState([])
   const [specificPlayer, setSpecificPlayer] = useState()

   //! Avoids CORS issues: https://create-react-app.dev/docs/proxying-api-requests-in-development/
   const fetchStats = async () => {
      axios
         .get(`/rps/history`, { headers: { 'Access-Control-Allow-Origin': '*' } })
         .then((response) => {
            if (response) {
               const history = response.data.data

               // Sort names array with no duplicate
               const playerNames = [
                  ...new Set([...history.map((h) => h.playerA.name), ...history.map((h) => h.playerB.name)]),
               ].sort()
               setPlayerList(playerNames)
               setSpecificPlayer(sample(playerNames))
               setHistory(history)
            }
         })
         .catch((error) => console.log(error))
   }

   // Get options data for Select
   const optionNames = playerList.map((player) => Object.create({ value: player, label: player }))

   // Get players' name
   const playerNames = [...history.map((h) => h.playerA.name), ...history.map((h) => h.playerB.name)]

   // TODO: Number of games played
   const numberOfGames = playerNames.filter((name) => name === specificPlayer).length

   // Get players' details
   const playersDetails = [...history.map((h) => h.playerA), ...history.map((h) => h.playerB)]

   // Get specific player details
   const specificPlayerInfo = playersDetails.filter((p) => p.name === specificPlayer)

   // Get specific player played
   const specificPlayerPlayed = specificPlayerInfo.map((f) => f.played)

   // TODO: Get most specific player played hand
   /**
    * & https://stackoverflow.com/questions/49731282/the-most-frequent-item-of-an-array-using-lodash
    * * _countBy(): get an object of element:count
    * * _.entries(): Convert to an array of tuples
    * *_.maxBy(_.last): Find the max of last element of array (_.last), since the count value is the 2nd item in the tuple.
    * *_.head(): Extract the element from the tuple
    */
   const maxPlayedHand = flow(countBy, entries, partialRight(maxBy, last), head)(specificPlayerPlayed)
   console.log(maxPlayedHand)

   // Matches that specific player played
   const matches = history.filter(
      (h) => h.playerA.name === specificPlayer || h.playerB.name === specificPlayer
   )

   useEffect(() => {
      fetchStats()
   }, [])

   return (
      <>
         <h2>Player Statistics</h2>
         <br />
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
                  <td>{WinRatio(matches, specificPlayer, numberOfGames)}</td>
                  <td>{maxPlayedHand}</td>
               </tr>
            </tbody>
         </Table>
         <br />

         <h2>Statistics</h2>
         <br />
         <Table striped bordered hover>
            <thead>
               <tr>
                  <th>Game ID</th>
                  <th style={{ backgroundColor: '#FF5C58' }}>Player A Name</th>
                  <th style={{ backgroundColor: '#F38BA0' }}>Player A Played</th>
                  <th style={{ backgroundColor: '#E7FBBE' }}>RESULT</th>
                  <th style={{ backgroundColor: '#949CDF' }}>Player B Played</th>
                  <th style={{ backgroundColor: '#6998AB' }}>Player B Name</th>
               </tr>
            </thead>
            <tbody>
               <tr></tr>
               {matches &&
                  matches.map((h) => (
                     <tr key={h.t}>
                        <td style={{ textAlign: 'left' }}>{h.gameId}</td>
                        <td style={{ backgroundColor: '#FE8F8F' }}>{h.playerA.name}</td>
                        <td style={{ backgroundColor: '#FFBCBC' }}>{h.playerA.played}</td>
                        <td style={{ backgroundColor: '#FFFDDE' }}>{Result(h.playerA, h.playerB)}</td>
                        <td style={{ backgroundColor: '#A7C5EB' }}>{h.playerB.played}</td>
                        <td style={{ backgroundColor: '#B1D0E0' }}>{h.playerB.name}</td>
                     </tr>
                  ))}
            </tbody>
         </Table>
      </>
   )
}

export default History
