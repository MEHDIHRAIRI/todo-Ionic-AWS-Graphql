import React, { useEffect, useState, useRef } from "react";
import {
  IonContent,
  IonPage,
  IonItem,
  IonInput,
  IonCard,
  IonDatetime,
  IonButton,
  useIonToast,
} from "@ionic/react";
import { useForm, SubmitHandler } from "react-hook-form";

import "./Tasks.css";

type Inputs = {
  title: string;
  date: string;
  time:string;
};

const Tasks: React.FC = () => {
  var today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const [text, setText] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>(date);
  const [saveFlag, setSaveFlag] = useState(false);
  const [present, dismiss] = useIonToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setSaveFlag(true);
    console.log(data);
  };
  console.log(errors);

  useEffect(() => {
    if (saveFlag) {
      console.log(
        "Button Cliled values are(Title: " +
          text +
          ", Date: " +
          selectedDate +
          ")."
      );
      //axios here
      present({
        buttons: [{ text: "hide", handler: () => dismiss() }],
        message: "Task added",
        onDidDismiss: () => console.log("dismissed"),
        onWillDismiss: () => console.log("will dismiss"),
      });
    }
  }, [saveFlag]);
  return (
    <IonPage>
      <IonContent>
        <div className="start">
          <h1 className="text-6xl text-white flex justify-center my-16">
            <b>Task</b>
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <IonCard>
              <IonItem>
                <IonInput
                  {...register("title", { required: true })}
                  clearInput={true}
                  placeholder="task title"
                  onIonChange={(e) => setText(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCard>
              {errors.title && <p className="text-red-500 ml-4 -mt-1" >Title is required</p>}
            <IonCard>
              <IonItem>
                <IonDatetime
                  min="2021-07"
                  max="2050"
                  displayFormat="YYYY MMM DD"
                  monthShortNames="jan, feb, mar, apr, mai, jun, jul, aug, sep, okt, nov, des"
                  value={selectedDate}
                  {...register("date", { required: true })}
                  onIonChange={(e) => setSelectedDate(e.detail.value!)}
                  placeholder="due date"
                ></IonDatetime>
              </IonItem>
              {errors.date && <p>Date is required</p>}
            </IonCard>
            <IonCard>
              <IonItem>
                <IonDatetime
                  placeholder="due time"
                  displayFormat="h:mm A"
                  minuteValues="0,15,30,45"
                  value={selectedDate}
                  {...register("time", { required: true })}
                  onIonChange={(e) => setSelectedDate(e.detail.value!)}
                ></IonDatetime>
              </IonItem>
              {errors.date && <p>Time is required</p>}
            </IonCard>
          <IonButton className="flex justify-center mx-8 my-8" type="submit">
            Save
          </IonButton>
          
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tasks;
