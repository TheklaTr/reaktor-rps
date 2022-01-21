import { Card, Col, Row } from 'react-bootstrap'
import { FaHandPaper, FaHandRock, FaHandScissors } from 'react-icons/fa'
import React, { useEffect, useRef, useState } from 'react'

const CurrentGame = () => {
   const ws = useRef(null)
   const [current, setCurrent] = useState([])
   const [player1, setPlayer1] = useState({})
   const [player2, setPlayer2] = useState({})

   useEffect(() => {
      ws.current = new WebSocket('ws://bad-api-assignment.reaktor.com/rps/live')
      ws.current.onopen = () => console.log('ws opened')

      if (!ws.current) return
      ws.current.onmessage = (e) => {
         const response = JSON.parse(e.data)
         setCurrent(response)
         // console.log('e', response)
      }
      ws.current.onclose = () => ws.current.close()

      return () => {
         ws.current.close()
      }
   }, [])

   useEffect(() => {
      if (current.length === 0) {
         return <p>Loading...</p>
      }
      setPlayer1({
         name: JSON.parse(current).playerA.name,
         played: JSON.parse(current).playerA.played,
      })
      setPlayer2({
         name: JSON.parse(current).playerB.name,
         played: JSON.parse(current).playerB.played,
      })
   }, [current])

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
         <Row>
            <Col>
               <Card style={{ height: '15rem' }}>
                  <Card.Title> Player 1 </Card.Title>
                  <h3>{player1.name}</h3>
                  <span style={{ color: 'red', fontSize: '5rem' }}>{Icon(player1)}</span>
                  <div className="played">{player1.played}</div>
               </Card>
            </Col>
            <Col> versus </Col>
            <Col>
               <Card style={{ height: '15rem' }}>
                  <Card.Title> Player 2 </Card.Title>
                  <h3>{player2.name}</h3>
                  <span style={{ color: 'blue', fontSize: '5rem' }}>{Icon(player2)}</span>
                  <div>{player2.played}</div>
               </Card>
            </Col>
         </Row>
      </>
   )
}

export default CurrentGame
