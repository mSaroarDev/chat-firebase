type LabelProps = {
  children?: React.ReactNode;
  notRequired?: boolean;
};

const Label = ({
  children = "Label",
  notRequired = false
}: LabelProps) => {
  return (
    <>
      <label>
        {children}
        {!notRequired && <span className="text-red-500">*</span>}
      </label>
    </>
  );
};

export default Label;