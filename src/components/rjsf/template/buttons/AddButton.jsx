
/** The `AddButton` renders a button that represent the `Add` action on a form
 */
const AddButton = (props) => {
  const {
    schema,
    registry,
    uiSchema,
    onAddClick,
    description,
    formContext,
    formData,
    idSchema,
    properties,
    ...rest
  } = props;

  const { label } = uiSchema.addButton;

  const onClick = (e) => {

  };

  // return (
  //   <div className="row">
  //     <p className={`col-xs-3 col-xs-offset-9 text-right ${className}`}>
  //       <IconButton
  //         iconType="info"
  //         icon="plus"
  //         className="btn-add col-xs-12"
  //         title="Add"
  //         onClick={onClick}
  //         disabled={disabled}
  //         registry={registry}
  //       />
  //     </p>
  //   </div>
  // );

  return (<span role="button" onClick={onAddClick}{...rest}><span>&#43;</span>{label && <span>&nbsp;{label}</span>}</span>)
};

export default AddButton;