import "./NonExpand.css";

const NonExpand = ({ title, children, onExpand, id, expandId }) => {
  // const isExpanded = expandId === id

  // const handleClick = (e) => {
  //   isExpanded ?
  //   onExpand(null) : onExpand(id)
  // };

  return (
    <div className="no-expand-card expanded">
      <div className="no-expand-card-header">
        <h2 style={{ display: "block" }}>{title}</h2>
      </div>
      <div className="no-expand-card-content">{children}</div>
      {/* {isExpanded && <div className="expand-card-content">{children}</div>} */}
    </div>
  );
};

export default NonExpand;
