const TitleFieldTemplate = ({title, required, id}) => {
  return (
    <label htmlFor={id}>{title}{required && <span>&nbsp;*</span>}</label>
  );
};

export default TitleFieldTemplate;