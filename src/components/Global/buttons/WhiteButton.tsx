import './whiteButton.css';

interface WhiteButtonProps {
  label: string;
  onClick?: () => void;
}

export default function WhiteButton({ label, onClick }: WhiteButtonProps) {
  return (
    <button className="WhiteButton" onClick={onClick}>
      <span>{label}</span>
      <img
        src="https://r2-images-webcrafters.karen-ortizg.workers.dev/ArrowUp.svg"
        alt="Arrow Icon"
        className="WhiteButtonIcon"
      />
    </button>
  );
}