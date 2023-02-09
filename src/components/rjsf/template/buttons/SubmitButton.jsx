import { getSubmitButtonOptions } from "@rjsf/utils";

const SubmitButton = (props) => {
  const { uiSchema } = props;
  const options = getSubmitButtonOptions(uiSchema);
  if (options.norender) {
    return null;
  }
  return (<button type="submit" {...options.props}>{options.submitText}</button>);
};

export default SubmitButton;