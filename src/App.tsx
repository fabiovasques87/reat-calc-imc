import { useState } from 'react';
import styles from './App.module.css';
import poweredImage from './assets/powered.png';
import leftArrowImage from './assets/leftarrow.png';
import {Griditem} from './components/Griditem';
import {levels, calculateImc, Level} from './helpers/imc';

const App = () =>{

  const[heightField, setHeightFild] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState <Level | null > (null);

  const handleCalculateButton = () => {
    if(heightField && weightField){
      setToShow(calculateImc(heightField, weightField));  
    }else {
      alert("Digite todos os campos.");
    }
  }


  const handleBackButton = () =>{
    setToShow(null);
    setHeightFild(0);
    setWeightField(0);
  }

  return (
    <div className={styles.maim}>
      <header>
          <div className={styles.headerContainer}>
              <img src={poweredImage} alt="" width={150}/>
          </div>
      </header>
      <div className={styles.container}>
          <div className={styles.leftSide}>
              <h1>Calcule o seu IMC</h1>
              <p>
                s simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it 
              </p>

              <input 
                type="number"
                placeholder='Digite a sua altura. EX: 1.5 (em metros)'
                value={heightField > 0 ? heightField:''}
                onChange={e => setHeightFild(parseFloat(e.target.value))} 
                disabled={toShow ? true : false}
                />
                <input 
                type="number"
                placeholder='Digite o seu peso. Ex: 75.3 (em KG).'
                value={weightField > 0 ? weightField : ''}
                onChange={e => setWeightField(parseFloat(e.target.value))} 
                disabled={toShow ? true : false}

                />
                <button onClick={handleCalculateButton}disabled={toShow ? true : false}
                >Calcular</button>
          </div>
          <div className={styles.rightSide}>

            {/* Quando não tiver toShow */}
            {!toShow &&
              <div className={styles.grid}>
                  {levels.map((item,key)=>(
                      <Griditem key={key} item = {item} />
                  ))}
              </div>
            }  
            {/* Quando tiver toShow... */}
            {toShow && 

            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt="" width={25} />
              </div>
              <Griditem  item={toShow} />
            </div>

            }
          </div>
      </div>
    </div>
  )

}

export default App;