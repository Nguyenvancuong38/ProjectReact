/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable eol-last */
import React, { useEffect, useRef } from 'react';
import queryString from 'query-string';
import { useLocation, useHistory } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import styles from './index.module.scss';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

function SearchValue() {
    const location = useLocation();
    const history = useHistory();
    const saveValueSearchURL = useRef();
    const typingTimeoutRef = useRef(null);

    const valueSearchURL = new URLSearchParams(location.search).get('searchValue');

    const handleChangeValue = (value) => {
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            const parsed = queryString.parse(location.search);
            parsed.searchValue = value;
            parsed.currentPage = 1;
            history.push({ search: `${queryString.stringify(parsed)}` });
        }, 600);
    };

    useEffect(() => {
        if (valueSearchURL) {
            saveValueSearchURL.current.value = valueSearchURL;
        }
    }, [valueSearchURL]);

    return (
        <Search className={styles.searchfield} onChange={(e) => handleChangeValue(e.target.value)}>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search', ref: saveValueSearchURL }}
            />
        </Search>
    );
}

export default SearchValue;