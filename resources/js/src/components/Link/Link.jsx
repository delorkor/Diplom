export const Link = ({ url, onClick, children, className, onChange }) => {
  return (
    <a  className={className} onClick={onClick} onChange={onChange}>
      {children}
    </a>
  );
};
