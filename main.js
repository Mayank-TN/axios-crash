// GET REQUEST
async function getTodos() {
  try {
    let result = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
    showOutput(result)
  }
  catch (error) {
    console.log(error)
  }
}

// POST REQUEST
async function addTodo() {
  let data = {
    title : 'Shooping',
    completed : false
  }
  let result = await axios.post('https://jsonplaceholder.typicode.com/todos' , data)
  showOutput(result)
}

// PUT/PATCH REQUEST
async function updateTodo() {
  let newData = {
    title : "Update Todo",
    completed : true
  }
  let result = await axios.patch('https://jsonplaceholder.typicode.com/todos/1' , newData)
  showOutput(result)
}

// DELETE REQUEST
async function removeTodo() {
  let result = await axios.delete('https://jsonplaceholder.typicode.com/todos/200')
  showOutput(result)
}

// SIMULTANEOUS DATA
async function getData() {
  let [todos , posts] = await axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos'),
    axios.get('https://jsonplaceholder.typicode.com/posts')
  ])

  console.log(todos)
  console.log(posts)
  showOutput(posts)
}

// CUSTOM HEADERS
async function customHeaders() {
  let data = {
    title : 'Shooping',
    completed : false
  }
  let config = {
    headers : {
    "Content-type" : "application/json" ,
    Authorization : false
    }
  }
  let result = await axios.post('https://jsonplaceholder.typicode.com/todos' , data , config)
  showOutput(result)
  
}

// TRANSFORMING REQUESTS & RESPONSES
async function transformResponse() {
  options = {
    method : 'post' ,
    url : 'https://jsonplaceholder.typicode.com/todos' ,
    data : {
      title : 'hello world'
    },
    transformResponse : axios.defaults.transformResponse.concat(data=>{
      data.title = data.title.toUpperCase()
      return data
    })
  }
  let result = await axios(options)
  showOutput(result)
  console.log('Transform Response');
}

// ERROR HANDLING
async function errorHandling() {
  try {
    let result = await axios.get('https://jsonplaceholder.typicode.com/todoss?_limit=5')
    showOutput(result)
  }
  catch (error) {
    console.log(error.response.data)
    console.log(error.response.status)
  }
}

// CANCEL TOKEN
async function cancelToken() {
  const source = axios.CancelToken.source()
  if(true){
    source.cancel('Request Cancel')
  }
  try{
  let result = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5' ,{
    cancelToken : source.token
  } )
    showOutput(result)
}catch(error){
  if(axios.isCancel(error)) console.log('Request Cancelled ' + error.message)
}


}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(config => {
  console.log(`${config.method.toUpperCase()} is sent to ${config.url} at ${new Date()}`)
  return config
}
)

// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document.getElementById('transform').addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);

