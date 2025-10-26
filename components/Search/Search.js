import React, {useRef, useState} from 'react';
import {Pressable, TextInput} from 'react-native'
import style from './style'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import { scaleFontSize } from '../../assets/styles/scaling';
import PropTypes from 'prop-types'

const Search = (props) => {
  const textInputRef = useRef(null);
  const [search, setSearch] = useState('')
  const handleFocus = () => {
    textInputRef.current.focus();
  };
  const handleSearch = (searchValue) => {
    setSearch(searchValue);
    props.onSearch(searchValue)
  }

  return (
    <Pressable style={style.searchInputContainer} onPress={handleFocus}>
      <FontAwesomeIcon 
        icon={faSearch} 
        color='#25C0FF' 
        size={scaleFontSize(22)} />
      <TextInput 
        ref={textInputRef} 
        style={style.serchInput}
        value={search}
        onCHangeText={(value) => handleSearch(value)} />
    </Pressable>
  )
};

Search.defaultProps = {
  onSearch: () => {}
}
Search.propTypes = {
  onSearch: PropTypes.func,
}

export default Search;