import logo from './logo.svg';
import { useEffect, useState} from 'react'
import './App.css'; 
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

const App = ()=>{
  console.log('render')
  const [searchFild, setSearchFild] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteremonsters, setFiltereMonsters] = useState(monsters);
  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users').then((response)=>response.json())
    .then((users)=>setMonsters(users)
    ).catch(err => console.log(err))
  },[])

  useEffect(()=>{
    const newfilteredMonstar = monsters.filter((monstar)=>{
      return monstar.name.toLocaleLowerCase().includes(searchFild)
     })
     setFiltereMonsters(newfilteredMonstar)
  },[monsters,searchFild]);


 const onsearchChange = (event)=>{
      console.log(event.target.value)
      const searchFildString = event.target.value.toLocaleLowerCase();
      setSearchFild(searchFildString)
      }
    

  return (
    <div className="App">
      <header>
       <h1 className='app-title'>Monster List</h1>
      <SearchBox
       onChangeHandler={onsearchChange}
       placeholder='search monsters'
       className='search-box'
       /> 
       <CardList monsters={filteremonsters} />
      
      </header>
    </div>
  );
}
export default App;
