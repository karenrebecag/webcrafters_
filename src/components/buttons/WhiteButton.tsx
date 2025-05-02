import './whiteButton.css';

interface WhiteButtonProps {
  label: string;
  onClick?: () => void;
}

export default function WhiteButton({ label, onClick }: WhiteButtonProps) {
  return (
    <button className="WhiteButton" onClick={onClick}>
      <span>{label}</span>
      <img src="/assets/icons/ArrowUp.svg" alt="Arrow Icon" />
    </button>
  );
}