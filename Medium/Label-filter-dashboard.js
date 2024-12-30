import styled from 'styled-components';
import {useState, useEffect} from 'react';

const animalData = [
  { name: 'Eagle', class: 'Birds' },
  { name: 'Penguin', class: 'Birds' },
  { name: 'Parrot', class: 'Birds' },
  { name: 'Lion', class: 'Mammals' },
  { name: 'Tiger', class: 'Mammals' },
  { name: 'Elephant', class: 'Mammals' },
  { name: 'Cobra', class: 'Reptiles' },
  { name: 'Lizard', class: 'Reptiles' },
  { name: 'Tortoise', class: 'Reptiles' },
  { name: 'Salmon', class: 'Fish' },
  { name: 'Shark', class: 'Fish' },
  { name: 'Trout', class: 'Fish' },
];

const LabelFilter = () => {
  const animalClasses = Array.from(new Set(animalData.map((animal) => animal.class)));
  const [selectedLabel, setSelectedlabel] = useState([]);
  const [selectedData, setSelectedData] = useState(animalData);

  useEffect(()=>{
    if(selectedLabel.length === 0){
      setSelectedData(animalData);
    } else{
      setSelectedData(animalData.filter((animal) => selectedLabel.includes(animal.class)));
    }
  },[selectedLabel]);
  
  const handleLabelClick = (label)=>{
    setSelectedlabel((prevSelectedLabel) => {
      if(prevSelectedLabel.includes(label)){
        return prevSelectedLabel.filter((item)=>{return item !== label});
      } else{
        return [ ...prevSelectedLabel, label];
      }
    })
  }

  return (
    <Wrapper>
      <div data-testid='labels-wrapper-id' className='label-container'>
        {animalClasses.map((animalClass) => (
          <div 
            data-testid='label-id'
            className='label'
            key={animalClass}
            onClick={()=>handleLabelClick(animalClass)}
            style = {{
              'backgroundColor': selectedLabel.includes(animalClass) ? "#333":"#fff",
              'color': selectedLabel.includes(animalClass) ? "#fff" : "#333"
            }}
          >
            {animalClass}
          </div>
        ))}
      </div>
      <div data-testid='tile-container-id' className='tile-container'>
        {selectedData.map((animal) => (
          <div data-testid='animal-tile-id' className='tile' key={animal.name}>{animal.name}</div>
        ))}
      </div>
    </Wrapper>
  );
};

export default LabelFilter;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: sans-serif;
  margin: 24px;
  gap: 24px;

  .label-container {
    display: flex;
    flex-direction: row;
    gap: 12px;

    .label {
      background-color: #fff;
      color: #333;
      border: 1px solid #333;
      border-radius: 4px;
      margin-bottom: 8px;
      padding: 6px 12px;
      cursor: pointer;
      transition: 0.1s ease-in-out;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  .tile-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;

    .tile {
      background-color: #333;
      color: #fff;
      padding: 12px;
      border-radius: 4px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60px;
      min-width: 120px;
    }
  }
`;