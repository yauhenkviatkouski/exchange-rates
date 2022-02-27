import './CurrencyTableWrapper.css';

type CurrencyTableWrapperProps = {
  children: React.ReactNode;
};

function CurrencyTableWrapper(props: CurrencyTableWrapperProps) {
  return <div className="CurrencyTableWrapper">{props.children}</div>;
}

export default CurrencyTableWrapper;
