import React, { useState } from 'react';

const suggestions = [
  'React', 'Hands On', 'Live Coding', 'Angular', 'Vue JS', 'JS Fundamentals', 'Typescript', 
  'Browser/DOM', 'API', 'Router', 'Forms', 'Jest', 'Vue', 'Templates', 'Directives', 
  'Routing', 'State management', 'Asynchronous programming', 'React Js', 'Hooks', 
  'JSX', 'CSS', 'flex', 'DOM'
];

const ChipAuto = () => {
  const [inputValue, setInputValue] = useState('');
  const [chips, setChips] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions);

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
        setFilteredSuggestions(suggestions.filter(suggestion => suggestion.toLowerCase().includes(inputValue.toLowerCase()) && !chips.includes(suggestion)));
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
    setFilteredSuggestions(suggestions.filter(s => s.toLowerCase().includes(suggestion.toLowerCase()) && !chips.includes(s)));
  };

  const highlightMatch = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? <span key={index} className="text-blue-500">{part}</span> : part
        )}
      </span>
    );
  };

  return (
    <div className="w-1/2 mx-auto mt-10">
      <div className="border rounded p-4">
        <p className='mb-3'>Input Tags</p>
        <div className="flex flex-wrap mb-1">
          {chips.map(chip => (
            <div key={chip} className="flex items-center bg-grey-700 text-black  font-bold px-3 py-1 rounded-full mr-2 mb-2">
              {chip}
              <button onClick={() => handleDeleteChip(chip)} className="ml-4 font-bold">x</button>
            </div>
          ))}
        </div>
   
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter a tag"
        />
        <p className='mt-4'>Enter a comma separated chips and enjoy!</p>
        {inputValue && (
          <div className="border mt-2 rounded shadow-lg">
            {filteredSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {highlightMatch(suggestion, inputValue)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChipAuto;
