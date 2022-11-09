import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';

class AddPost extends Component {
  state = {
    title: '',
    desc: '',
  };

  addUser = (e) => {
    e.preventDefault();
    this.props.addPost({ id: uuid(), ...this.state });
    this.setState({
      title: '',
      desc: '',
    });
    this.props.navigate('/');
  };

  render() {
    // const { navigate } = this.props;
    return (
      <div className='card bg-dark px-5'>
        <h3 className='text-white text-center mt-3'>Add new Post</h3>
        <form onSubmit={this.addUser}>
          <div className='mb-1'>
            <label htmlFor='title' className='form-label text-warning'>
              Post Title
            </label>
            <input
              type='text'
              className='form-control rounded-0'
              id='title'
              onChange={(e) => this.setState({ title: e.target.value })}
              value={this.state.title}
            />
          </div>
          <div className='mb-3 mt-3'>
            <label htmlFor='desc' className='form-label text-warning'>
              Post Description
            </label>
            <input
              type='text'
              className='form-control rounded-0'
              id='desc'
              onChange={(e) => this.setState({ desc: e.target.value })}
              value={this.state.desc}
            />
          </div>
          <button
            type='submit'
            className='btn btn-primary btn-sm float-end mb-3'
          >
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default (props) => {
  const navigator = useNavigate();
  return <AddPost {...props} navigate={navigator} />;
};
