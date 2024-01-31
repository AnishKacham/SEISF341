import { Box, Container, StackDivider, VStack } from "@chakra-ui/react";
import Questionwrapper from '../components/Questionwrapper'


export default function Home({ questions, email, deleter }) {
    return(
        <Box>
            <Container maxW='container.lg' border='solid' borderColor='gray.300' padding='12px' borderRadius={8} bgColor='white'>
                <VStack 
                    divider={<StackDivider borderColor='gray.300' />}
                    spacing={4}
                    align='stretch'>
               {
                   (questions.length > 0) ?
                   questions.map(question => 
                    <Questionwrapper key={question._id} question = {question} email = {email} deleter = {deleter} />
                   )

                   :
                   
                   <p>Your query did not return any results!</p>
               }
               </VStack>
            </Container>
        </Box>
    )
}