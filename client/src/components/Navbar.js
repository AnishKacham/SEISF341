import {Text, Heading, Flex, Link as LinkC, Button, Input, InputGroup, InputLeftElement, IconButton,Image} from '@chakra-ui/react'
import {Link} from 'react-router-dom'
import { SearchIcon, ExternalLinkIcon} from '@chakra-ui/icons'
import {useEffect, useState} from 'react' ;
import { Link as LinkChakra } from '@chakra-ui/react';
import React from 'react' ;
import { GoogleLogin } from '@react-oauth/google';
// refresh token
import {refreshTokenSetup} from '../utils/refreshToken' ;
// import { appendFile } from 'fs';
import axios from 'axios';
import { getGoogleOAuthURL } from '../utils/googleOAuth';

const clientId = '980895739592-obqt1v1p1vng0co9bfdnkr0r3pff4kp3.apps.googleusercontent.com' ;

export default function Navbar({ setter, search, searcher, login }){

  const onLoginSuccess = async (credResponse) => {
    try{
      const userDetails = await axios.post("/loginSafe",credResponse);
    }
    catch(loginError){
      console.log("Error Logging In", loginError);
    }
  }

  const onLoginFailure = (loginError) => {
    console.log(loginError);
  }

    return(
        <>
        <Flex direction="row"
        bgColor="#e02504"
        h="8vh"
        w="full"
        fontSize="xl"
        textColor="white"
        justify="space-evenly"
>
        <Flex justify = "space-around" w="20%" align="center"  >
        <Text ><Link  to="/" mr={5}>Home</Link> </Text>
        <Text>|</Text>
        <Text> <Link to="/profile" ml={5}>Profile</Link></Text>
        <Text>|</Text>
        <Text> <Link to="/askquestion" ml={5}>Post Question</Link></Text>
        </Flex>

        <Flex justify="space-around" w="20%" align="center">
        <InputGroup borderColor={"white"}>
          <InputLeftElement
            pointerEvents='none'
            children={<IconButton aria-label='Search' icon={<SearchIcon />} colorScheme="red.400" />}
          />
          <Input placeholder=' Search...' color='white.300' _placeholder={{ color: 'white' }}
                  onKeyPress={e => 
                    {
                      if(e.key == 'Enter')
                        searcher()
                    }
                  }
                  value={search}
                  onChange={e => setter(e.target.value)}
            />
        </InputGroup>
        </Flex>
        <Flex justify="right" w="40%" align="center">
        <LinkChakra href={getGoogleOAuthURL()} isExternal>
          Login with google <ExternalLinkIcon mx='2px' />
        </LinkChakra>
          {/* <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginFailure} useOneTap auto_select/>  */}
        </Flex>
      </Flex>
      <Heading
            lineHeight={1.1}
            fontWeight={600}
            // fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
            >
            <Text
              as={'span'}
              fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: '25%',
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: '#e02504',
                zIndex: -1,
              }}
              fontStyle={'italic'}>
              🅖Overflow
            </Text>
            {" "}
            <Text as={'span'} color={'#e02504'} fontSize={{ base: '2xl', sm: '3xl', lg: '5xl' }}>
              your QnA Forum!
            </Text>
            <br/><br/>
          </Heading>
        </>
    )
}