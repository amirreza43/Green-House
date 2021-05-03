import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import axios from 'axios'

const PostForm = ({addPost}) => {

    const [text, setText] = useState('')
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setuploadedFilename] = useState({});

    const onChange = e => {
      setFile(e.target.files[0]);
      setFilename(e.target.files[0].name);
   };

  const onSubmit = async e =>{
      e.preventDefault();
      const formData = new FormData();
      formData.append('avatar', file);

      try {
        if(file){
          const res = await axios.post('/api/post/upload', formData, {
              headers: {
                 'Content-Type': 'multipart/from-data',
                 'enctype': 'multipart/form-data'
              }
          });
          console.log(res.data.Loc[0]);

          const fileName = res.data.Loc[0].originalname;
          const filePath = res.data.Loc[0].location;

          addPost({ text, fileName, filePath });
          setText('');

          setuploadedFilename({fileName, filePath});

        }else{
          addPost({ text})
        }

          window.location.href=window.location.href;
      }catch(err){
          console.log(err);
      }
  }

    return (
      <div class="post-form">
        <form
        className='form my-1'
        onSubmit={onSubmit}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Write something...'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <button type='submit' className='btn my'>Submit Post</button>
      </form>
      <Fragment>
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <div className="custom-file mb-4">
                    <input type="file" className="custom-file-input" id="customFile" name='avatar' onChange={ onChange }/>
                    <label className="custom-file-label" htmlFor="customFile">{filename}</label>
                </div>
            </form>
        </Fragment>
    </div>
    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
}

export default connect(null, {addPost})(PostForm)
