import './Header.css';

type HeaderProps = {
  children: React.ReactNode;
};

function Header(props: HeaderProps) {
  return <header className="Header">{props.children}</header>;
}

export default Header;
