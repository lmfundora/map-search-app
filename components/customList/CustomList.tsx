type props = {
  items: any[];
  className: string;
  renderItem: (item: any) => React.ReactNode;
};

const CustomList = ({ items, className, renderItem }: props) => {
  return (
    <div
      className={`${className} overflow-y-auto justify-around flex flex-col gap-5 relative bg-yellow-300`}
    >
      <div className="h-10 w-full bg-gradient-to-b from-black fixed top-0"></div>

      {items.map((item, index) => (
        <div key={index}>{renderItem(item)}</div>
      ))}
    </div>
  );
};
export default CustomList;
