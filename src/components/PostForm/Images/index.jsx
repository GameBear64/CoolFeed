import { Button, Icon, Grid } from '@mui/material';
import cc from 'coupon-code';

import { ImageIndicator } from './styles';

export function PostFormImages({ postBody, setPostBody }) {
  const handleFileChange = event => {
    let file = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      let imgName = `CF${cc.generate({ parts: 1, partLen: 5 }).toLocaleLowerCase()}_${file.name}`;
      setPostBody(postBody => ({
        ...postBody,
        images: [...postBody.images, { name: imgName, data: reader.result }],
      }));
    };
  };

  const handleRemoveImage = event => {
    let filteredImages = postBody.images.filter(img => img.name !== event);
    setPostBody(s => ({ ...s, images: filteredImages }));
  };

  return (
    <Grid id="postImageComponent" container justifyContent="center" direction="column" style={{ marginBottom: '2vh' }}>
      {postBody.images &&
        postBody.images.map(img => (
          <ImageIndicator key={img.name}>
            {img.name}
            <Icon onClick={() => handleRemoveImage(img.name)}>close</Icon>
          </ImageIndicator>
        ))}

      <Button component="label" style={{ width: '40%', margin: 'auto' }}>
        Upload File
        <input type="file" hidden onChange={handleFileChange} />
      </Button>
    </Grid>
  );
}
