(this["webpackJsonptriangles-no-6"]=this["webpackJsonptriangles-no-6"]||[]).push([[0],{18:function(t,e,i){},33:function(t,e,i){"use strict";i.r(e);var n=i(1),o=i.n(n),r=i(9),s=i.n(r),a=(i(18),i(2));window.p5=a;i(20);var c=i(10),h=i.n(c),d=i(11),l=i(0);function u(){return Object(l.jsxs)("svg",{id:"play-icon",className:"fade-out",xmlns:"http://www.w3.org/2000/svg",height:"24",viewBox:"0 0 24 24",width:"24",children:[Object(l.jsx)("path",{d:"M0 0h24v24H0z",fill:"none"}),Object(l.jsx)("path",{d:"M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"})]})}var g=function(t){for(var e,i,n=t.length;0!==n;)i=Math.floor(Math.random()*n),e=t[n-=1],t[n]=t[i],t[i]=e;return t},p=i(12),w=i(13),f=function(){function t(e,i,n,o,r,s){var a=arguments.length>6&&void 0!==arguments[6]?arguments[6]:1e3;Object(p.a)(this,t),this.p=e,this.canDraw=!1,this.point1=i,this.point2=n,this.point3=o,this.centerX=(this.point1.x+this.point2.x+this.point3.x)/3,this.centerY=(this.point1.y+this.point2.y+this.point3.y)/3,this.origin=this.p.createVector(this.centerX,this.centerY),this.lerpAmount=this.p.random(.01,.99),this.colour1=r,this.colour2=s,this.fillColour=this.p.lerpColor(this.colour1,this.colour2,this.lerpAmount),this.currentFrame=0,this.setLifeTime(a)}return Object(w.a)(t,[{key:"setLifeTime",value:function(t){var e=this.p.getFrameRate()?this.p.getFrameRate():60;this.totalFrames=e/1e3*t}},{key:"draw",value:function(){if(this.canDraw){var t=this.point1,e=this.point2,i=this.point3;if(this.currentFrame<this.totalFrames){var n=this.p.min(1,this.currentFrame/this.totalFrames),o=window.p5.Vector.sub(this.point1,this.origin).mult(n),r=window.p5.Vector.sub(this.point2,this.origin).mult(n),s=window.p5.Vector.sub(this.point3,this.origin).mult(n);t=window.p5.Vector.add(this.origin,o),e=window.p5.Vector.add(this.origin,r),i=window.p5.Vector.add(this.origin,s)}var a=window.p5.Vector.sub(t,this.origin).mult(.6666),c=window.p5.Vector.sub(e,this.origin).mult(.6666),h=window.p5.Vector.sub(i,this.origin).mult(.6666),d=window.p5.Vector.sub(t,this.origin).mult(.3333),l=window.p5.Vector.sub(e,this.origin).mult(.3333),u=window.p5.Vector.sub(i,this.origin).mult(.3333),g=window.p5.Vector.add(this.origin,a),p=window.p5.Vector.add(this.origin,c),w=window.p5.Vector.add(this.origin,h),f=window.p5.Vector.add(this.origin,d),m=window.p5.Vector.add(this.origin,l),v=window.p5.Vector.add(this.origin,u);this.p.push(),this.p.noStroke(),this.fillColour.setAlpha(.06),this.p.fill(this.fillColour),this.p.triangle(t.x,t.y,e.x,e.y,i.x,i.y),this.fillColour.setAlpha(.12),this.p.fill(this.fillColour),this.p.triangle(g.x,g.y,p.x,p.y,w.x,w.y),this.fillColour.setAlpha(.24),this.p.fill(this.fillColour),this.p.stroke(255),this.p.triangle(f.x,f.y,m.x,m.y,v.x,v.y),this.p.pop(),this.currentFrame++}}}]),t}(),m=i.p+"static/media/triangles-no-6.3cd4ec8e.ogg",v=i.p+"static/media/triangles-no-6.02d5f508.mid",y=function(){var t=Object(n.useRef)(),e=function(t){t.canvas=null,t.canvasWidth=window.innerWidth,t.canvasHeight=window.innerHeight,t.audioLoaded=!1,t.player=null,t.PPQ=15360,t.loadMidi=function(){d.Midi.fromUrl(v).then((function(e){var i=e.tracks[1].notes,n=e.tracks[2].notes;t.scheduleCueSet(i,"executeCueSet1"),t.scheduleCueSet(n,"executeCueSet2"),t.audioLoaded=!0,t.bgColour=Math.random()<.5?0:255,t.background(t.bgColour),document.getElementById("loader").classList.add("loading--complete"),document.getElementById("play-icon").classList.remove("fade-out"),t.bgColour&&(document.getElementById("play-icon").style.fill="black")}))},t.preload=function(){t.song=t.loadSound(m,t.loadMidi),t.song.onended(t.logCredits)},t.scheduleCueSet=function(e,i){for(var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=-1,r=1,s=0;s<e.length;s++){var a=e[s],c=a.ticks,h=a.time;(c!==o||n)&&(a.currentCue=r,t.song.addCue(h,t[i],a),o=c,r++)}},t.bgColour=0,t.triangles=[],t.nextTriangles=[],t.setup=function(){t.randomColor=i(31),t.canvas=t.createCanvas(t.canvasWidth,t.canvasHeight),t.colorMode(t.HSL),t.generateNextTriangles()},t.draw=function(){if(t.audioLoaded&&t.song.isPlaying())for(var e=0;e<t.triangles.length;e++){t.triangles[e].draw()}},t.gatNotesPerSynthNote=0,t.trisPerNote=0,t.trisPerLastNote=0,t.executeCueSet1=function(e){var i=e.currentCue;t.background(t.bgColour),t.gatNotesPerSynthNote=i%5===0?7:i%5===4?8:15,t.triangles=t.nextTriangles,t.trisPerNote=Math.floor(t.triangles.length/t.gatNotesPerSynthNote),t.trisPerLastNote=t.trisPerNote+(t.triangles.length-t.gatNotesPerSynthNote*t.trisPerNote),t.generateNextTriangles()},t.executeCueSet2=function(e){for(var i=e.duration,n=t.triangles.filter((function(t){return!t.canDraw})),o=n.length===t.trisPerLastNote?t.trisPerLastNote:t.trisPerNote,r=0;r<o;r++){var s=n[r];s.canDraw=!0,s.setLifeTime(1e3*i)}},t.generateNextTriangles=function(){t.nextTriangles=[];var e=[];e.push(t.createVector(0,0)),e.push(t.createVector(t.width,0)),e.push(t.createVector(t.width,t.height)),e.push(t.createVector(0,t.height));for(var i=t.random([128,256,384]),n=~~(t.width/i*t.height/i),o=0;o<n;o++)e.push(t.createVector(~~t.random(t.width),~~t.random(t.height)));var r=h.a.triangulate(e.map((function(t){return[t.x,t.y]}))),s=t.randomColor({luminosity:"bright",format:"hslArray"}),a=t.randomColor({luminosity:"bright",format:"hslArray"}),c=s[0]+180>360?s[0]-180:s[0]+180,d=t.color(s[0],s[1],s[2]),l=Math.random()<.5?t.color(c,s[1],s[2]):t.color(a[0],a[1],a[2]);for(o=0;o<r.length;o+=3)t.nextTriangles.push(new f(t,e[r[o]],e[r[o+1]],e[r[o+2]],d,l));t.nextTriangles=g(t.nextTriangles)},t.mousePressed=function(){t.audioLoaded&&(t.song.isPlaying()?t.song.pause():(parseInt(t.song.currentTime())>=parseInt(t.song.buffer.duration)&&(t.reset(),t.generateNextTriangles()),document.getElementById("play-icon").classList.add("fade-out"),t.canvas.addClass("fade-in"),t.song.play()))},t.creditsLogged=!1,t.logCredits=function(){!t.creditsLogged&&parseInt(t.song.currentTime())>=parseInt(t.song.buffer.duration)&&(t.creditsLogged=!0,console.log("Music By: http://labcat.nz/","\n","Animation By: https://github.com/LABCAT/","\n","Code Inspiration: https://openprocessing.org/sketch/385808"),t.song.stop())},t.reset=function(){},t.updateCanvasDimensions=function(){t.canvasWidth=window.innerWidth,t.canvasHeight=window.innerHeight,t.canvas=t.resizeCanvas(t.canvasWidth,t.canvasHeight)},window.attachEvent?window.attachEvent("onresize",(function(){t.updateCanvasDimensions()})):window.addEventListener&&window.addEventListener("resize",(function(){t.updateCanvasDimensions()}),!0)};return Object(n.useEffect)((function(){new a(e,t.current)}),[]),Object(l.jsx)("div",{ref:t,children:Object(l.jsx)(u,{})})};var b=function(){return Object(l.jsx)(y,{})};s.a.render(Object(l.jsx)(o.a.StrictMode,{children:Object(l.jsx)(b,{})}),document.getElementById("root"))}},[[33,1,2]]]);
//# sourceMappingURL=main.071a2793.chunk.js.map