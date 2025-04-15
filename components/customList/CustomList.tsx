type props = {
  items: any[];
  className: string;
  renderItem: (item: any) => React.ReactNode;
};

const CustomList = ({ items, className, renderItem }: props) => {
  return (
    <div className={`${className} overflow-y-auto`}>
      {items.map((item, index) => (
        <div key={index}>{renderItem(item)}</div>
      ))}
    </div>
  );
};
export default CustomList;
