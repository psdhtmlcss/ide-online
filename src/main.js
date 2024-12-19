const URL = 'https://my-json-server.typicode.com/psdhtmlcss/db/modes/';
const Modes = {
  HTML: 1,
  CSS: 2
};
const editor = ace.edit('editor');
const result = document.querySelector('.js-result pre');
const select = document.querySelector('.js-select-mode');
const runButton = document.querySelector('.js-run');

editor.session.setMode('ace/mode/html');

function clearResult() {
  result.innerHTML = '';
}

function renderResult(data) {
  clearResult()
  result.insertAdjacentText('afterbegin', data);
}

function onSelectChange(evt)  {
  editor.session.setMode(`ace/mode/${evt.target.value}`);
  editor.setValue('');
  clearResult();
}

function onRunButtonClick(evt) {
  evt.preventDefault();
  const data = {
    language: select[select.selectedIndex].value,
    code: editor.getValue()
  };
  runButton.disabled = true;
  fetch(`${URL}${Modes[select[select.selectedIndex].value.toUpperCase()]}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(results => renderResult(results.code))
    .catch((error) => alert(error))
    .finally(() => runButton.disabled = false)
}

select.addEventListener('change', onSelectChange);
runButton.addEventListener('click', onRunButtonClick);

