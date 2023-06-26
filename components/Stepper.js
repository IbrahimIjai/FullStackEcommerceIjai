

// import React from 'react'

import { Step, StepIndicator, StepStatus, Box, useSteps, StepTitle, StepDescription, StepSeparator } from "@chakra-ui/react"

// function Stepper() {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Stepper

const steps = [
    { title: 'First', description: 'Contact Info' },
    { title: 'Second', description: 'Date & Time' },
    { title: 'Third', description: 'Select Rooms' },
  ]
  
  export default function Stepper() {
    const { activeStep } = useSteps({
      index: 1,
      count: steps.length,
    })
  
    return (
      <Stepper size='lg' colorScheme='yellow' index={activeStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus complete={`✅`} incomplete={`😅`} active={`📍`} />
            </StepIndicator>
  
            <Box flexShrink='0'>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>
  
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    )
  }

