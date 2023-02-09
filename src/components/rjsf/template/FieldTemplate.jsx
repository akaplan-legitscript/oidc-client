const FieldTemplate = (props) => {
  const { description, label, children, errors, help, registry, schema } = props;
  const { TitleFieldTemplate } = registry.templates;

  if (schema.type === 'object' || schema.type === 'array') {
    return (
      <>
        {children}
        {errors}
        {help}
      </>
    );
  } else {
    return (
      <div>
        <TitleFieldTemplate title={label} {...props} />
        {children}
        {description}
        {errors}
        {help}
      </div>
    );
  }

};

export default FieldTemplate;