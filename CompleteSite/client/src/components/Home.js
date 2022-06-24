import Axios from "axios";
import { useState, useEffect } from "react";
import * as React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AuthService from "../services/auth.service";
import HistogramChart from "../visualTools/HistogramChart";
import $ from 'jquery'; 
import './Home.css';

var frames = new Array(0);
var frames2 = new Array(0);

export default function Home({setGrades}) {
    
    const [title, setTitle] = useState('');
    const [grade, setGrade] = useState('');
    const [outline, setOutline] = useState('');
    const [score, setScore] = useState('');
    const [compare, setCompare] = useState(false);
    const [showtitle, setShowTitle] = useState(false);
    const [showcv, setShowCv] = useState(false);
    const [showcv2, setShowCv2] = useState(false);
    const [stats, setShowStats] = useState(false);
    const [notes, setNotes] = useState([]);
  
    useEffect(() => {    // Met à jour   
        document.getElementById("images").className = showtitle;},[showtitle]);
    useEffect(() => {    // Met à jour   
        document.getElementById("canvas1").className = showcv;},[showcv]);
    useEffect(() => {    // Met à jour   
        document.getElementById("canvas2").className = showcv2;},[showcv2]);

    var compt1 = 0;
    var z1 = 1;
    var config = 0;

    const search = async(e) => {
        e.preventDefault();

        setShowStats(false);

        try {
            const response = await AuthService.request(compare, outline);
            console.log(response.status);
            setTitle('Outline : '+ outline);
            var zone1 = document.getElementById("cv1");
            let im = parsingImageData(response.data);
            drawCanvas(zone1,im,z1)
            if(compare){
                var zone2 = document.getElementById("cv2");
                drawCanvas(zone2,frames2[0],z1)
                setShowCv2(true);
            }
            setShowTitle(true);
            setShowCv(true);
        }
        catch (e) {
            console.log('Error '+e);
        }
    }

    function drawCanvas(cv,im,scale){
        var canvas = document.getElementById(cv.id);
        var context = canvas.getContext("2d");
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        var image = new Image();
        image.src = im
        image.onload = function() {
            context.drawImage(image, 0, 0);
            console.log(compare)
        };
        if(scale !==1){
            context.scale(scale,scale);
            context.drawImage(canvas, 0, 0)
        };
    }

    function parsingImageData(string){
        if(string !== "Out of bounds"){
            let im = string.split("end1")
            let ima="data:image/png;charset=utf-8;base64, "+ im[0];
            let ima2 = "";
            if(compare){
                ima2 = "data:image/png;charset=utf-8;base64, "+ im[1];
                frames2.push(ima2);
                console.log(im[1])
            }
            frames.push(ima);
            return ima
        }else{console.log(string); return;}
    }

    const zoom1 = () => {
        z1+=0.25;
        var zone1 = document.getElementById("cv1");
        drawCanvas(zone1,frames[compt1],z1);
        if(compare){
            var zone2 = document.getElementById("cv2");
            drawCanvas(zone2,frames2[compt1],z1);
        }
    }

    const unzoom1 = () => {
        if(z1>1){
            z1-=0.25;
        }
        var zone1 = document.getElementById("cv1");
        drawCanvas(zone1,frames[compt1],z1);
        if(compare){
            var zone2 = document.getElementById("cv2");
            drawCanvas(zone2,frames2[compt1],z1);
        }
    }

    const next1 = () => {

        compt1++;
        z1=1;
        var zone1 = document.getElementById("cv1");
        var zone2 = document.getElementById("cv2");
        if(!compare && compt1 < frames.length){
            drawCanvas(zone1,frames[compt1],z1)
        }else if(compare && compt1 < Math.max(frames.length, frames2.length)){
            drawCanvas(zone1,frames[compt1],z1)
            drawCanvas(zone2,frames2[compt1],z1)
        }else{
            $.post("http://localhost:8080/unknown_frame",
            {
                number: compt1,
                two: compare,
            },
            function (data, status) {
                console.log("status = " + status);
                parsingImageData(data);
                drawCanvas(zone1,frames[compt1],z1);
                if(compare){
                    drawCanvas(zone2,frames2[compt1],z1);
                }
            });
            
        }
    }

    const previous1 = () => {

        if(compt1 > 0){
            compt1--;
        }
        z1=1;
        var zone1 = document.getElementById("cv1");
        var zone2 = document.getElementById("cv2");
        if(!compare && compt1 < frames.length){
            drawCanvas(zone1,frames[compt1],z1)
        }else if(compare && compt1 < Math.max(frames.length, frames2.length)){
            drawCanvas(zone1,frames[compt1],z1)
            drawCanvas(zone2,frames2[compt1],z1)
        }else{
            $.post("http://localhost:8080/unknown_frame",
            {
                number: compt1,
                two: compare,
            },
            function (data, status) {
                console.log("status = " + status);
                parsingImageData(data);
                drawCanvas(zone1,frames[compt1],z1);
                if(compare){
                    drawCanvas(zone2,frames2[compt1],z1);
                }
            });
        }
    }
    
    const graded = async(e) => {  //TODO
        e.preventDefault();

        var note = document.getElementById("notation").value;
        if(!compare){
            note = parseInt(note)%5
        }
        try {
            const res = AuthService.submitGrade(compare, note, outline);
            console.log("status = " + res.status);
            let resultat = res.data;
            setScore(resultat);
        }
        catch(err) { console.log(err); }
        }

    const showStats = async(e) => {
        e.preventDefault();

        try {
            const res = await AuthService.getNotes();
            if (res.data!=="end1")
            {
                console.log(res.data.student)
                setNotes([res.data.student, res.data.expert]);
                setShowStats(true);
            }
            else {}
        }
        catch(err) {console.log(err);}
    }

    const change_config = () => {
        config ++;
        var zone1 = document.getElementById("cv1");
        var zone2 = document.getElementById("cv2");
        $.post("http://localhost:8080/conf",
            {
                two : compare,
                conf: config%3,
                frame : compt1
            },
            function (data, status) {
                console.log("status = " + status);
                let im = data.split("end1")
                let ima="data:image/png;charset=utf-8;base64, "+ im[0];
                let ima2 = "";
                frames[compt1] = ima;
                drawCanvas(zone1,ima,z1);
                if(im[1] !== ""){
                    ima2 = "data:image/png;charset=utf-8;base64, "+ im[1];
                    frames2[compt1] = ima2;
                    drawCanvas(zone2,ima2,z1);
                }         
            });
    }

    return <div>
        <Form onSubmit={search} id="database">
            <Form.Group size="lg">
            <Form.Label>Outline to process : </Form.Label>
            <Form.Control
                type="text"
                id="outline"
                required size="15"
                value={outline}
                onChange={(e) => setOutline(e.target.value)}
            />
            <div>
            <label>Compare :</label>
            <input
                type="checkbox"
                id="comparison"
                label="Compare"
                checked={compare}
                onChange={(e) => setCompare(!compare)}
            />
            </div>
            
            </Form.Group>
            <Button size="lg" type="submit" id="search">
                Process 
            </Button>
        </Form>
        <div id="images" className={!showtitle ? "instructions" : "offscreen"}>
            <Button id="previous1" onClick={previous1}>Previous</Button>
            <Button id="next1" onClick={next1}>Next</Button>
            <Button id="z+1" onClick={zoom1}>+</Button>
            <Button id="z-1" onClick={unzoom1}>-</Button>
            <Button id="config" onClick={change_config}>Switch</Button>
            <div id="display">
                <div id = "canvas1" className={!showcv ? "instructions" : "offscreen"}>
                    <canvas id="cv1" width="600" height="600"></canvas>
                </div>
                <div id = "canvas2" className={!showcv2 ? "instructions" : "offscreen"}>
                    <canvas id="cv2" width="600" height="600"></canvas>
                </div>
            </div>
        </div>
            <div id="marks">
            {showtitle ? (
            <Form.Control
                //type={compare ? "text" : "number"}
                type="text"
                id="notation"
                required size="25"
                value={grade}
                placeholder = {compare ? "L or R for whichever outline is the better" : "Grade the outline on 4 points"}
                maxLength="1"
                onChange={(e) => setGrade(e.target.value)}
            />
            ) : null}
            {showtitle ? (
                <Button id="sendGrade" onClick={graded}>Submit Grade</Button>) : null}
            {!compare && showtitle ? (
                <Button id="showStats" onClick={showStats}>Show stats</Button>
                ) : null}
            {!compare && showtitle && stats ? (<HistogramChart L1={notes[0]} L2={notes[1]} />) : null}
             </div>
             <div id="conclude">{score}</div>
        <label id="title" value = {title} className={!showtitle ? "instructions" : "offscreen"}></label>
        </div>
}