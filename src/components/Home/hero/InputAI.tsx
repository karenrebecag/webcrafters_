'use client';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import './inputAI.css';

const InputAI: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
    }
  }, [inputValue]);

  const handleSubmit = () => {
    console.log('Submitted:', inputValue);
  };

  return (
    <div className="inputAIContainer">
      <div className="inputAIWrapper">
        <textarea
          ref={inputRef}
          className="inputAIField"
          placeholder="How does webCrafters AI enhance productivity?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          rows={1}
        />
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
        <button className="inputAICategoryBtn">
          Artificial Intelligence <span className="inputAICategoryIndex">01.</span>
        </button>
        <button className="inputAICategoryBtn">
          Dynamic Web Development <span className="inputAICategoryIndex">02.</span>
        </button>
        <button className="inputAICategoryBtn">
          UX/UI Design <span className="inputAICategoryIndex">03.</span>
        </button>
      </div>
    </div>
  );
};

export default InputAI;
