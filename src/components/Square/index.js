import './index.css'

export default function Square(props) {
  const { value, last, onClick } = props;
  return (
    <button
      className={`square square-${value} ${last ? 'square-last' : ''} `}
      onClick={onClick}
    >
      {value}
    </button>
  );
}
