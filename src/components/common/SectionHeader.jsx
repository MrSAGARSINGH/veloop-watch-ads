import "./SectionHeader.scss";

function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  onAction,
}) {
  return (
    <header
      className="sectionHeader"
      aria-label={title || "Section"}
    >
      <div className="sectionHeaderContent">
        {eyebrow && (
          <span className="sectionHeaderEyebrow">
            {eyebrow}
          </span>
        )}

        {title && (
          <h2 className="sectionHeaderTitle">
            {title}
          </h2>
        )}

        {description && (
          <p className="sectionHeaderDescription">
            {description}
          </p>
        )}
      </div>

      {action && (
        <button
          type="button"
          className="sectionHeaderAction"
          onClick={onAction}
          aria-label={action}
        >
          {action}
        </button>
      )}
    </header>
  );
}

export default SectionHeader;