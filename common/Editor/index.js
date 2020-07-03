// import React, { Component } from 'react';
// import BraftEditor from 'braft-editor';
// import PropTypes from 'prop-types';
// import 'braft-editor/dist/index.css';

// class Editor extends Component {
//     state = {
//         editorState: BraftEditor.createEditorState(null)
//     };

//     async componentDidMount() {
//     }

//     getEditorValue = () => {
//         let editorValue;
//         const { editorState } = this.state;
//         const { value = null } = this.props;
//         if (value) {
//             editorValue = BraftEditor.createEditorState(value);
//         } else {
//             editorValue = editorState;
//         }
//         return editorValue;
//     }

//     handleEditorChange = (editorState) => {
//         console.log(11111111, editorState);
//         const htmlContent = editorState.toHTML();
//         this.setState({ editorState });
//         this.props.onChange && this.props.onChange(htmlContent);
//     }

//     render() {
//         // const editorValue = this.getEditorValue();
//         const editorValue = BraftEditor.createEditorState(this.props.value);
//         // const editorValue = this.state.editorState;
//         console.log('editorValue', editorValue);
//         return (
//             <div className="common-editor">
//                 <BraftEditor
//                     value={editorValue}
//                     onChange={this.handleEditorChange}
//                     onSave={this.submitContent}
//                 />
//             </div>
//         );
//     }
// }

// Editor.propTypes = {
//     onChange: PropTypes.func,
//     value: PropTypes.string,
// };

// export default Editor;
