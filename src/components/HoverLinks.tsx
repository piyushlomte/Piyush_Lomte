import "./styles/style.css";

const HoverLinks = ({ text, cursor }: { text: string; cursor?: boolean }) => {
  return (
    <div className="hover-link" data-cursor={!cursor && `disable`}>
      <div className="hover-in">
        <span>{text}</span>
        <div>{text}</div>
      </div>
    </div>
  );
};

export default HoverLinks;

