import React from 'react';
import Button from "react-bootstrap/Button";
import HistogramChart from '../visualTools/HistogramChart';

export default function Stats({notes1, notes2}) {

  //const [ai, setAI] = useState('');

  const show= () => {
    console.log(notes1, notes2);
  }

  return (
    <>
    {notes1 ? (
      <div>
        <h1>Contour :</h1>
        <HistogramChart L1={notes1} L2={notes2}/>
      </div>
    ) : (
    <section className="Stats">
      <h1>Statistics</h1>
    </section>
  )}
    </>
  );
}