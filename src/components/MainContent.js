import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Divider, Flex, Input, Select, Text } from '@chakra-ui/react'
import HouseCard from './HouseCard';
import { data } from '../dummyData/houses';

const MainContent = () => {

    // states
    const [houseData, setHouseData] = useState(data);
    const [locationFilter, setLocationFilter] = useState("label");
    const [dateFilter, setDateFilter] = useState("");
    const [priceFilter, setPriceFilter] = useState("label");
    const [typeFilter, setTypeFilter] = useState("all");
    const [clearBtnVisible, setClearBtnVisible] = useState(false)
    // refs
    const dateLabel = useRef();

    // filter function based on criterias
    const filterHouse = () => {
        setClearBtnVisible(true);
        let temp = data
        if (locationFilter !== "label") {
            temp = data.filter(each => each.location === locationFilter);
        }
        if (priceFilter === "500") {
            temp = temp.filter(each => each.rent >= 500 && each.rent <= 2500)
        }   else if (priceFilter === "2500") {
            temp = temp.filter(each => each.rent >= 2500 && each.rent <= 5000)
        }   else if (priceFilter === "5000") {
            temp = temp.filter(each => each.rent >= 5000 && each.rent <= 10000)
        }
        if (typeFilter === "house") {
            temp = temp.filter(each => each.type === "house")
        }   else if (typeFilter === "flat") {
            temp = temp.filter(each => each.type === "flat")
        }
        setHouseData(temp);
    }

    // search functions
    const searchFunction = (query) => {
        setHouseData(data.filter(each => each.name.toLowerCase().includes(query.toLowerCase())))
    }

    // to clear all filters
    const clearFilter = () => {
        setClearBtnVisible(false);
        setLocationFilter("label");
        setPriceFilter("label");
        setTypeFilter("all")
        setHouseData(data);
    }

    return (
        <Box bg="#f8f7fd" minH="calc(100vh - 85px)">
            <Box w="1000px" margin={"auto"}>
                <Flex justifyContent="space-between" alignItems="center" pt="40px">
                    <Text color="#1e355b" fontSize="35px" fontWeight="600">Search properties to rent</Text>
                    <Input 

                        type="search" 
                        w="260px" 
                        // color="#1e355b"
                        color="#1e355b" fontWeight="bold"
                        placeholder='Search with Search Bar' 
                        bg="white"
                        // value={searchQuery}
                        onChange={(e) => {
                            searchFunction(e.target.value)
                            // setSearchQuery(e.target.value)
                        }} 
                        />
                </Flex>
                <Flex bg="white" color="#1e355b" borderRadius={"10px"} boxShadow="0px 0px 4px #eef" mt="25px" p="20px"
                    justifyContent="space-between" alignItems="center">
                    <Box>
                        <Text >Location</Text>
                        <Select color="#1e355b" fontWeight="bold"  variant="flushed" size='md' value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
                            <option disabled={true} value="label">Choose Location</option>
                            <option value="new-york">New York, USA</option>
                            <option value="chicago">Chicago, USA</option>
                            <option value="los-angeles">Los Angeles, USA</option>
                        </Select>
                    </Box>
                    <Divider orientation='vertical' w="3px" color={"black !important"} h="60px" />
                    <Box pos="relative">
                        <Text>When</Text>
                        <Input 
                            size="sm"
                            type="date"
                            w="190px"
                            cursor="pointer" 
                            border="none"
                            
                            onChange={(e) => {
                                setDateFilter(e.target.value);
                            }}
                            onFocus={() => {
                                dateLabel.current.style.display = "none";
                            }}
                        />
                        <Text color="#1e355b" fontWeight="bold" ref={dateLabel} id="date-label" pos="absolute" bottom="5px" left="0px" bg="white" pointerEvents="none" zIndex={3} py={"2px"}>
                            Select Move-in Date
                        </Text>
                    </Box>
                    <Divider orientation='vertical' w="3px" color={"black !important"} h="60px" />
                    <Box>
                        <Text >Price</Text>
                        <Select  color="#1e355b" fontWeight="bold" variant="flushed" size='md' value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
                            <option disabled={true} value="label">Choose Price</option>
                            <option value="500">$500 - $2500</option>
                            <option value="2500">$2500 - $5000</option>
                            <option value="5000">$5000 - $10000</option>
                        </Select>
                    </Box>
                    <Divider orientation='vertical' w="3px" color={"black !important"} h="60px" />
                    <Box>
                        <Text >Property Type</Text>
                        <Select color="#1e355b" fontWeight="bold" value={typeFilter} variant="flushed" size='md' onChange={(e) => setTypeFilter(e.target.value)}>
                            <option value="all">All</option>
                            <option value="house">Houses</option>
                            <option value="flat">Flat</option>
                        </Select>
                    </Box>
                    <Divider orientation='vertical' w="3px" color={"black !important"} h="60px" />
                    <Flex direction="column" gap="5px">
                        <Button    color="white" background= "#1e355b" w="110px"
                            onClick={filterHouse}>
                            Search
                        </Button>
                        {clearBtnVisible &&
                        <Button onClick={clearFilter}>Clear Filter</Button>
                        }
                    </Flex>
                </Flex>
                <Flex className='flex-maintain' direction={"row"} justifyContent={"center"} gap="35px" wrap="wrap" pb="30px" w="100%">
                    {
                        houseData.map((each, index) => {
                            return (
                                <HouseCard key={index} details={each} />
                            )
                        })
                    }
                </Flex>
            </Box>
        </Box>
    )
}

export default MainContent
