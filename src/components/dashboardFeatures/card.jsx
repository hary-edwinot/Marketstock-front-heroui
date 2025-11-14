const CardSideValue = ({ title, total, description, icon }) => {
  return (
    <div className="dark:bg-content2 bg-content1 rounded-2xl p-4 flex items-center justify-between">
      <div className="flex items-center">
        {icon}
        <div className="ml-2">
          <h3 className="text-sm font-bold">{title}</h3>
          <p className="text-xs">{description}</p>
        </div>
      </div>
      <span className="text-lg font-bold">{total}</span>
    </div>
  );
};
export default CardSideValue;