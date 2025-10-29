const Card = ({ children, className, ...rest }) => {
  return (
    <div 
      className={`bg-white shadow-md rounded-xl p-5 m-5 ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;