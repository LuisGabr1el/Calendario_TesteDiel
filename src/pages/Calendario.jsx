import React, { useState } from "react";
import moment from 'moment';
import {Calendar, Views, momentLocalizer} from 'react-big-calendar'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css"
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import './components/Components-Calendario-Css.css'
import Adicionar from "./components/adicionar/Adicionar";

import eventosPadrao from "./components/eventosPadrao";
import EventModal from "./components/EventModal";

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

const eventStyle = (event) => ({
    style:{
        backgroundColor: event.color,
    },

})

function Calendario(){
    const [eventos, setEventos] = useState(eventosPadrao)
    const[eventoSelecionado, SeteventoSelecionado] = useState(null);

    const moverEventos = (data) => {
        const {start, end} = data;
        const updatadEvents = eventos.map((event) => {
            if(event.id === data.event.id){
                return{
                    ...event,
                    start: new Date(start),
                    end: new Date(end)
                };
            }
            return event; 
        });
        setEventos(updatadEvents)
    }

    const handleEventClick = (evento) => {
        SeteventoSelecionado(evento);
    }

    const handleEventClose = () =>{
        SeteventoSelecionado(null);
    }

    const handleAdicionar = (novoEvento) =>{
        setEventos([...eventos,{...novoEvento,id:eventos.length + 1}]);
    }
    return(
        <div className="tela">
            <div className="toolbar">
                <Adicionar onAdicionar={handleAdicionar}/>
            </div>
        
            <div className="calendario">
                <DragAndDropCalendar
                defaultDate={moment().toDate()}
                defaultView='month'
                events={eventos}
                localizer={localizer}
                resizable
                onEventDrop={moverEventos}
                onEventResize={moverEventos}
                onSelectEvent={handleEventClick}
                eventPropGetter={eventStyle}
                components={{
                    toolbar:CustomTollbar,
                }}
                className='calendar'
                />
                {eventoSelecionado &&(
                    <EventModal evento={eventoSelecionado} onClose={handleEventClose}
                    />
                )}
             </div>
            
        </div>
    )
}
const CustomTollbar = ({label, onView, onNavigate, views}) => {
   const[itemText,setItemText] = useState('month');

    return(
        <div className="toolbar-container">
            <h1 className="mesAno">{label}</h1>

        <div className="dirtop">
            <div className="dropdown">
                <button className='btn btn-secondary dropdown-toggle' type='button' id='dropdownMenuButton' data-bs-toggle="dropdown" aria-expanded="false">
                     {itemText}
                 </button>
                <ul className= 'dropdown-menu' aria-labelledby='dropdownMenuButton'>
                     {views.map((view,index) =>(
                        <div kay={index}>
                              <li>
                                   <button className='dropdown-item' onClick={()=>onView(view)+ setItemText(view)}>{view}

                                   </button>
                             </li>
                             {index === 2 &&<hr className='dropdown-devider'></hr>}
                        </div>
                     ))}
                </ul>=
             </div>

             <div className="toolbar-navegation">
                <button className='btn btn-secundary btn-ls mr-2 border-0' onClick={() => onNavigate('TODAY')}>Hoje</button>
                <button className='btn btn-sm mr-2 text-secondary' onClick={()=>onNavigate('PREV')} style={{marginLeft:'15px'}}><i class="bi-caret-left"></i></button>
                <button className='btn btn-sm mr-2 text-secondary' onClick={()=>onNavigate('NEXT')}><i class="bi-caret-right"></i></button>

             </div>
         </div>

     </div>   
) 
}

export default Calendario;