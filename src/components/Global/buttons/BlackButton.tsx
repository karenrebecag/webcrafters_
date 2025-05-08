import './BlackButton.css';

interface BlackButtonProps {
  label: string;
  onClick?: () => void;
}

export default function BlackButton({ label, onClick }: BlackButtonProps) {
  return (
    <button className="BlackButton" onClick={onClick}>
      <span>{label}</span>
      <img
        src="https://r2-images-webcrafters.karen-ortizg.workers.dev/ArrowUp.svg"
        alt="Arrow Icon"
        className="BlackButtonIcon"
      />
    </button>
  );
}