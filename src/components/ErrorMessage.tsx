import './ErrorMessage.css';

type ErrorMessageProps = {
  errorText: string;
};

function ErrorMessage(props: ErrorMessageProps) {
  return (
    <div className="ErrorMessageWrapper">
      <h3 className="ErrorMessageTitle">Error</h3>
      <p className="ErrorMessageText">{props.errorText}</p>
    </div>
  );
}

export default ErrorMessage;
