import ReactMarkdown from 'react-markdown'

const ObjectFieldTemplate = (props) => {
  const { idSchema, schema, title, description, properties, registry } = props;
  const { AddButton } = registry.templates.ButtonTemplates;
  return (
    <article id={idSchema.$id}>
      <header>
        <div>{title}</div>
        <small><ReactMarkdown children={description} /></small>
      </header>
      {properties.map(element => element.content)}
      {schema.additionalProperties && (<div>
        <AddButton {...props} />
      </div>)}
    </article>
  );
};

export default ObjectFieldTemplate;