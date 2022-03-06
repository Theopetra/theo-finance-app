const CardList: React.FC<{ className?: string }> = ({ children, className }) => {
  return (
    <div className={`grid grid-cols-3 gap-4 ${className}`}>{children}</div>
  );
};
export default CardList;
