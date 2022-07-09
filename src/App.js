import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function Header(props) {
  return <header>
  <h1><a href="/" onClick={(event)=>{
    event.preventDefault();
    props.onChangeMode();
  }}>{props.title}</a></h1>
</header>
}

function Nav(props) {
  const lis = []
  for(let i=0; i<props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}><a id={t.id} href={'/read/'+t.id} onClick={event=>{
      event.preventDefault();
      props.onChangeMode(Number(event.target.id));
    }}>{t.title}</a></li>)
  }
  return <nav>
  <ol>
    {lis}
  </ol>
</nav>
}

function Article(props) {
  return <article>
  <h2>{props.title}</h2>
  {props.body}
</article>
}

function Create(props) {
  return <article>
    <h2>Create</h2>
    <form onSubmit={event =>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type="text" name="title" placeholder='title'/></p>
      <p><textarea name="body" placeholder='body'></textarea></p>
      <p><input type='submit' value='Create'></input></p>
    </form>
  </article>
}

function App() {
  const[mode, setMode] = useState('Welcome');
  const[id, setId] = useState(null);

  const topics = [
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'js', body:'js is ...'},
  ]
  let content = null;

  if (mode === 'Welcome'){
    content = <Article title="Welcome" body ="Hello, WEB"></Article>
  }else if (mode === 'Read'){
    let title, body = null;
    for(let i=0; i < topics.length; i++) {
      if(topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body
      }
    }
    content = <Article title={title} body = {body}></Article>
  }else if(mode === 'Create') {
    content = <Create onCreate={(title, body)=>{

    }}></Create>
  }

  return (
    <div>
        <Header title="REACT" onChangeMode={()=>{
          setMode('Welcome');
        }}></Header>
        <Nav topics={topics} onChangeMode={(_id)=>{
          setMode('Read');
          setId(_id);
        }}></Nav>
        {content}
        <a href="/create" onClick={event=>{
          event.preventDefault();
          setMode('Create');
        }}>Create</a>
    </div>
  );
}

export default App;
