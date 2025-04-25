const MyDialog = ({
  open,
  close,
  className,
  children,
}: {
  open: boolean;
  close: () => void;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`z-10 ${className} ${!open ? "slide-in-from-right" : "slide-out-to-right"}`}
    >
      {children}
    </div>
  );
};

export default MyDialog;
