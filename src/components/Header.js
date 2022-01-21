import React from 'react'
import styled from 'styled-components'

const Title = styled.h1`
   font-family: 'Pacifico', cursive;
   background-image: linear-gradient(
      to right,
      #d16ba5,
      #c777b9,
      #ba83ca,
      #aa8fd8,
      #9a9ae1,
      #8aa7ec,
      #79b3f4,
      #69bff8,
      #52cffe,
      #41dfff,
      #46eefa,
      #5ffbf1
   );
   color: #fff;
   font-weight: bold;
   padding: 50px;
`
const Header = () => {
   return (
      <div>
         <Title className="jumbotron text-center bg-primary">Rock-Paper-Scissors Statistics</Title>
      </div>
   )
}

export default Header
