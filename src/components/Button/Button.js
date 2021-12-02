import './Button.css';

function Button({ text, _className, onClick }) {
  return (
    <button
      className={_className || ''} 
      onClick={onClick}>
      { _className ? '' : text }
    </button>
  );
}

export default Button;