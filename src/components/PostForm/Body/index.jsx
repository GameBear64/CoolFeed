import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import emojiPicker from './../../../utils/emojiPicker';

export function PostFormBody({ postBody, setPostBody }) {
  const handleBodyChange = event => {
    setPostBody(s => ({ ...s, body: emojiPicker(event.target.value) }));
  };

  const handleStatusChange = event => {
    setPostBody(s => ({ ...s, status: emojiPicker(event.target.value) }));
  };

  ValidatorForm.addValidationRule('isPost', value => {
    return value.length <= 2000;
  });

  ValidatorForm.addValidationRule('isStatus', value => {
    return value.length <= 30;
  });

  return (
    <ValidatorForm>
      <TextValidator id="postStatus" label="How are you feeling today?" size="small" value={postBody.status} onChange={handleStatusChange} style={{ width: '95%' }} validators={['isStatus']} errorMessages={['Status too big']} />
      <TextValidator id="postBody" label="Got something cool to share?" multiline rows={2} value={postBody.body} onChange={handleBodyChange} style={{ width: '95%' }} validators={['isPost']} errorMessages={['Post too big']} />
    </ValidatorForm>
  );
}
