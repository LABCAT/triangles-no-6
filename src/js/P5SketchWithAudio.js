import React, { useRef, useEffect } from "react";
import "./helpers/Globals";
import "p5/lib/addons/p5.sound";
import * as p5 from "p5";
import Delaunay from "delaunay-fast";
import { Midi } from '@tonejs/midi'
import PlayIcon from './functions/PlayIcon.js';
import ShuffleArray from './functions/ShuffleArray.js';
import AnimatedTriangle from './classes/AnimatedTriangle.js';

import audio from "../audio/triangles-no-6.ogg";
import midi from "../audio/triangles-no-6.mid";

const P5SketchWithAudio = () => {
    const sketchRef = useRef();

    const Sketch = p => {

        p.canvas = null;

    p.canvasWidth = window.innerWidth;

        p.canvasHeight = window.innerHeight;

        p.audioLoaded = false;

        p.player = null;

        p.PPQ = 3840 * 4;

        p.loadMidi = () => {
            Midi.fromUrl(midi).then(
                function(result) {
                    const noteSet1 = result.tracks[1].notes; // Synth 1 - Filter Wheeler
                    const noteSet2 = result.tracks[2].notes; // Sampler 1 - HEAVYGTR
                    p.scheduleCueSet(noteSet1, 'executeCueSet1');
                    p.scheduleCueSet(noteSet2, 'executeCueSet2');
                    p.audioLoaded = true;
                    document.getElementById("loader").classList.add("loading--complete");
                    document.getElementById("play-icon").classList.remove("fade-out");
                }
            );
            
        }

        p.preload = () => {
            p.song = p.loadSound(audio, p.loadMidi);
            p.song.onended(p.logCredits);
        }

        p.scheduleCueSet = (noteSet, callbackName, poly = false)  => {
            let lastTicks = -1,
                currentCue = 1;
            for (let i = 0; i < noteSet.length; i++) {
                const note = noteSet[i],
                    { ticks, time } = note;
                if(ticks !== lastTicks || poly){
                    note.currentCue = currentCue;
                    p.song.addCue(time, p[callbackName], note);
                    lastTicks = ticks;
                    currentCue++;
                }
            }
        } 

        p.triangles = [];
        p.nextTriangles = [];

        p.setup = () => {
            p.canvas = p.createCanvas(p.canvasWidth, p.canvasHeight);
            p.background(0);

            p.generateNextTriangles();
        }

        p.draw = () => {
            if(p.audioLoaded && p.song.isPlaying()){
                for (let i = 0; i < p.triangles.length; i++) {
                    const triangle = p.triangles[i];
                    triangle.draw();
                }
            }
        }

        p.gatNotesPerSynthNote = 0;

        p.trisPerNote = 0;

        p.trisPerLastNote = 0;

        p.executeCueSet1 = (note) => {
            const { currentCue } = note;
            p.background(0);
            p.triangles = p.nextTriangles;
            p.gatNotesPerSynthNote = 
                currentCue % 5 === 0 ? 7 :
                currentCue % 5 === 4 ? 8 :
                15;

            p.trisPerNote = Math.floor(p.triangles.length / p.gatNotesPerSynthNote);
            p.trisPerLastNote = p.trisPerNote + (p.triangles.length - (p.gatNotesPerSynthNote * p.trisPerNote));
            
            p.generateNextTriangles();
        }

        p.executeCueSet2 = (note) => {
            const { duration } = note;
            const tris = p.triangles.filter((element) => !element.canDraw),
                numOfLoops = tris.length === p.trisPerLastNote ? p.trisPerLastNote : p.trisPerNote; 
            for (let i = 0; i < numOfLoops; i++) {
                const triangle = tris[i];
                triangle.canDraw = true; 
                triangle.setLifeTime(duration * 1000); 
            }
        }


        p.generateNextTriangles = () => {
            p.nextTriangles = [];
            const pts = [];
            // push canvas rect points
            pts.push( p.createVector( 0, 0 ) );
            pts.push( p.createVector( p.width, 0 ) );
            pts.push( p.createVector( p.width, p.height ) );
            pts.push( p.createVector( 0, p.height ) );
                
            // add a certain number of pts proportionally to the size of the canvas
            // ~~ truncates a floating point number and keeps the integer part, like floor()
            const divisor = 128;
            const n = ~~ ( p.width / divisor * p.height / divisor );
            for( var i = 0; i < n; i ++ ){
                pts.push( p.createVector( ~~ p.random( p.width ), ~~ p.random( p.height ) ) );
            }
                
            // Now, let's use Delaunay.js
            // Delaunay.triangulate expect a list of vertices (which should be a bunch of two-element arrays, representing 2D Euclidean points)
            // and it will return you a giant array, arranged in triplets, representing triangles by indices into the passed array
            // Array.map function let us create an Array of 2 elements arrays [ [x,y],[x,y],..] from our array of PVector [ PVector(x,y), PVector(x,y), ... ]
            const triangulation = Delaunay.triangulate( pts.map( function( pt ){
                return [ pt.x, pt.y ];
            } ) );
                
            const colour1 = p.color(p.random(255), p.random(255), p.random(255)),
                colour2 = p.color(p.random(255), p.random(255), p.random(255));
            // create Triangles object using indices returned by Delaunay.triangulate
            for( var i = 0; i < triangulation.length; i += 3 ){
                p.nextTriangles.push( 
                    new AnimatedTriangle(
                        p,
                        pts[ triangulation[ i ] ],
                        pts[ triangulation[ i + 1 ] ],
                        pts[ triangulation[ i + 2 ] ], 
                        colour1,
                        colour2
                    )
                );
            }

            p.nextTriangles = ShuffleArray(p.nextTriangles);
        }

        p.mousePressed = () => {
            if(p.audioLoaded){
                if (p.song.isPlaying()) {
                    p.song.pause();
                } else {
                    if (parseInt(p.song.currentTime()) >= parseInt(p.song.buffer.duration)) {
                        p.reset();
                    }
                    document.getElementById("play-icon").classList.add("fade-out");
                    p.canvas.addClass("fade-in");
                    p.song.play();
                }
            }
        }

        p.creditsLogged = false;

        p.logCredits = () => {
            if (
                !p.creditsLogged &&
                parseInt(p.song.currentTime()) >= parseInt(p.song.buffer.duration)
            ) {
                p.creditsLogged = true;
                    console.log(
                    "Music By: http://labcat.nz/",
                    "\n",
                    "Animation By: https://github.com/LABCAT/",
                    "\n",
                    "Code Inspiration: https://openprocessing.org/sketch/385808"
                );
                p.song.stop();
            }
        };

        p.reset = () => {

        }

        p.updateCanvasDimensions = () => {
            p.canvasWidth = window.innerWidth;
            p.canvasHeight = window.innerHeight;
            p.canvas = p.resizeCanvas(p.canvasWidth, p.canvasHeight);
        }

        if (window.attachEvent) {
            window.attachEvent(
                'onresize',
                function () {
                    p.updateCanvasDimensions();
                }
            );
        }
        else if (window.addEventListener) {
            window.addEventListener(
                'resize',
                function () {
                    p.updateCanvasDimensions();
                },
                true
            );
        }
        else {
            //The browser does not support Javascript event binding
        }
    };

    useEffect(() => {
        new p5(Sketch, sketchRef.current);
    }, []);

    return (
        <div ref={sketchRef}>
            <PlayIcon />
        </div>
    );
};

export default P5SketchWithAudio;
