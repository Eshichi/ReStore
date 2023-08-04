import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from '@mui/material'
import React, { useState } from 'react'
import agent from '../../app/api/agent'

export const AboutPage = () => {
  const [validationErrors , setValidationErrors] = useState<string[]>([]);

  const getValidationError = () =>{
    agent.TestErrors.getValidationError()
    .then(() => console.log("you should not be seeing this"))
    .catch(error => setValidationErrors(error))
  }

  return (
    <Container>
      AboutPage
      <Typography gutterBottom variant='h2'>
        Errors for testing purposes
      </Typography>
      <ButtonGroup fullWidth>
        <Button variant="contained" onClick={() => agent.TestErrors.get400Error().catch(error => console.log(error))}>400 error</Button>
        <Button variant="contained" onClick={() => agent.TestErrors.get401Error().catch(error => console.log(error))}>401 error</Button>
        <Button variant="contained" onClick={() => agent.TestErrors.get404Error().catch(error => console.log(error))}>404 error</Button>
        <Button variant="contained" onClick={() => agent.TestErrors.get500Error().catch(error => console.log(error))}>500 error</Button>
        <Button variant="contained" onClick={getValidationError}>Validation error</Button>
      </ButtonGroup>

      {validationErrors.length > 0 && 
        <Alert severity='error'>
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationErrors.map(error => (
              <ListItem key={error}>
                <ListItemText>{error}</ListItemText>
              </ListItem>
            ))}
          </List>  
        </Alert>
      }
    </Container>
  )
}
