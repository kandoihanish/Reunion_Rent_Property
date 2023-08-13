import React from 'react'
import { Box, Flex, Text, IconButton, Button, Stack, Collapse, Icon, Link, Popover, PopoverTrigger, PopoverContent, useColorModeValue, useBreakpointValue, useDisclosure, Image } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import logo from "../assets/logo.png";

const Navbar = () => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Box 
            bg={"#fbfaff"}
            borderBottom={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.900')}
        >
            <Flex
                bg={"#fbfaff"}
                minH={'80px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                align={'center'}
                w={{base: "100%", xl: "1280px"}}
                margin={"auto"}
            >
                <Flex
                flex={{ base: 1, md: 'auto' }}
                ml={{ base: -2 }}
                display={{ base: 'flex', md: 'none' }}>
                    <IconButton
                        onClick={onToggle}
                        icon={
                        isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                        }
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} alignItems="center">
                    <Flex alignItems={"center"} gap="6px">
                        {/* <Image src={logo} alt="logo" w="20px" h="fit-content" /> */}
                        <Text
                            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                            fontFamily={'heading'}
                            fontWeight="bold"
                            fontSize={"21px"}
                            color="#1e355b">
                            Property
                        </Text>
                    </Flex>

                    <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        <DesktopNav />
                    </Flex>
                </Flex>

                <Flex gap="15px">
                    <Button    color="white" background= "#1e355b" variant='outline'>
                        Login
                    </Button>
                    <Button  color="white" background= "#1e355b" variant='solid'>
                        Sign Up
                    </Button>
                </Flex>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    )
}

const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    return (
        <Stack direction={'row'} spacing={4}>
        {NAV_ITEMS.map((navItem) => (
            <Box key={navItem.label}>
            <Popover trigger={'hover'} placement={'bottom-start'}>
                <PopoverTrigger>
                <Link
                    p={2}
                    href={navItem.href ?? '#'}
                    fontSize={'16px'}
                    fontWeight={500}
                    color={linkColor}
                    _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                    }}>
                    {navItem.label}
                    {navItem.children && (
                        <ChevronDownIcon marginLeft={"3px"} />
                    )}
                </Link>
                </PopoverTrigger>

                {navItem.children && (
                <PopoverContent
                    border={0}
                    boxShadow={'xl'}
                    bg={popoverContentBgColor}
                    p={4}
                    rounded={'xl'}
                    minW={'sm'}>
                    <Stack>
                    {navItem.children.map((child) => (
                        <DesktopSubNav key={child.label} {...child} />
                    ))}
                    </Stack>
                </PopoverContent>
                )}
            </Popover>
            </Box>
        ))}
        </Stack>
    );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
    return (
        <Link
        href={href}
        role={'group'}
        display={'block'}
        p={2}
        rounded={'md'}
        _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
        <Stack direction={'row'} align={'center'}>
            <Box>
            <Text
                transition={'all .3s ease'}
                _groupHover={{ color: 'pink.400' }}
                fontWeight={500}>
                {label}
            </Text>
            <Text fontSize={'sm'}>{subLabel}</Text>
            </Box>
            <Flex
            transition={'all .3s ease'}
            transform={'translateX(-10px)'}
            opacity={0}
            _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
            justify={'flex-end'}
            align={'center'}
            flex={1}>
            <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
            </Flex>
        </Stack>
        </Link>
    );
    };

const MobileNav = () => {
    return (
        <Stack
        bg={useColorModeValue('white', 'gray.800')}
        p={4}
        display={{ md: 'none' }}>
        {NAV_ITEMS.map((navItem) => (
            <MobileNavItem key={navItem.label} {...navItem} />
        ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href }) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
        <Flex
            py={2}
            as={Link}
            href={href ?? '#'}
            justify={'space-between'}
            align={'center'}
            _hover={{
            textDecoration: 'none',
            }}>
            <Text
            fontWeight={600}
            color={useColorModeValue('gray.600', 'gray.200')}>
            {label}
            </Text>
            {children && (
            <Icon
                as={ChevronDownIcon}
                transition={'all .25s ease-in-out'}
                transform={isOpen ? 'rotate(180deg)' : ''}
                w={6}
                h={6}
            />
            )}
        </Flex>

        <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
            <Stack
            mt={2}
            pl={4}
            borderLeft={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            align={'start'}>
            {children &&
                children.map((child) => (
                <Link key={child.label} py={2} href={child.href}>
                    {child.label}
                </Link>
                ))}
            </Stack>
        </Collapse>
        </Stack>
    );
};

const NAV_ITEMS = [
    {
        label: 'Rent',
        href: '#',
    },
    {
        label: 'Buy',
        href: '#',
    },
    {
        label: 'Sell',
        href: '#',
    },
    {
        label: 'Manage Property',
        children: [
        {
            label: 'Explore Design Work',
            subLabel: 'Trending Design to inspire you',
            href: '#',
        },
        {
            label: 'New & Noteworthy',
            subLabel: 'Up-and-coming Designers',
            href: '#',
        },
        ],
    },
    {
        label: 'Resources',
        children: [
        {
            label: 'House Guide',
            subLabel: 'Find your dream home',
            href: '#',
        },
        {
            label: 'Freelance Projects',
            subLabel: 'An exclusive list for contract work',
            href: '#',
        },
        ],
    },
];

export default Navbar
