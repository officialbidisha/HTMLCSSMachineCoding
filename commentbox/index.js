let container = document.getElementsByClassName("comment_container")?.[0];
const createElement = (elementType = "div", properties, ...children) => {
  const element = document.createElement(elementType);
  for (let key in properties) {
    element[key] = properties[key];
  }

  children.forEach((child) => element.appendChild(child));
  return element;
};

/**
 * Create comment is nested as we might need to build the same structure repeatedly
 * @param {*} name 
 * @param {*} text 
 * @param {*} settings 
 * @returns 
 */
const createComment = (text, settings) => {
    text = text.replaceAll('\n', '<br/>');
    const p2 = createElement('p', {innerHTML:text, className:'comment-text'});

    const buttons = [];
    let reply = createElement('button', {textContent: 'Reply', className: 'btn btn-primary small reply'})
    buttons.push(reply);
    if(settings?.hasEdit){
        editBtn = createElement('button', {textContent: 'Edit', className: 'btn btn-primary small edit'});
        buttons.push(editBtn);
    }
    if(settings?.hasDelete){
        deleteBtn = createElement('button', {textContent: 'Delete', className:'btn btn-primary small delete'});
        buttons.push(deleteBtn);
    }

    const buttonHolder = createElement('div', {className: 'btn-holder'}, ...buttons);
    const mainComment = createElement('div', {className:'main-comment'},p2,buttonHolder);
    const subComments = createElement('div', {className: 'sub-comment'} );
    return createElement('div', {className: 'comment'}, mainComment, subComments);
}

const createCommentInput = () => {
    let commentInput = createElement('textarea',{placeholder: 'Your comment'});
    const postBtn = createElement('button', { textContent: 'Post', className: 'btn btn-primary small post' });
    const cancelBtn = createElement('button', { textContent: 'Cancel', className: 'btn btn-primary small cancel' });
    const btnHolder = createElement('div', { className: 'btn-holder' }, postBtn, cancelBtn);
    return createElement('div', {className:'comment'}, commentInput, btnHolder);
}

const toggleNeighbours = target => {
  target.nextElementSibling.disabled = !target.nextElementSibling.disabled;
  target.previousElementSibling.disabled = !target.previousElementSibling.disabled;
};

let comment = createComment('Is GreatFrontend worth it?')
container.appendChild(comment);
let isCommentOn = false;
container.addEventListener('click', (e)=> {
   const target = e.target;
   if(target.tagName.toLowerCase() === 'button'){
      /**
       * If the comment is not on, find the closest main comment
       * And turn the comment on for that content
       */
      if(target.classList.contains('reply') && !isCommentOn){
        target.closest('.main-comment').nextElementSibling.appendChild(createCommentInput());
        isCommentOn = true;
      }

      /**
       * Post the comment on the comment box
       */
      if(target.classList.contains('post')){
        const subCommentContainer = target.closest('.sub-comment');
        const comment = target.closest('.comment');
        const description = comment.children[0].value;
        let newComment = createComment(description, {hasEdit:true, hasDelete: true});
        subCommentContainer.appendChild(newComment);
        comment.remove();
        isCommentOn = false;
        return;
      }

      if (target.classList.contains('cancel')) {
        target.closest('.comment').remove();
        isCommentOn = false;
        return;
      }
      
      if(target.classList.contains('edit')){
        target.textContent = 'Save';
        target.className = 'btn btn-primary save small';
        toggleNeighbours(target);
        target.closest('.main-comment').children[0].contentEditable = true;
        return;
      }

      if (target.classList.contains('save')) {
        const commentText = target.closest('.main-comment').children[0];
  
        if (!commentText.textContent) return;
        target.textContent = 'Edit';
        target.className = 'btn btn-primary small edit';
  
        commentText.contentEditable = false;
        toggleNeighbours(target);
        return;
      }

      if (target.classList.contains('delete')) {
        target.closest('.comment').remove();
        return;
      }
  
      if (target.classList.contains('cancel')) {
        target.closest('.comment').remove();
        isCommentOn = false;
        return;
      }

   }
})