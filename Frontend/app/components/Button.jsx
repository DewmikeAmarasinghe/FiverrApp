const Button = ({ className, content }) => {
  return (
    <div className={`text-center hover:opacity-80 transition-opacity ${className || 'px-6 py-4 text-slate-700 border capitalize border-slate-200'}`}>
      {content}
    </div>
  );
};
export default Button