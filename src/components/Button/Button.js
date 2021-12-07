import './Button.css';

// General purpose button that has the onClick function provided
// If _className is defined, they style is applied, otherwise it puts the text 
// on the Button
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