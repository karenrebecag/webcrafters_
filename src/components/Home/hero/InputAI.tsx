'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import './inputAI.css';

const InputAI: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const categories = [
    'Artificial Intelligence',
    'Dynamic Web Development',
    'UX/UI Design',
  ];

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
    }
  }, [inputValue]);

  const handleSubmit = () => {
    console.log('Submitted:', inputValue);
  };

  const handleAutocomplete = (text: string) => {
    setInputValue(text);
    inputRef.current?.focus();
  };

  return (
    <div className="inputAIContainer">
      <div className="inputAIWrapper">
        <div className="inputAIFieldContainer">
          <div className="glow"></div>
          <div className="darkBorderBg"></div>
          <div className="darkBorderBg"></div>
          <div className="darkBorderBg"></div>
          <div className="white"></div>
          <div className="border"></div>
          <div className="inputAIMain">
            <textarea
              ref={inputRef}
              className="inputAIField"
              placeholder="How does webCrafters AI enhance productivity?"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              rows={1}
              style={{ resize: 'none' }}
            />
            <div className="inputAIMask"></div>
            <div className="pinkMask"></div>
          </div>
        </div>
        <button className="inputAISubmitButton" onClick={handleSubmit}>
          <Image
            src="https://pub-2e7dc04d482146c59f472ab28fba09a9.r2.dev/ArrowUp.svg"
            alt="Arrow Icon"
            width={16}
            height={16}
            className="inputAIArrow"
            priority
          />
        </button>
      </div>

      <div className="inputAICategories">
        {categories.map((cat, index) => (
          <button
            key={index}
            className="inputAICategoryBtn"
            onClick={() => handleAutocomplete(cat)}
          >
            {cat}
            <span className="inputAICategoryIndex">{`0${index + 1}.`}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default InputAI;