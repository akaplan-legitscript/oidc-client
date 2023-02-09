import ReactMarkdown from 'react-markdown'

const DescrptionFieldTemplate = ({ description, id }) => {
  return (<small id={id}><ReactMarkdown children={description} /></small>);
};

export default DescrptionFieldTemplate;