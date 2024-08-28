import React from 'react'
import { Typography ,styled} from '@mui/material'

const Typo = styled(Typography)`
text-align:center;
margin-top:1%;

`
const About = () => {
  return (
    
    <Typo variant="h4">About Us</Typo>
    
  )
}

export default About