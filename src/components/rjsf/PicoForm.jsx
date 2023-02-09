import { withTheme } from '@rjsf/core';
import templates from './template';
import widgets from './widget';

const PicoForm = withTheme({
  templates,
  widgets
})

export default PicoForm;