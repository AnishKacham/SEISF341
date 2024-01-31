import { Box, Heading, Text, HStack , Grid, GridItem,IconButton, useToast, Badge, Tooltip} from "@chakra-ui/react"
import {Popover, PopoverTrigger, PopoverContent, PopoverBody, PopoverArrow, PopoverCloseButton} from '@chakra-ui/react'
import {Link} from 'react-router-dom'
import {DeleteIcon} from '@chakra-ui/icons'
import {BiEdit, BiShareAlt, BiClipboard} from "react-icons/bi"
import {FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon} from "react-share";
import { useEffect } from "react"

export default function Questionwrapper({question, email, deleter }) {

    const date = new Date(question.createdAt)
    const toast = useToast()

    function toMins(m) {
        if(m < 10)
            return '0'+m.toString();
        return m.toString();
    }
    // console.log(Math.abs(Date.now() - Date(question.postedAt)))
    return(
        <Box display='flex' gap={5} alignItems='flex-start' flexDir={{base:'column',sm:'row'}}>
            <Box minW='max-content' display='flex' flexDir={{base:'row',sm:'column'}} alignItems='flex-end' justifyContent='flex-start' flexWrap='wrap'>
                <Box px={2} >{question.upvotes} votes</Box>
                <Box px={2} bgColor='green.600' color='white' borderRadius='md' h='min-content'>{question.answers.length} answers</Box>
            </Box>
            <Box as="span" textAlign='left' px={2} display='flex' flexDir='column' gap='10px' w='100%'>
            <Link to={`/question/${question._id}`}><Heading as='h3' size='md' color='blue.500'>{question.title}</Heading></Link>
                <Text noOfLines={3}>{question.body}</Text>
                <Box display='flex' flexDir={{base:'column', sm: 'row'}} justifyContent='space-between' alignItems='center'>
                    <Box display='flex' flexDir='row' gap='10px' flexWrap='wrap' alignSelf='flex-start'>
                        {question.tags.map((tag,index) => {
                            return <Badge key={index} variant="subtle" colorScheme="blue">
                                {tag}
                            </Badge>
                        })}
                    </Box>
                    <Text fontSize='sm' alignSelf='flex-end'>
                        by <Tooltip label={question.postedBy.email}>
                            <Link to={"/profile/" + question.postedBy._id}><Text as='span' color='blue.500' fontWeight='bold'>{question.postedBy.fullName} </Text> </Link>
                        </Tooltip>
                        on <Text as='span' color='gray'>{date.toLocaleString('default', { month: 'long' })} {date.getDate()}, {date.getFullYear()}</Text> at <Text as='span' color='gray'>{date.getHours()}:{toMins(date.getMinutes())}</Text>
                    </Text>
                </Box>                
            </Box>
        </Box>        
    )
}