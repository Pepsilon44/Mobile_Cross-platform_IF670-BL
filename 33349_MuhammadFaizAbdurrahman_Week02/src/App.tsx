import { Redirect, Route } from 'react-router-dom';
import { 
  IonApp, IonContent, 
  IonGrid, IonRow, 
  IonCol, IonButton, 
  IonItem, IonLabel, 
  IonInput, IonIcon,
  IonHeader,
  IonTitle, IonToolbar, 
  IonCard, 
  IonCardContent 
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import { calculator, calculatorOutline, refreshOutline} from 'ionicons/icons';
import { useRef, useState } from 'react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {
  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);
  const[bmival, setbmival] = useState<number>(0);
  const[bmiCategory, setbmiCategory] = useState<string>('bruh');
  const[hiding, sethiding] = useState<Boolean>(false);


  const calculateBMI = () => {
    const enteredWeight = weightInputRef.current!.value;
    const enteredHeight = heightInputRef.current!.value;

    if(!enteredWeight || !enteredHeight) return;
    const bmi = +enteredWeight / ((+enteredHeight/100) * (+enteredHeight/100));

    setbmival(bmi);
    
    if(bmi < 18.5){
        setbmiCategory('Underweight');
    }else if(bmi < 25){
        setbmiCategory('Normal (Optimal)');
    }else if(bmi < 30){
        setbmiCategory('Overweight');
    }else if(bmi > 30){
        setbmiCategory('Obese');
    }else {
        setbmiCategory('Invalid input bambang');
    }

    sethiding(true);

    console.log(bmi);
    
  };

  const resetInputs = () => {
    weightInputRef.current!.value = '';
    heightInputRef.current!.value = '';

    sethiding(false);
  };


  return(
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle>BMI Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Tinggi badan(cm)</IonLabel>
                <IonInput ref={heightInputRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
           <IonCol>
              <IonItem>
                <IonLabel position="floating">Berat badan(kg)</IonLabel>
                <IonInput ref={weightInputRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow></IonRow>
          <IonRow class="ion-padding">
            <IonCol></IonCol>
            <IonCol className="ion-text-left">
              <IonButton onClick = {calculateBMI}>
                <IonIcon slot="start" icon={calculatorOutline}></IonIcon>
                Calculate
              </IonButton>
            </IonCol>
            <IonCol className="ion-text-right">
              <IonButton onClick = {resetInputs}>
                <IonIcon slot="start" icon={refreshOutline}></IonIcon>
                Reset
              </IonButton>
            </IonCol>
            <IonCol></IonCol>  
          </IonRow>
          <IonRow>
            <IonCol></IonCol>
            <IonCol className="ion-text-center">
          {hiding &&
              <IonCard class = 'ion-text-center'>
              <IonCardContent>
                <p>BMI Value: {bmival}</p>
               <h3>{bmiCategory}</h3>
              </IonCardContent>
              </IonCard>
            }
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>

    </IonApp>
    )
  };

export default App;
