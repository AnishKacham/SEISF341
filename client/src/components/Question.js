import { useLocation, useParams } from "react-router-dom";
import { Box, Heading, Text, Grid, GridItem,Input, InputGroup, IconButton, VStack, Spinner, Divider, Tooltip} from "@chakra-ui/react"
import {Popover, PopoverTrigger, PopoverContent, PopoverBody, PopoverArrow, PopoverCloseButton, toast} from '@chakra-ui/react'
import {FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon} from "react-share";
import {DeleteIcon, CheckIcon} from '@chakra-ui/icons'
import {BiUpvote, BiDownvote, BiSend, BiShareAlt, BiClipboard, BiEdit} from "react-icons/bi"
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import {FcCheckmark} from "react-icons/fc"
import {MdOutlineReportProblem} from "react-icons/md"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Question = ({ email }) => {
    console.log(email);
    const {id} = useParams()
    const [question, setQuestion] = useState()
    const [answer, setAnswer] = useState('')
    const [aId,appAnswer] = useState('')
    const [loading,setLoading] = useState(true);
    const [upVoteActive,setUpVoteActive] = useState({});
    const [downVoteActive,setDownVoteActive]= useState({});
    const [upVoteLoading,setUpVoteLoading] = useState({});
    const [downVoteLoading,setDownVoteLoading] = useState({});
    
    function toMins(m) {
        if(m < 10)
            return '0'+m.toString();
        return m.toString();
    }

    useEffect(()=>{
        console.log(email);
        window.scrollTo(0,0);
        setLoading(true);
        axios.get(`/q/${id}`)
        .then(res=>{
            console.log(res);
            setQuestion(res.data);
            setVoteStatus(res.data);
            setLoading(false);
        })
        .catch(err=>{
            console.error(err);
        })
    },[])

    const up = () => {
        console.log("up");
        setUpVoteLoading({...upVoteLoading,[id]:true});
        axios({method: 'put', url: `/upvote/${id}`, headers : {
            'x-access-token': localStorage.getItem('jwtToken') 
        }})
        .then(res=> {
            console.log(res);
            setQuestion(res.data);
            setUpVoteLoading({...upVoteLoading,[id]:false});
            setUpVoteActive({...upVoteActive,[id]:true});
            setDownVoteActive({...downVoteActive,[id]:false});
        })
        .catch(err=>{
            console.error(err);
        })
    }

    const down = () => {
        console.log("down");
        setDownVoteLoading({...downVoteLoading,[id]:true})
        axios({method: 'put', url: `/downvote/${id}`, headers : {
            'x-access-token': localStorage.getItem('jwtToken') 
        }})
        .then(res=> {
            console.log(res);
            setQuestion(res.data);
            setDownVoteLoading({...downVoteLoading,[id]:false})
            setDownVoteActive({...downVoteActive,[id]:true});
            setUpVoteActive({...upVoteActive,[id]:false});
        })
        .catch(err=>{
            console.error(err);
        })
    }

    const upAns = (ans) => {
        setUpVoteLoading(true);
        
        axios({method: 'put', url: `/upvote/${id}`, headers : {
            'x-access-token': localStorage.getItem('jwtToken') 
        }, params: {
            ans: ans
        }})
        .then(res=> {
            console.log(res);
            setQuestion(res.data);
            setUpVoteLoading(false);
        })
        .catch(err=>{
            console.error(err);
        })
    }

    const downAns = (ans) => {
        setDownVoteLoading(true);

        axios({method: 'put', url: `/downvote/${id}`, headers : {
            'x-access-token': localStorage.getItem('jwtToken') 
        }, params: {
            ans: ans
        }})
        .then(res=> {
            console.log(res);
            setQuestion(res.data);
            setDownVoteLoading(false);
        })
        .catch(err=>{
            console.error(err);
        })
    }

    const postAnswer = () => {
        const ans = { body: answer }

        axios.post(`/answer/${id}`, ans, { headers : {
            'x-access-token': localStorage.getItem('jwtToken') 
        } }).then(res => {
            console.log(res);
            setQuestion(res.data);
        })
        .catch(err=>{
            console.error(err);
        })

        setAnswer('')
    }

    const deleteAnswer = (ans) => {
        axios({method: 'delete', url: `/q/${id}`, headers : {
            'x-access-token': localStorage.getItem('jwtToken') 
        }, params: {
            ans: ans
        }})
        .then(res=> {
            console.log(res.data);
            setQuestion(res.data.data);
        })
        .catch(err=>{
            console.error(err);
        })
    }

    const approveAnswer = (ans) => {
        // console.log(ans);
        // console.log(id);
        axios({method: 'put', url: `/approve/${id}/${ans}`, headers : {
            'x-access-token': localStorage.getItem('jwtToken') 
        }, params: {
            answer: ans
        }})
        .then(res=> {
            console.log("Approve answer");
            appAnswer(ans);
        })
        .catch(err=>{
            console.error(err);
        })
    }

    const getColorUp = () =>{
        for( let i=0;i<question.upvoteList.length;i++){
            if(question.upvoteList[i]===email){
                return "green";
            }
        }
        return "gray";
    }

    const getColorDown = () =>{
        for( let i=0;i<question.downvoteList.length;i++){
            if(question.downvoteList[i]===email){
                return "red";
            }
        }
        return "gray";
    }
    const getColorAnsUp = (aID) =>{
        for(let i=0;i<question.answers.length;i++){
            if(question.answers[i]._id==aID){
                for( let j=0;j<question.answers[i].upvoteList.length;j++){
                    if(question.answers[i].upvoteList[j]===email){
                        return "green";
                    }
                }
            }
        }
        return "gray";
    }

    const getColorAnsDown = (aID) =>{
        for(let i=0;i<question.answers.length;i++){
            if(question.answers[i]._id==aID){
                for( let j=0;j<question.answers[i].downvoteList.length;j++){
                    if(question.answers[i].downvoteList[j]===email){
                        return "red";
                    }
                }
            }
        }
        return "gray";
    }

    const setVoteStatus = q => {
        for(let i=0; i<q.upvoteList.length; i++){
            if(q.upvoteList[i]===email) setUpVoteActive({...upVoteActive,[id]:true});
            if(q.downvoteList[i]===email) setDownVoteActive({...downVoteActive,[id]:true});
        }
    }

    const renderUpvote = () => {
        if(upVoteActive.id===true) return <BiSolidUpvote color='green'/>
        else return <BiUpvote />
    }

    const renderDownvote = () => {
        if(downVoteActive.id===true) return <BiSolidDownvote color="red"/>
        else return <BiDownvote/>
    }

    return(
        <VStack align='center' maxW='container.lg' border='solid' borderColor='gray.300' padding='12px' borderRadius={8} bgColor='white' mx={{base: '8px', lg: 'auto'}}>
            {loading ? <Spinner size="lg"></Spinner> : <>
            <Box w='full' color='blue.600' fontSize='larger' fontWeight='bold' textAlign='left'>{question.title}</Box>
            <Text fontSize='small' color='gray' alignSelf='start'><Tooltip label={question.postedBy.email} placement="right">{question.postedBy.fullName}</Tooltip> | {Math.abs(Date(question.createdAt) - Date.now())}</Text>
            <Divider/>
            <Box w='full' display='flex' justifyContent='flex-start' alignItems='center' gap='15px'>
                <Box display='flex' flexDir='column' gap='2px' justifyContent='space-evenly'>
                    <Box _hover={{cursor: 'pointer'}} onClick={()=>{
                        up()
                        }}>{renderUpvote()}</Box>
                    <Text>{question.upvotes}</Text>
                    <Box _hover={{cursor: 'pointer'}} onClick={()=>{
                        down()
                    }}>{renderDownvote()}</Box>
                </Box>
                <Box padding={2}>
                    <Text as='span'>{question.body}</Text>
                </Box>
            </Box>
            </>}            
        </VStack>
    );
}

export default Question;