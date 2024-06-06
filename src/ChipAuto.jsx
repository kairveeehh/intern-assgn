import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// const suggestions = [
//   'React', 'Hands On', 'Live Coding', 'Angular', 'Vue JS', 'JS Fundamentals', 'Typescript', 
//   'Browser/DOM', 'API', 'Router', 'Forms', 'Jest', 'Vue', 'Templates', 'Directives', 
//   'Routing', 'State management', 'Asynchronous programming', 'React Js', 'Hooks', 
//   'JSX', 'CSS', 'flex', 'DOM'
// ];

const ChipAuto = ({suggestions}) => {
  const [inputValue, setInputValue] = useState('');
  const [chips, setChips] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions);
  const [darkMode, setDarkMode] = useState(false);
  const [draggedChip, setDraggedChip] = useState(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      setFilteredSuggestions(suggestions.filter(suggestion => suggestion.toLowerCase().includes(value.toLowerCase()) && !chips.includes(suggestion)));
    } else {
      setFilteredSuggestions(suggestions.filter(suggestion => !chips.includes(suggestion)));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue) {
      if (!chips.includes(inputValue)) {
        setChips([...chips, inputValue]);
        setInputValue('');
        setFilteredSuggestions(suggestions.filter(suggestion => !chips.includes(suggestion)));
      }
    }
  };

  const handleDeleteChip = (chip) => {
    setChips(chips.filter(c => c !== chip));
    setFilteredSuggestions(suggestions.filter(suggestion => !chips.includes(suggestion)));
  };

  const handleSuggestionClick = (suggestion) => {
    setChips([...chips, suggestion]);
    setInputValue('');
    setFilteredSuggestions(suggestions.filter(s => !chips.includes(s)));
  };

  const highlightMatch = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? <span key={index} className="text-blue-500 font-semibold">{part}</span> : part
        )}
      </span>
    );
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleDragStart = (e, chip) => {
    setDraggedChip(chip);
  };

  const handleDrop = (e, chip) => {
    e.preventDefault();
    const draggedChipIndex = chips.indexOf(draggedChip);
    const targetChipIndex = chips.indexOf(chip);
    const updatedChips = [...chips];
    updatedChips.splice(draggedChipIndex, 1);
    updatedChips.splice(targetChipIndex, 0, draggedChip);
    setChips(updatedChips);
    setDraggedChip(null);
  };

  return (
    <div className={`w-full max-w-xl mx-auto mt-10 px-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="flex justify-end mb-4">
        <button onClick={toggleDarkMode} className="border p-2 rounded">
          Toggle Dark Mode
        </button>
      </div>
      <div className="border rounded p-4">
        <p className='mb-3'>Input Tags</p>
        <div className="flex flex-wrap mb-1">
          <AnimatePresence>
            {chips.map((chip, index) => (
              <motion.div
                key={chip}
                className="flex items-center bg-gray-200 text-black font-semibold px-3 py-1 rounded-full mr-2 mb-2 cursor-pointer"
                draggable
                onDragStart={(e) => handleDragStart(e, chip)}
                onDrop={(e) => handleDrop(e, chip)}
                onDragOver={(e) => e.preventDefault()}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                {chip}
                <button onClick={() => handleDeleteChip(chip)} className="ml-2 font-bold">x</button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter a tag"
          aria-label="Tag Input"
        />
        {inputValue && (
          <div className="border mt-2 rounded shadow-lg">
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {highlightMatch(suggestion, inputValue)}
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500">No suggestions available</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChipAuto;
