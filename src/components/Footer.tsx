import './Footer.css';

type FooterProps = {
  children: React.ReactNode;
};

function Footer(props: FooterProps) {
  return <footer className="Footer">{props.children}</footer>;
}

export default Footer;
