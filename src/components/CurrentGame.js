import { Card, Col, Row } from 'react-bootstrap'
import { FaHandPaper, FaHandRock, FaHandScissors } from 'react-icons/fa'
import React, { useEffect, useRef, useState } from 'react'

import { Result } from './utils/calculations'

const CurrentGame = () => {
   const ws = useRef(null)
   const [playerA, setPlayerA] = useState({})
   const [playerB, setPlayerB] = useState({})

   useEffect(() => {
      ws.current = new WebSocket('ws://bad-api-assignment.reaktor.com/rps/live')
      ws.current.onopen = () => console.log('ws opened')

      if (!ws.current) return

      ws.current.onmessage = (e) => {
         const response = JSON.parse(e.data)
         try {
            setPlayerA({
               name: JSON.parse(response).playerA.name,
               played: JSON.parse(response).playerA.played,
            })

            setPlayerB({
               name: JSON.parse(response).playerB.name,
               played: JSON.parse(response).playerB.played,
            })
         } catch (error) {
            console.log(error)
         }
      }
      ws.current.onclose = () => ws.current.close()

      return () => ws.current.close()
   }, [])

   const Icon = (player) => {
      switch (player.played) {
         case 'ROCK':
            return <FaHandRock />
         case 'SCISSORS':
            return <FaHandScissors />
         case 'PAPER':
            return <FaHandPaper />
         default:
            return <div>...</div>
      }
   }
   return (
      <>
         <h2>Current Game</h2>
         <br />
         <Row>
            <Col>
               <Card style={{ height: '15rem' }}>
                  <Card.Title> Player A </Card.Title>
                  <h3>{playerA.name}</h3>
                  <span style={{ color: '#BB5A5A', fontSize: '5rem' }}>{Icon(playerA)}</span>
                  <div style={{ color: '#BB5A5A', fontWeight: 'bold' }}>{playerA.played}</div>
               </Card>
            </Col>

            <Col>
               <br />
               <Card style={{ height: '10rem', border: 'none' }}>
                  <Card.Title> RESULT </Card.Title>
                  <h3>{Result(playerA, playerB)}</h3>
               </Card>
            </Col>

            <Col>
               <Card style={{ height: '15rem' }}>
                  <Card.Title> Player B </Card.Title>
                  <h3>{playerB.name}</h3>
                  <span style={{ color: '#046582', fontSize: '5rem' }}>{Icon(playerB)}</span>
                  <div style={{ color: '#046582', fontWeight: 'bold' }}>{playerB.played} </div>
               </Card>
            </Col>
         </Row>
      </>
   )
}

export default CurrentGame
