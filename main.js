class CellLifeSimulation extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
 :host {
    display: block;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    font-family: "Space Grotesk", sans-serif;
}

canvas {
    background-color: rgba(15, 15, 15, 0.983);
    width: 100%;
    height: 100%;
}

.folder-container {
    position: fixed;
    right: 20px;
    bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    z-index: 1000;
}

.folder-toggle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    margin-bottom: 10px;
    transition: all 0.3s ease;
}

.folder-toggle.active {
    background-color: rgba(255, 255, 255, 0.2);
}

.folder-content {
    position: absolute;
    right: 70px;
    display: flex;
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease;

}

.folder-content.active {
    opacity: 1;
    pointer-events: auto;

}

.folder-content.hidden {
    display: none;
}

.folder-wrapper {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
}

.toggle-button.active {
    background-color: rgba(255, 255, 255, 0.2);
}

#toggle-food-mode {
    bottom: 320px;
    right: 20px;
}

.toggle-button {
    position: fixed;
    width: 40px;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 15px;
    cursor: pointer;
    z-index: 1000;
    transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Space Grotesk", sans-serif;
    outline: none;
    transform-origin: center center;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.folder-content.active .toggle-button {
    transform: translateX(-60px);
}

#toggle-gui {
    position: fixed;
    top: 20px;
    left: 20px;
    outline: none;
    width: 40px;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 15px;
    cursor: pointer;
    z-index: 1000;
    transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Space Grotesk", sans-serif;
}

#toggle-dashboard {
    bottom: 20px;
    right: 20px;
    outline: none;
}

#toggle-graph {
    bottom: 70px;
    right: 20px;
}

#toggle-full-history-graph {
    bottom: 120px;
    right: 20px;
}

#toggle-hybrid {
    bottom: 170px;
    right: 20px;
}

#toggle-adaptive {
    bottom: 220px;
    right: 20px;
}

#toggle-flocking {
    bottom: 270px;
    right: 20px;
}

.toggle-button.active {
    background-color: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg);
    outline: none;
    text-decoration: none;
}

.toggle-button::after {
    display: none;
}

#gui-container {
    font-size: 14px;
    font-family: "Space Grotesk", sans-serif;
    position: fixed;
    top: 0;
    right: -370px;
    width: 350px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 20px;
    box-sizing: border-box;
    overflow-y: auto;
    transition: right 0.3s ease-in-out;
    z-index: 10000;
}

#gui-container.open {
    right: 0;
}

#gui-container h2 {
    text-align: center;
    color: #fff;
    margin-bottom: 30px;
}


.gui-link {
    display: block;
    color: #fff;
    text-decoration: none !important;

    font-size: 16px;
}

.gui-link:hover {
    text-decoration: underline;
}

.gui-button {
    display: block;
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    background-color: #2b6bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
}

.gui-button:hover {
    background-color: #333;
}

.dashboard {
    font-size: 14px;
    font-family: "Space Grotesk", sans-serif;
    position: fixed;
    bottom: 30px;
    right: 80px;
    width: 200px;
    max-height: 80vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 15px;
    border-radius: 8px;
    z-index: 5;
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.dashboard.hidden {
    opacity: 0;
    pointer-events: none;
    transform: translateY(20px);
}

h2,
h3 {
    margin: 0 0 10px 0;
    color: #fff;
}

.dashboard p {
    margin: 5px 0;
}

.graph-container {
    position: fixed;
    bottom: 235px;
    right: 80px;
    width: 500px;
    height: 350px;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 8px;
    padding: 15px;
    box-sizing: border-box;
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.graph-container.hidden {
    opacity: 0;
    pointer-events: none;
    transform: translateY(20px);
}

#population-graph {
    width: 100%;
    height: 100%;
}

#graph-container {
    top: 20px;
    
     right: 185px;
    width: 250px;
    height: 175px;
    max-height: 80vh;
}

.control-group {
    margin-bottom: 15px;
    color: #fff;
}

label {
    font-family: "Space Grotesk", sans-serif;
    display: block;
    margin-bottom: 5px;
    margin-top: 6px;
    color: #fff;
}

select,
input[type="number"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    font-family: "Space Grotesk", sans-serif;
}

button {
    font-family: "Space Grotesk", sans-serif;
    width: 100%;
    padding: 10px;
    margin: 5px 0px;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #555;
}

.toggle-button.hybrid-active {
    background-color: indigo;
}


.toggle-button.adaptive-active {
    background-color: rgba(0, 128, 128, 0.7);
}


.toggle-button:active,
#toggle-gui:active {
    border: none;
    outline: none;
    transform: rotate(90deg);
}


#toggle-gui::after {
    display: none;
}


button:focus {
    outline: none;
}

#restart-button {
    position: fixed;
    bottom: 20px;
    left: 20px;
    width: 40px;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
    z-index: 1000;
    transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Space Grotesk", sans-serif;
}

#restart-button:hover {
    background-color: rgba(0, 0, 0, 0.9);
    transform: scale(1.1);
}

.eye-icon {
    cursor: pointer;
    margin-left: 5px;
    vertical-align: middle;
    width: 24px;
    height: 24px;
    display: inline-block;
    padding: 4px;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transition: background-color 0.3s;

}

.eye-icon:hover {
    background-color: rgba(255, 255, 255, 0.4);
}

.eye-color-dashboard {
    position: fixed;
   

    bottom: 30px;
    right: 325px;
    width: 120px;
    max-height: 160px;

    overflow-y: auto;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 10px;
    border-radius: 8px;
    font-family: "Space Grotesk", sans-serif;
    font-size: 12px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.eye-color-dashboard h3 {
margin: 0.2rem 0rem !important;
    font-size: 12px;

}

.eye-color-dashboard.hidden {
    opacity: 0;
    pointer-events: none;
    transform: translateX(-20px);
}

.eye-color-item {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    cursor: pointer;

    flex-direction: row;
}

.eye-color-sample {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 5px;
    margin-top: 5px;
    vertical-align: middle;
    display: flex;
    flex-direction: row;
}

.eye-color-info {
    flex-grow: 1;

}

.eye-color-count {
    font-weight: bold;

}

.evolved-count {
    font-size: 0.9em;
    color: #ffd700;
    margin-left: 5px;
}

.eye-color-attributes {
    font-size: 10px;
    color: #ccc;
    display: flex;
    flex-direction: column;
}

.detailed-dashboard {
    position: fixed;
    bottom: 30px;
    right: 485px;
    width: 23vw;
    max-height: 150px;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 15px;
    border-radius: 8px;
    font-family: "Space Grotesk", sans-serif;
    font-size: 10px;
    z-index: 1001;
    display: flex;
    flex-direction: column;
    gap: 15px;
    overflow: hidden;
}

.detailed-dashboard h3 {
    margin-top: 5px;
    margin-bottom: 5px;
    color: #fff;
    font-size: 10px;
    display: flex;
    flex-direction: column;
    display: none;
}

.detailed-dashboard p {
    margin: 5px 2px;
}

.detailed-dashboard ul {
    padding: 8px;
    margin: 5px 0;
}

.detailed-dashboard .action-buttons {
    display: flex;
    justify-content: space-between;
   
    gap: 10px;
  }

  .detailed-dashboard .action-button {
    flex: 1;
    padding: 8px 12px;
    font-size: 10px;
    background-color: #2b6bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .detailed-dashboard .action-button:hover {
    background-color: #4080ff;
  }

 


  .dna-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      -45deg,
      rgba(0, 100, 255, 0.1) 0px 10px,
      transparent 10px 20px
    ),
    repeating-linear-gradient(
      45deg,
      rgba(255, 0, 100, 0.1) 0px 10px,
      transparent 10px 20px
    );
    animation: dna-animation 10s linear infinite;
    opacity: 0.5;
  }

  @keyframes dna-animation {
    0% {
      background-position: 0 0, 0 0;
    }
    100% {
      background-position: 40px 40px, 40px 40px;
    }
  }

  .genetics-content {
    position: relative;
    z-index: 1;
  }

  .genetics-content h3 {
    text-align: center;
    margin-bottom:10px;
    color: #00ffff;
    text-shadow: 0 0 5px #00ffff;
  }

  .traits-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .trait {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 10px;
    border-radius: 5px;
  }

  .trait-label {
    font-weight: bold;
     color: #fff;
    font-size: 10px;
  }

  .trait-value {
    font-family: monospace;
    color:#2b6bff;
  }

  .trait-header {
  margin-bottom: 0;
  }

  #close-genetics {
    display: block;
    width: 100%;
    margin-top: 20px;
    background-color: #ff0000;
    border: none;
    color: white;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  #close-genetics:hover {
    background-color: #fff;
  }

.navigation-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.cell-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
}

.cell-stat {
    background-color: rgba(255, 255, 255, 0.05);
    padding: 5px;
    border-radius: 4px;
}

.cell-info {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.stat-label {
    font-size: 9px;
    color: #aaa;
    display: block;
}

.stat-value {
    font-size: 12px;
    font-weight: bold;
}

.nav-button {
    background-color: #333 !important;
    border: none;
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
  justify-content: center;
  align-items: center;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 14px;
    margin: 0 !important;
    
}

.nav-button:hover {
    background-color: rgba(43, 107, 255, 0.8);
}

.cell-count {
    font-size: 10px;
}

.evolved-indicator {
    font-size: 14px;
    margin-left: 5px;
    vertical-align: middle;
}


.detailed-dashboard button {
    background-color: #2b6bff;
    display: flex;
    
    justify-items: center;
    color: white;
    border: none;
    padding: 2px 5px;
    margin: 5px 2px;
    cursor: pointer;
    border-radius: 3px;
    font-size: 12px;
}

.detailed-dashboard button:hover {
    background-color: #4080ff !important;
}

.detailed-dashboard.hidden {
    display: none;
}

.detailed-dashboard.evolved {
    box-shadow: 0 0 15px rgba(43, 107, 255, 0.5);
}

.eye-color-item {

    cursor: pointer;
    transition: background-color 0.3s;
}



.eye-color-dashboard::-webkit-scrollbar {
    width: 8px;
}

.eye-color-dashboard::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
}

.eye-color-dashboard::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
}

.eye-color-dashboard::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
}

#unfollow-cell {
  background-color: #ff4444;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 10px;
  
  width: auto;
  height: auto;
}

#unfollow-cell:hover {
    background-color: #ff6666;
}


.level-progress-bar {
    margin-top: 10px;
}


.color-stats {
    margin-top: 5px;
    display: none;
    color: white;
    font-size: 12px;
}

.color-bar {
    height: 20px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
}

.color-bar-fill {
    height: 100%;
}

.color-bar-text {
    margin-left: 5px;
    color: white;
}

.color-stat-item {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
}

.color-sample {
    width: 12px;
    height: 12px;
    margin-right: 5px;
    border: 1px solid white;
}

.stat-name {
    font-weight: bold;
    transition: color 0.3s ease-in-out;
}

.stat-row {
    display: flex !important;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
}

#hybrid-count-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
}



.stat-name.active {
    color: #00ff00;
}

.collapsible:after {
    content: '\\002B';
    color: white;
    font-weight: bold;
    float: right;
    margin-left: 5px;
}

.active:after {
    content: "\\2212";
}

.content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s ease-out;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 0 0 4px 4px;
}

#fullscreen-button,
#runtime-button {
    position: fixed;
    left: 20px;
    width: 40px;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
    z-index: 1000;
    transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Space Grotesk", sans-serif;
}

#fullscreen-button {
    bottom: 120px;
}

#runtime-button {
    bottom: 70px;
}

#fullscreen-button:hover,
#runtime-button:hover {
    background-color: rgba(0, 0, 0, 0.9);
    transform: scale(1.1);
}

#runtime-popup {
    position: fixed;
    right: 20px;
    top: 130px;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 8px 12px;
    border-radius: 5px;
    font-family: "Space Grotesk", sans-serif;
    font-size: 14px;
    display: none;
    min-width: 120px;
}

#runtime-popup p {
    margin: 0;
    text-align: center;
}

#runtime-button:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(43, 107, 255, 0.1);
    background-color: rgba(0, 128, 255, 0.7);
}

#fps-counter {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 5px 5px;
    border-radius: 5px;
    font-family: "Space Grotesk", sans-serif;

    min-width: 10px;
    height: 24px;
    height: 24px;
    line-height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;

}

#fps-counter p {
    margin: 0;
}

.toggle-button.flocking-active {
    background-color: rgba(0, 128, 255, 0.7);
}

.toggle-button:hover {
    background-color: rgba(255, 255, 255, 0.3);
}

.toggle-button.flocking-active:hover {
    background-color: rgba(0, 128, 255, 0.9);
}

#eye-color-stats-popup {
    position: fixed;
    bottom: 50px;
    left: 430px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 8px;
    border-radius: 8px;
    font-family: "Space Grotesk", sans-serif;
    font-size: 11px;
    z-index: 1000;
    width: 100px;
    box-shadow: 0 0 10px rgba(0, 100, 255, 0.3);
    border: 1px solid rgba(0, 100, 255, 0.5);
    display: none;
}



#toggle-eye-stats {
    background: rgba(0, 170, 255, 0.3);
    border: none;
    color: white;
    margin-top: 10px;
    cursor: pointer;
    font-size: 12px;
    padding: 8px 8px;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

#toggle-eye-stats:hover {
    background: rgba(0, 170, 255, 0.5);
}

#toggle-eye-stats:active {
    background: rgba(0, 170, 255, 0.7);
}

#full-history-graph-container {
    position: fixed;
    top: 20px;
    right: 450px;
    width: 395px;
    height: 175px;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 8px;
    padding: 15px;
    box-sizing: border-box;
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}

#full-history-graph-container.hidden {
    opacity: 0;
    pointer-events: none;
    transform: translateY(20px);
}

#full-history-graph {
    width: 100%;
    height: 100%;
}

#toggle-full-history-graph {
    bottom: 120px;
    right: 20px;
}

.level-up-notification {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 128, 0, 0.8);
    color: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    z-index: 1000;
    animation: fadeInOut 3s ease-in-out;
}

#level-up-popup {
    font-family: "Space Grotesk", sans-serif;
}

#level-up-popup button {
    display: block;
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    background-color: #2b6bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

#level-up-popup button:hover {
    background-color: #333;
}

#toggle-debug {
    background-color: rgba(250, 250, 250, 0.4);
    color: #000;
    border: none;
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease-in-out;
}

#toggle-debug:hover {
    background-color: rgba(0, 0, 0, 0.9);
}

#toggle-debug:active {
    background-color: rgba(0, 0, 0, 0.9);
    transform: translateY(5px);
}

#debug-menu::-webkit-scrollbar {
    width: 8px;
}

#debug-menu::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
}

#debug-menu::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
}

#debug-menu::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 255, 255, 0.5);
}



@keyframes fadeInOut {

    0%,
    100% {
        opacity: 0;
    }

    10%,
    90% {
        opacity: 1;
    }
}
      </style>
      <canvas></canvas>
      <button id="toggle-gui"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg></button>
      <div id="gui-container">
        <h2>Cell Life Simulation</h2>
        <button class="gui-button"><a href="https://github.com/tflannagan" target="_blank" class="gui-link">GitHub</a></button>
        <button class="gui-button"><a href="https://www.tyflannagan.tech/" target="_blank" class="gui-link">Creator's Page</a></button>
        <button id="toggle-settings" class="gui-button">Settings</button>
        <button id="toggle-debug" class="gui-button"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-200q66 0 113-47t47-113v-160q0-66-47-113t-113-47q-66 0-113 47t-47 113v160q0 66 47 113t113 47Zm-80-120h160v-80H400v80Zm0-160h160v-80H400v80Zm80 40Zm0 320q-65 0-120.5-32T272-240H160v-80h84q-3-20-3.5-40t-.5-40h-80v-80h80q0-20 .5-40t3.5-40h-84v-80h112q14-23 31.5-43t40.5-35l-64-66 56-56 86 86q28-9 57-9t57 9l88-86 56 56-66 66q23 15 41.5 34.5T688-640h112v80h-84q3 20 3.5 40t.5 40h80v80h-80q0 20-.5 40t-3.5 40h84v80H688q-32 56-87.5 88T480-120Z"/></svg></button>
      </div>
  <div id="dashboard" class="dashboard hidden">
        <h2>Population</h2>
        <div class="stat-row">
          <span><span id="prey-stat-name" class="stat-name">Prey:</span> <span id="prey-count">0</span></span>
          <svg class="eye-icon" data-type="prey" viewBox="0 0 24 24" width="20" height="20">
            <path fill="white" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
          </svg>
        </div>
        <div id="prey-color-stats" class="color-stats"></div>
        
        <div class="stat-row">
          <span><span id="predator-stat-name" class="stat-name">Predators:</span> <span id="predator-count">0</span></span>
          <svg class="eye-icon" data-type="predator" viewBox="0 0 24 24" width="20" height="20">
            <path fill="white" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
          </svg>
        </div>
        <div id="predator-color-stats" class="color-stats"></div>
        
        <div id="hybrid-count-container" class="stat-row" style="display: none;">
          <span><span id="hybrid-stat-name" class="stat-name">Hybrids:</span> <span id="hybrid-count">0</span></span>
          <svg class="eye-icon" data-type="hybrid" viewBox="0 0 24 24" width="20" height="20">
            <path fill="white" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
          </svg>
        </div>
        <div id="hybrid-color-stats" class="color-stats"></div>

        <div id="adaptive-count-container" class="stat-row" style="display: none;">
          <span><span id="adaptive-stat-name" class="stat-name">Adaptive:</span> <span id="adaptive-count">0</span></span>
          <svg class="eye-icon" data-type="adaptive" viewBox="0 0 24 24" width="20" height="20">
            <path fill="white" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
          </svg>
        </div>
        <div id="adaptive-color-stats" class="color-stats"></div>
      </div>
       <div id="prey-eye-color-dashboard" class="eye-color-dashboard hidden">
        <h3>Prey Eye Color</h3>
        <div id="prey-eye-color-stats"></div>
      </div>
      <div id="predator-eye-color-dashboard" class="eye-color-dashboard hidden">
        <h3>Predator Eye Color</h3>
        <div id="predator-eye-color-stats"></div>
      </div>
      <div id="hybrid-eye-color-dashboard" class="eye-color-dashboard hidden">
        <h3>Hybrid Eye Color</h3>
        <div id="hybrid-eye-color-stats"></div>
      </div>
      <div id="adaptive-eye-color-dashboard" class="eye-color-dashboard hidden">
  <h3>Adaptive Eye Color</h3>
  <div id="adaptive-eye-color-stats"></div>

     
</div>
        
           <h3>Evolved Cells</h3>
        <div class="stat-row">
          <span><span class="stat-name">Evolved Prey:</span> <span id="evolved-prey-count">0</span></span>
        </div>
        <div class="stat-row">
          <span><span class="stat-name">Evolved Predators:</span> <span id="evolved-predator-count">0</span></span>
        </div>
        <div class="stat-row">
          <span><span class="stat-name">Evolved Hybrids:</span> <span id="evolved-hybrid-count">0</span></span>
        </div>
        <div class="stat-row">
          <span><span class="stat-name">Evolved Adaptive:</span> <span id="evolved-adaptive-count">0</span></span>
        </div>
    
       
      </div>
      
 <button id="toggle-adaptive" class="toggle-button">🧠</button>
<button id="toggle-full-history-graph" class="toggle-button"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-162v82h560v-350L522-280 360-442 200-282Zm0-114 160-160 158 158 242-272v-90H200v364Zm0-154v-120 272-158 274-160 162-270Zm0 154v-364 362-158 160Zm0 114v-160 162-270 350-82Z"/></svg></button>
<button id="toggle-hybrid" class="toggle-button">🧬</button>
<button id="toggle-graph" class="toggle-button"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m296-320 122-122 80 80 142-141v63h80v-200H520v80h63l-85 85-80-80-178 179 56 56Zm-96 200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg></button>
<button id="toggle-dashboard" class="toggle-button"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-280h80v-200h-80v200Zm320 0h80v-400h-80v400Zm-160 0h80v-120h-80v120Zm0-200h80v-80h-80v80ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg></button>
<button id="toggle-food-mode" class="toggle-button">🍽️</button>
<button id="toggle-flocking" class="toggle-button">🐦</button>
<button id="fullscreen-button">⛶</button>
      <button id="runtime-button">🕒</button>
      <div id="runtime-popup"><p>Runtime: 00:00:00</p></div>
      <button id="restart-button">↻</button>
      <div id="graph-container" class="graph-container hidden">
        <canvas id="population-graph"></canvas>
      </div>
       <div id="full-history-graph-container" class="graph-container hidden">
        <canvas id="full-history-graph"></canvas>
      </div>
    `;
    this.canvas = this.shadowRoot.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.guiContainer = this.shadowRoot.getElementById("gui-container");
    this.toggleGuiButton = this.shadowRoot.getElementById("toggle-gui");
    this.restartButton = this.shadowRoot.getElementById("restart-button");

    this.graphContainer = this.shadowRoot.getElementById("graph-container");
    this.toggleGraphButton = this.shadowRoot.getElementById("toggle-graph");
    this.graphCanvas = this.shadowRoot.getElementById("population-graph");
    this.graphCtx = this.graphCanvas.getContext("2d");

    this.dashboard = this.shadowRoot.getElementById("dashboard");
    this.toggleDashboardButton =
      this.shadowRoot.getElementById("toggle-dashboard");

    this.toggleHybridButton = this.shadowRoot.getElementById("toggle-hybrid");
    this.hybridMode = false;
    this.hybridCountContainer = this.shadowRoot.getElementById(
      "hybrid-count-container"
    );

    this.toggleAdaptiveButton =
      this.shadowRoot.getElementById("toggle-adaptive");
    this.adaptiveMode = false;

    this.preyEyeColorDashboard = this.shadowRoot.getElementById(
      "prey-eye-color-dashboard"
    );
    this.predatorEyeColorDashboard = this.shadowRoot.getElementById(
      "predator-eye-color-dashboard"
    );
    this.hybridEyeColorDashboard = this.shadowRoot.getElementById(
      "hybrid-eye-color-dashboard"
    );

    this.eyeColorDashboard = this.shadowRoot.getElementById(
      "eye-color-dashboard"
    );
    this.eyeColorStats = this.shadowRoot.getElementById("eye-color-stats");

    this.fullHistoryGraphContainer = this.shadowRoot.getElementById(
      "full-history-graph-container"
    );
    this.toggleFullHistoryGraphButton = this.shadowRoot.getElementById(
      "toggle-full-history-graph"
    );
    this.fullHistoryGraphCanvas =
      this.shadowRoot.getElementById("full-history-graph");
    this.fullHistoryGraphCtx = this.fullHistoryGraphCanvas.getContext("2d");
    this.fullPopulationData = [];

    this.eyeColorPedigree = {
      prey: {},
      predator: {},
      hybrid: {},
      adaptive: {},
    };
    this.currentPedigreeType = null;
    this.pedigreeGraphContainer = null;
    this.pedigreeGraphCanvas = null;
    this.pedigreeGraphCtx = null;
    this.isPedigreeGraphVisible = false;
    this.lastPedigreeUpdateTime = 0;
    this.pedigreeUpdateInterval = 250;

    this.followedCell = null;

    // Set up large map dimensions
    this.mapWidth = 6000;
    this.mapHeight = 4000;

    // Set up viewport dimensions
    this.viewportWidth = window.innerWidth;
    this.viewportHeight = window.innerHeight;
    this.canvas.width = this.viewportWidth;
    this.canvas.height = this.viewportHeight;

    // Set up camera position
    this.cameraX = 0;
    this.cameraY = 0;

    this.cells = [];
    this.food = [];
    this.maxPopulation = 350;
    this.preyPopulationThreshold = 30;
    this.maxPreyPopulation = 250;
    this.maxHybridPopulation = 1000;

    // FOOD
    this.foodMode = "feedingAreas";
    this.baseFoodCount = 1750;
    this.foodDensity = 0.05;
    this.foodRegenerationRate = 5;
    this.lastFoodRegenerationTime = Date.now();

    // Feeding area properties
    this.feedingAreas = [];
    this.feedingAreaCount = 455;
    this.feedingAreaRadius = 100;
    this.feedingAreaRelocateInterval = 50;
    this.foodPerArea = 10;

    this.params = {
      preyCount: 50,
      predatorCount: 10,
      foodCount: 1250,
      hybridCount: 0,
      adaptiveCount: 0,
    };

    this.foodCount = this.params.foodCount;
    this.populationData = [];
    this.setupGraph();
    this.initializeToggleButtons();

    this.fullscreenButton = this.shadowRoot.getElementById("fullscreen-button");
    this.runtimeButton = this.shadowRoot.getElementById("runtime-button");
    this.runtimePopup = this.shadowRoot.getElementById("runtime-popup");

    this.startTime = Date.now();
    this.runtimeInterval = null;

    this.particleSystem = new ParticleSystem();

    this.flockingEnabled = false;
    this.flockingToggleButton = null;

    this.energyBarBloomActive = false;
    this.energyBarBloomDuration = 0.5;
    this.energyBarBloomTimer = 0;

    this.initializeToggleButtons();

    this.gameMode = null;
    this.isRunning = true;
    this.lastTimestamp = 0;

    this.debugMenuVisible = false;
    this.setupDebugMenu();
    this.setupPedigreeGraph();

    this.userControlledCell = null;
    this.userOffspring = [];
    this.gameOver = false;
    this.setupUserControl();
    this.userDashboard = null;
    this.setupUserDashboard();
    this.initializeFeedingAreas();

    this.userInput = {
      up: false,
      down: false,
      left: false,
      right: false,
    };

    // Set up minimap
    this.minimapCanvas = document.createElement("canvas");
    this.minimapCanvas.width = 150;
    this.minimapCanvas.height = 100;
    this.minimapCtx = this.minimapCanvas.getContext("2d");

    // Add minimap styles
    const minimapStyles = `
      #minimap {
        position: fixed;
        top: 20px;
        right: 20px;
        width: 150px;
        height: 100px;
        background-color: rgba(0, 0, 0, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 2px;
      }
    `;
    const styleElement = document.createElement("style");
    styleElement.textContent = minimapStyles;
    this.shadowRoot.appendChild(styleElement);

    // Add minimap to shadow DOM
    const minimapContainer = document.createElement("div");
    minimapContainer.id = "minimap";
    minimapContainer.appendChild(this.minimapCanvas);
    this.shadowRoot.appendChild(minimapContainer);

    // Set up navigation controls
    this.setupNavigationControls();

    this.animate = this.animate.bind(this);
    this.lastFrameTime = performance.now();
    this.frameCount = 0;
    this.fps = 0;
    this.fpsCounter = null;
    this.showFPS = false;
    this.setupFPSCounter();
    requestAnimationFrame(this.animate);

    // Modify existing event listeners
    window.addEventListener("resize", () => {
      this.viewportWidth = window.innerWidth;
      this.viewportHeight = window.innerHeight;
      this.canvas.width = this.viewportWidth;
      this.canvas.height = this.viewportHeight;
    });
  }

  //UPDATE
  update(currentTime) {
    if (!this.isRunning) return;

    const deltaTime = (currentTime - this.lastTimestamp) / 1000;
    this.lastTimestamp = currentTime;
    const cappedDeltaTime = Math.min(deltaTime, 0.1);

    this.frameCount++;
    if (currentTime - this.lastFrameTime >= 1000) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.lastFrameTime = currentTime;
    }

    this.updateCamera();
    this.ctx.clearRect(0, 0, this.mapWidth, this.mapHeight);
    this.updateFood(cappedDeltaTime);

    this.ctx.save();
    this.ctx.translate(-this.cameraX, -this.cameraY);

    this.particleSystem.update(cappedDeltaTime);
    this.particleSystem.draw(this.ctx);

    let newCells = [];
    let cellsToRemove = [];

    const quadtree = new Quadtree(0, 0, this.mapWidth, this.mapHeight);
    this.cells.forEach((cell) => quadtree.insert(cell));

    for (let i = this.cells.length - 1; i >= 0; i--) {
      const cell = this.cells[i];
      const nearbyObjects = quadtree.retrieve({
        x: cell.x - 100,
        y: cell.y - 100,
        width: 200,
        height: 200,
      });

      const nearestFood = this.findNearest(cell, this.food);
      const nearestCell = this.findNearest(
        cell,
        nearbyObjects.filter((c) => c !== cell && !cellsToRemove.includes(c))
      );

      let updateResult;
      if (
        this.gameMode === "user-controlled" &&
        cell === this.userControlledCell
      ) {
        updateResult = this.updateUserControlledCell(
          cell,
          cappedDeltaTime,
          nearbyObjects
        );
      } else {
        updateResult = cell.update(
          nearestFood,
          nearestCell,
          this.mapWidth,
          this.mapHeight,
          nearbyObjects,
          cappedDeltaTime
        );
      }

      if (updateResult === "remove") {
        cellsToRemove.push(cell);
        continue;
      }

      if (!cell.isUserControlled) {
        if ((cell.isPrey || cell instanceof AdaptiveCell) && nearestFood) {
          if (cell.collidesWith(nearestFood)) {
            const energyGained = cell.eat(nearestFood);
            this.removeFood(nearestFood);

            if (cell.energy >= cell.attributes.reproductionThreshold) {
              const offspring = cell.reproduce();
              if (Array.isArray(offspring)) {
                newCells.push(...offspring);
              }
            }
          }
        } else if (
          !cell.isPrey &&
          nearestCell &&
          cell.collidesWith(nearestCell) &&
          (nearestCell.isPrey ||
            nearestCell instanceof HybridCell ||
            nearestCell instanceof AdaptiveCell)
        ) {
          if (!nearestCell.defend(cell)) {
            const energyGained = cell.eat(nearestCell);
            cellsToRemove.push(nearestCell);

            if (cell.energy >= cell.attributes.reproductionThreshold) {
              const offspring = cell.reproduce();
              if (Array.isArray(offspring)) {
                newCells.push(...offspring);
              }
            }
          }
        }
      }

      if (
        (cell instanceof HybridCell || cell instanceof AdaptiveCell) &&
        nearestCell
      ) {
        if (
          cell.collidesWith(nearestCell) &&
          ((cell instanceof HybridCell &&
            nearestCell instanceof AdaptiveCell) ||
            (cell instanceof AdaptiveCell && nearestCell instanceof HybridCell))
        ) {
          const battleResult = cell.battle(nearestCell);
          if (battleResult !== null) {
            if (battleResult) {
              this.createBattleParticles(
                nearestCell.x,
                nearestCell.y,
                nearestCell.color
              );
              cellsToRemove.push(nearestCell);
            } else {
              this.createBattleParticles(cell.x, cell.y, cell.color);
              cellsToRemove.push(cell);
              continue;
            }
          }
        }
      }

      if (!cell.isPrey) {
        cell.huntInPack(
          nearbyObjects.filter((c) => !cellsToRemove.includes(c))
        );
      }

      if (this.isInViewport(cell)) {
        cell.draw(this.ctx);
      }
    }

    for (const newCell of newCells) {
      if (this.cells.length < this.maxPopulation) {
        if (
          newCell instanceof HybridCell &&
          this.cells.filter((c) => c instanceof HybridCell).length <
            this.maxHybridPopulation
        ) {
          this.cells.push(newCell);
        } else if (
          newCell.isPrey &&
          this.cells.filter((c) => c.isPrey && !(c instanceof HybridCell))
            .length < this.maxPreyPopulation
        ) {
          this.cells.push(newCell);
        } else if (!newCell.isPrey) {
          this.cells.push(newCell);
        }
      }
    }

    this.ctx.restore();

    if (this.frameCount % 10 === 0) {
      this.updateGraph();
      this.updateEyeColorStats();
      this.updateDashboard();
    }

    this.updateUserDashboard();

    if (this.checkEndgame()) {
      this.isRunning = false;
      return;
    }

    if (this.showFPS) {
      this.fpsCounter.textContent = `FPS: ${this.fps}`;
    }

    if (this.gameMode === "user-controlled" && this.userControlledCell) {
      this.focusCameraOnCell(this.userControlledCell);
    } else if (
      this.gameMode === "simulation-only" &&
      this.followedCell &&
      this.cells.includes(this.followedCell)
    ) {
      this.focusCameraOnCell(this.followedCell);
    } else if (this.gameMode === "simulation-only" && this.followedCell) {
      const dashboard = this.shadowRoot.querySelector(
        ".detailed-dashboard:not(.hidden)"
      );
      if (dashboard) {
        const cellType = dashboard.id.split("-").pop();
        const eyeColor = this.followedCell.eyeColor;
        const cells = this.cells.filter(
          (c) => c.eyeColor === eyeColor && this.getCellType(c) === cellType
        );
        if (cells.length > 0) {
          this.followedCell = cells[0];
          this.focusCameraOnCell(this.followedCell);
          this.updateDetailedDashboard(cells, eyeColor, cellType);
        } else {
          dashboard.classList.add("hidden");
          this.followedCell = null;
        }
      } else {
        this.followedCell = null;
      }
    }

    cellsToRemove.forEach((cell) => this.removeCell(cell));

    this.updateMinimap();

    if (this.isRunning) {
      this.animationFrame = requestAnimationFrame(this.update.bind(this));
    }
  }

  //EVENT LISTENERS
  setupEventListeners() {
    const applyChangesButton = this.shadowRoot.getElementById("applyChanges");
    if (applyChangesButton) {
      applyChangesButton.addEventListener("click", () => this.applyChanges());
    }

    if (this.toggleGuiButton) {
      this.toggleGuiButton.addEventListener("click", () => this.toggleGUI());
    }

    const toggleButtons = [
      { id: "toggle-dashboard", method: this.toggleDashboard },
      { id: "toggle-graph", method: this.toggleGraph },
      { id: "toggle-full-history-graph", method: this.toggleFullHistoryGraph },
      { id: "toggle-hybrid", method: this.toggleHybridMode },
      { id: "toggle-adaptive", method: this.toggleAdaptiveMode },
      { id: "toggle-flocking", method: this.toggleFlocking },
      { id: "toggle-food-mode", method: this.toggleFoodMode },
    ];

    toggleButtons.forEach(({ id, method }) => {
      const button = this.shadowRoot.getElementById(id);
      if (button) {
        button.addEventListener("click", () => method.call(this));
      } else {
        console.warn(`Button with id "${id}" not found`);
      }
    });

    if (this.restartButton) {
      this.restartButton.addEventListener("click", () =>
        this.restartSimulation(this.gameMode)
      );
    }

    if (this.fullscreenButton) {
      this.fullscreenButton.addEventListener("click", () =>
        this.toggleFullscreen()
      );
    }

    if (this.runtimeButton) {
      this.runtimeButton.addEventListener("click", () =>
        this.toggleRuntimePopup()
      );
    }

    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement && this.fullscreenButton) {
        this.fullscreenButton.textContent = "⛶";
      }
    });
    document.addEventListener(
      "webkitfullscreenchange",
      this.handleFullscreenChange.bind(this)
    );

    const eyeIcons = this.shadowRoot.querySelectorAll(".eye-icon");
    eyeIcons.forEach((icon) => {
      icon.addEventListener("click", (event) => {
        const type = event.currentTarget.getAttribute("data-type");
        this.toggleEyeColorDashboard(type);
      });
    });

    const inputs = this.shadowRoot.querySelectorAll("input");
    inputs.forEach((input) => {
      input.addEventListener("input", (e) => {
        this.params[e.target.id] = parseInt(e.target.value, 10);
      });
    });

    // Add event listener for the debug toggle
    const debugToggle = this.shadowRoot.getElementById("toggle-debug");
    if (debugToggle) {
      debugToggle.addEventListener("click", () => this.toggleDebugMenu());
    }

    // Add event listener for the settings toggle (functionality to be implemented later)
    const settingsToggle = this.shadowRoot.getElementById("toggle-settings");
    if (settingsToggle) {
      settingsToggle.addEventListener("click", () => {
        console.log("Settings functionality not implemented yet");
      });
    }

    window.addEventListener("resize", () => {
      this.mapWidth = window.innerWidth;
      this.mapHeight = window.innerHeight;
      this.canvas.mapWidth = this.mapWidth;
      this.canvas.mapHeight = this.mapHeight;
    });
  }

  //ANIMATION
  animate(currentTime) {
    if (!this.isRunning) return;

    // Calculate delta time
    const deltaTime = this.lastTimestamp
      ? (currentTime - this.lastTimestamp) / 1000
      : 0;
    this.lastTimestamp = currentTime;

    // Limit delta time to prevent huge jumps
    const cappedDeltaTime = Math.min(deltaTime, 0.1);

    // Calculate FPS
    this.frameCount++;
    if (currentTime - this.lastFrameTime >= 1000) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.lastFrameTime = currentTime;
    }

    this.updateCamera();

    // Clear the entire canvas, not just the viewport
    this.ctx.clearRect(0, 0, this.mapWidth, this.mapHeight);

    // Update and draw food
    this.updateFood(cappedDeltaTime);

    // Save the canvas state and translate it
    this.ctx.save();
    this.ctx.translate(-this.cameraX, -this.cameraY);

    // Draw food
    this.food.forEach((food) => {
      if (this.isInViewport(food)) {
        food.update(cappedDeltaTime);
        food.draw(this.ctx);
      }
    });

    // Draw particles
    this.particleSystem.update(cappedDeltaTime);
    this.particleSystem.draw(this.ctx);

    let newCells = [];

    // Use quadtree for efficient spatial partitioning
    const quadtree = new Quadtree(0, 0, this.mapWidth, this.mapHeight);
    this.cells.forEach((cell) => quadtree.insert(cell));

    // Adjust food supply every 60 frames
    if (this.frameCount % 30 === 0) {
      this.adjustFoodSupply();
    }

    if (
      currentTime - this.lastPedigreeUpdateTime >
      this.pedigreeUpdateInterval
    ) {
      if (this.isPedigreeGraphVisible && this.currentPedigreeType) {
        this.updatePedigreeGraph(this.currentPedigreeType);
      }
      this.lastPedigreeUpdateTime = currentTime;
    }

    // Update and draw cells
    for (let i = 0; i < this.cells.length; i++) {
      const cell = this.cells[i];
      if (
        !cell ||
        typeof cell.x === "undefined" ||
        typeof cell.y === "undefined" ||
        !isFinite(cell.x) ||
        !isFinite(cell.y)
      ) {
        continue; // Skip invalid cells
      }

      const nearbyObjects = quadtree.retrieve({
        x: cell.x - 50,
        y: cell.y - 50,
        width: 100,
        height: 100,
      });

      const nearestFood = this.findNearest(cell, this.food);
      const nearestCell = this.findNearest(
        cell,
        nearbyObjects.filter((c) => c !== cell)
      );

      if (
        this.gameMode === "user-controlled" &&
        cell === this.userControlledCell
      ) {
        this.updateUserControlledCell(cell, cappedDeltaTime, nearbyObjects);
      } else {
        cell.update(
          nearestFood,
          nearestCell,
          this.mapWidth,
          this.mapHeight,
          nearbyObjects,
          cappedDeltaTime
        );
      }

      // Handle eating
      if (!cell.isUserControlled) {
        if ((cell.isPrey || cell instanceof AdaptiveCell) && nearestFood) {
          if (cell.collidesWith(nearestFood)) {
            const energyGained = cell.eat(nearestFood);
            this.removeFood(nearestFood);

            // Check for reproduction after eating
            if (cell.energy >= cell.attributes.reproductionThreshold) {
              const offspring = cell.reproduce();
              if (Array.isArray(offspring)) {
                newCells.push(...offspring);
              }
            }
          }
        } else if (
          !cell.isPrey &&
          nearestCell &&
          cell.collidesWith(nearestCell) &&
          (nearestCell.isPrey ||
            nearestCell instanceof HybridCell ||
            nearestCell instanceof AdaptiveCell)
        ) {
          if (!nearestCell.defend(cell)) {
            const energyGained = cell.eat(nearestCell);
            this.removeCell(nearestCell);

            // Check for reproduction after eating
            if (cell.energy >= cell.attributes.reproductionThreshold) {
              const offspring = cell.reproduce();
              if (Array.isArray(offspring)) {
                newCells.push(...offspring);
              }
            }
          }
        }
      }

      // Draw the cell if it's in the viewport
      if (this.isInViewport(cell)) {
        cell.draw(this.ctx);
      }
    }

    // Add new cells respecting population limits
    for (const newCell of newCells) {
      if (this.cells.length < this.maxPopulation) {
        if (
          newCell instanceof HybridCell &&
          this.cells.filter((c) => c instanceof HybridCell).length <
            this.maxHybridPopulation
        ) {
          this.cells.push(newCell);
        } else if (
          newCell.isPrey &&
          this.cells.filter((c) => c.isPrey && !(c instanceof HybridCell))
            .length < this.maxPreyPopulation
        ) {
          this.cells.push(newCell);
        } else if (!newCell.isPrey) {
          this.cells.push(newCell);
        }
      }
    }

    // Restore the canvas state
    this.ctx.restore();

    // Update graph and dashboard less frequently
    if (this.frameCount % 10 === 0) {
      this.updateGraph();
      this.updateEyeColorStats();
      this.updateDashboard();
    }

    // Update user dashboard
    this.updateUserDashboard();

    // Check for win/lose conditions
    if (this.checkEndgame()) {
      this.isRunning = false;
      return;
    }

    // Update FPS counter
    if (this.showFPS) {
      this.fpsCounter.textContent = `FPS: ${this.fps}`;
    }

    // Update energy bar bloom effect
    if (this.energyBarBloomActive) {
      this.energyBarBloomTimer -= deltaTime;
      if (this.energyBarBloomTimer <= 0) {
        this.energyBarBloomActive = false;
        this.energyBarBloomTimer = 0;
      }
    }

    // Update and draw minimap
    this.updateMinimap();

    // Schedule the next animation frame if the game is still running
    if (this.isRunning) {
      this.animationFrame = requestAnimationFrame(this.animate.bind(this));
    }
  }

  //INITIALIZE
  initializeSimulation() {
    this.cells = [];
    this.food = [];
    this.foodCount = this.params.foodCount;
    this.populationData = [];
    this.fullPopulationData = [];
    const preyColors = this.generateUniqueColors(
      Math.min(this.params.preyCount, this.maxPreyPopulation)
    );
    const predatorColors = this.generateUniqueColors(this.params.predatorCount);
    const hybridColors = this.generateUniqueColors(this.params.hybridCount);

    for (
      let i = 0;
      i < Math.min(this.params.preyCount, this.maxPreyPopulation);
      i++
    ) {
      const cell = new Cell(
        Math.random() * this.mapWidth,
        Math.random() * this.mapHeight,
        "white",
        true,
        preyColors[i]
      );
      cell.simulation = this;
      cell.age = 0;
      cell.baseSizeRadius = cell.radius;
      this.cells.push(cell);
    }

    for (let i = 0; i < this.params.predatorCount; i++) {
      const cell = new Cell(
        Math.random() * this.mapWidth,
        Math.random() * this.mapHeight,
        "magenta",
        false,
        predatorColors[i],
        null,
        null,
        Math.floor(Math.random() * 4) + 6
      );
      cell.simulation = this;
      cell.age = 0;
      cell.baseSizeRadius = cell.radius;
      this.cells.push(cell);
    }

    if (this.hybridMode) {
      const hybridColors = this.generateUniqueColors(this.params.hybridCount);
      for (let i = 0; i < this.params.hybridCount; i++) {
        const cell = new HybridCell(
          Math.random() * this.mapWidth,
          Math.random() * this.mapHeight,
          hybridColors[i]
        );
        cell.simulation = this;
        cell.age = 0;
        cell.baseSizeRadius = cell.radius;
        this.cells.push(cell);
      }
    }

    // Initialize food supply
    this.initializeFeedingAreas();
    this.initializeFood();
    if (this.gameMode === "user-controlled") {
      this.selectNewPredatorCell();
    } else {
      this.userControlledCell = null;
    }

    if (this.adaptiveMode) {
      const adaptiveColors = this.generateUniqueColors(
        this.params.adaptiveCount
      );
      for (let i = 0; i < this.params.adaptiveCount; i++) {
        const cell = new AdaptiveCell(
          Math.random() * this.mapWidth,
          Math.random() * this.mapHeight,
          adaptiveColors[i]
        );
        cell.simulation = this;
        cell.age = 0;
        cell.baseSizeRadius = cell.radius;
        this.cells.push(cell);
      }
    }

    const minPreyCount = Math.max(
      this.params.preyCount,
      this.params.predatorCount * 3
    );
    while (this.cells.filter((cell) => cell.isPrey).length < minPreyCount) {
      const preyColor = this.generateRandomColor();
      const cell = new Cell(
        Math.random() * this.mapWidth,
        Math.random() * this.mapHeight,
        "white",
        true,
        preyColor
      );
      cell.simulation = this;
      this.cells.push(cell);
    }

    Cell.resetDefaults();
  }
  initializeToggleButtons() {
    const buttons = [
      { id: "toggle-dashboard", method: () => this.toggleDashboard() },
      { id: "toggle-graph", method: () => this.toggleGraph() },
      {
        id: "toggle-full-history-graph",
        method: () => this.toggleFullHistoryGraph(),
      },
      { id: "toggle-hybrid", method: () => this.toggleHybridMode() },
      { id: "toggle-adaptive", method: () => this.toggleAdaptiveMode() },
      { id: "toggle-flocking", method: () => this.toggleFlocking() },
      { id: "toggle-food-mode", method: () => this.toggleFoodMode() },
    ];

    buttons.forEach(({ id, method }) => {
      const button = this.shadowRoot.getElementById(id);
      if (button) {
        button.addEventListener("click", method);
      } else {
        console.warn(`Button with id "${id}" not found`);
      }
    });
  }

  //SIMULATION MODE
  setupNavigationControls() {
    // Add keyboard controls for simulation mode
    window.addEventListener("keydown", (e) => {
      if (this.gameMode !== "simulation-only" || this.followedCell) return;
      const speed = 40;
      switch (e.key) {
        case "w":
          this.cameraY = Math.max(0, this.cameraY - speed);
          break;
        case "s":
          this.cameraY = Math.min(
            this.mapHeight - this.viewportHeight,
            this.cameraY + speed
          );
          break;
        case "a":
          this.cameraX = Math.max(0, this.cameraX - speed);
          break;
        case "d":
          this.cameraX = Math.min(
            this.mapWidth - this.viewportWidth,
            this.cameraX + speed
          );
          break;
      }
    });

    // Add minimap click navigation
    this.minimapCanvas.addEventListener("click", (e) => {
      const rect = this.minimapCanvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.cameraX =
        (x / this.minimapCanvas.width) * this.mapWidth - this.viewportWidth / 2;
      this.cameraY =
        (y / this.minimapCanvas.height) * this.mapHeight -
        this.viewportHeight / 2;
      this.clampCamera();
    });
  }
  isInViewport(entity) {
    const buffer = 50; // Buffer zone around the viewport
    const screenX = entity.x - this.cameraX;
    const screenY = entity.y - this.cameraY;
    const radius = entity.radius || 0;

    return (
      screenX + radius + buffer >= 0 &&
      screenX - radius - buffer <= this.viewportWidth &&
      screenY + radius + buffer >= 0 &&
      screenY - radius - buffer <= this.viewportHeight
    );
  }
  updateVisibleEntities() {
    this.visibleCells = this.cells.filter((cell) => this.isInViewport(cell));
    this.visibleFood = this.food.filter((food) => this.isInViewport(food));
  }
  getCellType(cell) {
    if (cell instanceof HybridCell) return "hybrid";
    if (cell instanceof AdaptiveCell) return "adaptive";
    return cell.isPrey ? "prey" : "predator";
  }
  drawSimulation() {
    this.ctx.save();
    this.ctx.translate(-this.cameraX, -this.cameraY);

    this.visibleFood.forEach((food) => food.draw(this.ctx));
    this.particleSystem.draw(this.ctx);
    this.visibleCells.forEach((cell) => cell.draw(this.ctx));

    this.ctx.restore();
  }
  updateMinimap() {
    const scale = Math.min(
      this.minimapCanvas.width / this.mapWidth,
      this.minimapCanvas.height / this.mapHeight
    );
    this.minimapCtx.clearRect(
      0,
      0,
      this.minimapCanvas.width,
      this.minimapCanvas.height
    );

    // Draw cells on minimap
    this.cells.forEach((cell) => {
      const x = (cell.x / this.mapWidth) * this.minimapCanvas.width;
      const y = (cell.y / this.mapHeight) * this.minimapCanvas.height;
      this.minimapCtx.fillStyle = cell.color;
      this.minimapCtx.fillRect(x, y, 2, 2);
    });

    // Draw food on minimap
    this.minimapCtx.fillStyle = "rgba(0, 255, 0, 0.5)";
    this.food.forEach((food) => {
      const x = (food.x / this.mapWidth) * this.minimapCanvas.width;
      const y = (food.y / this.mapHeight) * this.minimapCanvas.height;
      this.minimapCtx.fillRect(x, y, 1, 1);
    });

    // Draw viewport rectangle on minimap
    const vpX = (this.cameraX / this.mapWidth) * this.minimapCanvas.width;
    const vpY = (this.cameraY / this.mapHeight) * this.minimapCanvas.height;
    const vpWidth =
      (this.viewportWidth / this.mapWidth) * this.minimapCanvas.width;
    const vpHeight =
      (this.viewportHeight / this.mapHeight) * this.minimapCanvas.height;
    this.minimapCtx.strokeStyle = "white";
    this.minimapCtx.strokeRect(vpX, vpY, vpWidth, vpHeight);
  }
  clampCamera() {
    this.cameraX = Math.max(
      0,
      Math.min(this.cameraX, this.mapWidth - this.viewportWidth)
    );
    this.cameraY = Math.max(
      0,
      Math.min(this.cameraY, this.mapHeight - this.viewportHeight)
    );
  }
  updateCamera() {
    if (this.gameMode === "user-controlled" && this.userControlledCell) {
      this.focusCameraOnCell(this.userControlledCell);
    } else if (this.gameMode === "simulation-only" && this.followedCell) {
      this.focusCameraOnCell(this.followedCell);
    } else if (this.gameMode === "simulation-only") {
      this.focusCameraOnCell(this.followedCell);
    }

    // Ensure camera stays within map bounds
    this.cameraX = Math.max(
      0,
      Math.min(this.cameraX, this.mapWidth - this.viewportWidth)
    );
    this.cameraY = Math.max(
      0,
      Math.min(this.cameraY, this.mapHeight - this.viewportHeight)
    );

    this.updateVisibleEntities();
  }
  findNextCellOfSameType(currentCell) {
    if (!currentCell) return null;

    const cellType = this.getCellType(currentCell);
    const eyeColor = currentCell.eyeColor;

    const cellsOfSameType = this.cells.filter(
      (cell) =>
        this.getCellType(cell) === cellType && cell.eyeColor === eyeColor
    );

    const currentIndex = cellsOfSameType.indexOf(currentCell);
    if (currentIndex === -1 || cellsOfSameType.length === 1) return null;

    const nextIndex = (currentIndex + 1) % cellsOfSameType.length;
    return cellsOfSameType[nextIndex];
  }

  //GAME MODE
  setupUserControl() {
    window.addEventListener("keydown", this.handleKeyPress.bind(this));
    window.addEventListener("keyup", this.handleKeyRelease.bind(this));
  }
  connectedCallback() {
    this.showStartGamePopup();
    this.setupEventListeners();
  }
  createEatingParticles(x, y) {
    const particleCount = 10;
    const particleColor = "rgba(255, 0, 0, 0.7)";
    this.particleSystem.addParticles(
      x,
      y,
      particleColor,
      particleCount,
      "burst"
    );

    // Add an energy burst effect
    this.particleSystem.addParticles(
      x,
      y,
      "rgba(255, 255, 0, 0.5)",
      5,
      "energyBurst"
    );
  }
  setupUserDashboard() {
    this.userDashboard = document.createElement("div");
    this.userDashboard.id = "user-dashboard";
    this.userDashboard.style.cssText = `
      position: fixed;
      bottom: 30px;
      left: 80px;
      
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 15px;
      border-radius: 15px;
      font-family: "Space Grotesk", sans-serif;
      font-size: 14px;
      z-index: 1000;
      display: none;
      width: 300px;
      height: 110px;
      box-shadow: 0 0 20px rgba(0, 100, 255, 0.3);
      border: 1px solid rgba(0, 100, 255, 0.5);
    `;
    this.shadowRoot.appendChild(this.userDashboard);
  }
  updateUserDashboard() {
    if (
      !this.userDashboard ||
      this.gameMode !== "user-controlled" ||
      !this.userControlledCell
    ) {
      if (this.userDashboard) this.userDashboard.style.display = "none";
      return;
    }

    const cell = this.userControlledCell;
    this.userDashboard.style.display = "block";
    const energyPercentage = (cell.energy / Cell.MAX_ENERGY) * 100;
    const levelProgress = (cell.preyEaten / cell.preyEatenForNextLevel) * 100;

    const bloomEffect = this.energyBarBloomActive
      ? `box-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00; transition: all 0.3s ease-in-out;`
      : "";

    const powerupIcons = cell.powerups
      .map((powerup) => {
        const iconMap = {
          "Virus Pull Aura": "🦠",
          "Quantum Tunneling": "🌀",
          "Viral Replicator": "🦠",
          "Temporal Rift": "⏳",
          "Biome Catalyst": "🌿",
          "Energy Efficiency": "🔋",
          "Speed Boost": "⚡",
        };
        return `
        <div style="position: relative; display: inline-block; margin-right: 5px;">
          <span style="font-size: 20px;">${iconMap[powerup.name] || "🔮"}</span>
          <span style="position: absolute; top: -5px; right: -5px; background-color: #ffd700; color: black; border-radius: 50%; padding: 2px 5px; font-size: 10px;">${
            powerup.level
          }</span>
        </div>
      `;
      })
      .join("");

    this.userDashboard.innerHTML = `
      <div style="display: flex; align-items: center; margin-bottom: 5px;">
        <div style="width: 30px; height: 30px; border-radius: 50%; background-color: rgba(0, 100, 255, 0.3); display: flex; justify-content: center; align-items: center; font-size: 14px; font-weight: bold; margin-right: 10px;">
          ${cell.level}
        </div>
        <div style="flex-grow: 1;">
          <div class="energy-bar" style="width: 100%; height: 8px; background-color: #333; border-radius: 4px; overflow: hidden; ${bloomEffect}">
            <div style="width: ${energyPercentage}%; height: 100%; background-color: #00ff00;"></div>
          </div>
        </div>
      </div>
      
      <div class="level-progress-bar" style="width: 100%; height: 8px; background-color: #333; border-radius: 4px; overflow: hidden; margin-bottom: 5px;">
        <div style="width: ${levelProgress}%; height: 100%; background-color: #ffd700;"></div>
      </div>
      
      <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px;">
        <span>Age: ${Math.floor(cell.age)}</span>
        <div style="display: flex; align-items: center;">
          <span style="margin-right: 15px;">Eye:</span>
          <div style="width: 12px; height: 12px; border-radius: 50%; background-color: ${
            cell.eyeColor
          }; margin-right: 8px;"></div>
          <span>S: ${cell.geneticTraits.speedModifier.toFixed(
            2
          )} E: ${cell.geneticTraits.energyEfficiency.toFixed(
      2
    )} R: ${cell.geneticTraits.reproductionBonus.toFixed(2)}</span>
        </div>
      </div>
      
      <div style="margin-top: 15px;">
        ${powerupIcons}
      </div>
    `;
  }
  handleKeyPress(event) {
    if (this.gameOver || this.gameMode !== "user-controlled") return;

    const key = event.key.toLowerCase();
    if (["w", "a", "s", "d"].includes(key)) {
      event.preventDefault();
      this.userInput[this.getDirectionFromKey(key)] = true;
    }
  }
  handleKeyRelease(event) {
    if (this.gameOver || this.gameMode !== "user-controlled") return;

    const key = event.key.toLowerCase();
    if (["w", "a", "s", "d"].includes(key)) {
      event.preventDefault();
      this.userInput[this.getDirectionFromKey(key)] = false;
    }
  }
  updateUserControlledCell(cell, deltaTime, neighbors) {
    const speed = cell.attributes.maxSpeed * 145;
    const diagonalSpeed = speed / Math.sqrt(2);

    let dx = 0;
    let dy = 0;

    if (this.userInput.up && this.userInput.left) {
      dx = -diagonalSpeed;
      dy = -diagonalSpeed;
    } else if (this.userInput.up && this.userInput.right) {
      dx = diagonalSpeed;
      dy = -diagonalSpeed;
    } else if (this.userInput.down && this.userInput.left) {
      dx = -diagonalSpeed;
      dy = diagonalSpeed;
    } else if (this.userInput.down && this.userInput.right) {
      dx = diagonalSpeed;
      dy = diagonalSpeed;
    } else {
      if (this.userInput.up) dy -= speed;
      if (this.userInput.down) dy += speed;
      if (this.userInput.left) dx -= speed;
      if (this.userInput.right) dx += speed;
    }

    // Apply smooth acceleration and deceleration
    const acceleration = 0.2;
    cell.vx += (dx - cell.vx) * acceleration;
    cell.vy += (dy - cell.vy) * acceleration;

    // Apply the movement
    cell.x += cell.vx * deltaTime;
    cell.y += cell.vy * deltaTime;

    // Wrap around screen edges
    cell.x = (cell.x + this.mapWidth) % this.mapWidth;
    cell.y = (cell.y + this.mapHeight) % this.mapHeight;
    this.focusCameraOnCell(cell);

    // Check for collisions with other cells
    const nearbyCells = neighbors.filter(
      (otherCell) => otherCell !== cell && this.checkCollision(cell, otherCell)
    );

    for (const otherCell of nearbyCells) {
      if (otherCell.isPrey) {
        // Eat prey
        const offspring = cell.userControlledEat(otherCell);
        this.removeCell(otherCell);
        this.createEatingParticles(cell.x, cell.y);
        if (offspring.length > 0) {
          this.addUserOffspring(offspring);
          this.triggerEnergyBarBloom();
        }
      } else if (!otherCell.isPrey && !otherCell.isUserOffspring) {
        // Battle with other predators (excluding offspring)
        const battleResult = this.battlePredators(cell, otherCell);
        if (!battleResult) {
          // User lost the battle
          this.handleUserDeath(cell);
          return;
        }
      }
    }

    // Get nearby cells for projectile collision detection
    const nearbyObjects = neighbors.filter(
      (otherCell) => otherCell !== cell && this.checkCollision(cell, otherCell)
    );

    cell.update(
      null,
      null,
      this.mapWidth,
      this.mapHeight,
      nearbyObjects,
      deltaTime
    );

    // Apply virus pull aura effect
    if (cell.virusAura) {
      const affectedCells = cell.applyVirusAura(neighbors);
      this.visualizeVirusEffect(affectedCells);
    }

    // Spawn eggs
    cell.spawnEgg(deltaTime);
    cell.eggs.forEach((egg) => {
      this.particleSystem.addEggSpawnEffect(egg.x, egg.y);
    });

    // Shoot projectiles
    const nearestEnemy = this.findNearest(
      cell,
      neighbors.filter((c) => !c.isPrey && c !== cell)
    );
    cell.shootProjectile(nearestEnemy, deltaTime);
    cell.updateProjectiles(deltaTime, this.mapWidth, this.mapHeight, neighbors);

    // Check for reproduction
    if (cell.energy >= Cell.USER_CONTROLLED_REPRODUCTION_THRESHOLD) {
      const offspring = cell.reproduce();
      if (offspring.length > 0) {
        this.addUserOffspring(offspring);
        this.triggerEnergyBarBloom();
      }
    }

    // Handle leveling up based on prey eaten
    const preyEatenForNextLevel = cell.level * 25;
    if (cell.preyEaten >= preyEatenForNextLevel && cell.level < 5) {
      const levelUpResult = cell.levelUp();
      if (levelUpResult) {
        this.showLevelUpEffect(levelUpResult.x, levelUpResult.y);
        this.updateUserDashboard();
      }
    }

    // Update energy (reduced energy drop rate for user-controlled cell)
    const baseCost = cell.attributes.movementCost * 0.7 * deltaTime; // Reduced by 30%
    const movementCost =
      Math.hypot(cell.vx, cell.vy) / cell.attributes.maxSpeed;
    const energyConsumption = baseCost * (1 + movementCost);
    cell.energy -= energyConsumption;

    if (cell.energy <= 0) {
      return "remove";
    }

    // Check for level up
    if (cell.preyEaten >= cell.level * 5 && cell.level < 5) {
      cell.level++;
      cell.preyEaten = 0;
      this.showLevelUpPopup(cell);
      return; // Exit the method early as we've paused the game
    }

    // Update age
    cell.age += deltaTime;
    this.updateUserDashboard();
  }
  showLevelUpPopup(cell) {
    const popup = document.createElement("div");
    popup.id = "level-up-popup";
    popup.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 20px;
      border-radius: 15px;
      font-family: "Space Grotesk", sans-serif;
      z-index: 1001;
      width: 300px;
      box-shadow: 0 0 20px rgba(0, 100, 255, 0.5);
      border: 2px solid rgba(0, 100, 255, 0.7);
      text-align: center;
    `;

    const availablePowerups = this.getRandomPowerups(3);

    popup.innerHTML = `
      <h2 style="margin: 0 0 20px; color: #00BFFF; text-shadow: 0 0 10px rgba(0, 191, 255, 0.7);">Level Up!</h2>
      <div style="font-size: 24px; margin-bottom: 20px;">
        <span style="background-color: rgba(0, 100, 255, 0.3); border-radius: 50%; padding: 10px; margin-right: 10px;">
          ${cell.level - 1}
        </span>
        <span style="color: #00BFFF; font-size: 36px;">➔</span>
        <span style="background-color: rgba(0, 100, 255, 0.3); border-radius: 50%; padding: 10px; margin-left: 10px;">
          ${cell.level}
        </span>
      </div>
      <p style="margin-bottom: 20px;">Choose a powerup:</p>
      <div style="display: flex; justify-content: space-around; margin-bottom: 20px;">
        ${availablePowerups
          .map(
            (powerup, index) => `
          <button id="powerup-${index}" style="
            background-color: rgba(0, 100, 255, 0.2);
            border: none;
            color: white;
            padding: 10px;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 80px;
          ">
            ${this.getPowerupIcon(powerup.name)}
            <span style="margin-top: 5px; font-size: 12px;">${
              powerup.name
            }</span>
            <span style="font-size: 10px; margin-top: 3px;">Lvl ${
              (cell.powerups.find((p) => p.name === powerup.name)?.level || 0) +
              1
            }</span>
          </button>
        `
          )
          .join("")}
      </div>
    `;

    this.shadowRoot.appendChild(popup);

    availablePowerups.forEach((powerup, index) => {
      const button = popup.querySelector(`#powerup-${index}`);
      button.addEventListener("click", () => {
        cell.addPowerup(powerup);
        this.shadowRoot.removeChild(popup);
        this.resumeGame();
      });
      button.addEventListener("mouseover", () => {
        button.style.backgroundColor = "rgba(0, 100, 255, 0.4)";
        button.style.transform = "scale(1.1)";
      });
      button.addEventListener("mouseout", () => {
        button.style.backgroundColor = "rgba(0, 100, 255, 0.2)";
        button.style.transform = "scale(1)";
      });
    });

    this.pauseGame();
  }

  showPowerupDescription(powerup, button) {
    const descriptionBox = document.createElement("div");
    descriptionBox.id = "powerup-description";
    descriptionBox.style.cssText = `
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 10px;
      border-radius: 5px;
      font-size: 12px;
      width: 150px;
      z-index: 1002;
      pointer-events: none;
      transition: opacity 0.3s ease;
    `;

    const description = this.getPowerupDescription(powerup.name);
    const currentLevel = powerup.levels[powerup.level] || powerup.levels[0];

    let detailedDescription = `<strong>${powerup.name}</strong><br>${description}<br><br>`;

    for (const [key, value] of Object.entries(currentLevel)) {
      detailedDescription += `${
        key.charAt(0).toUpperCase() + key.slice(1)
      }: ${value}<br>`;
    }

    descriptionBox.innerHTML = detailedDescription;

    button.appendChild(descriptionBox);

    // Fade in effect
    setTimeout(() => {
      descriptionBox.style.opacity = "1";
    }, 0);
  }

  hidePowerupDescription() {
    const descriptionBox = this.shadowRoot.getElementById(
      "powerup-description"
    );
    if (descriptionBox) {
      descriptionBox.remove();
    }
  }

  getPowerupIcon(powerupName) {
    const iconMap = {
      "Virus Pull Aura": "🦠",
      "Quantum Tunneling": "🌀",
      "Viral Replicator": "🧬",
      "Temporal Rift": "⏳",
      "Biome Catalyst": "🌿",
      "Energy Efficiency": "🔋",
      "Speed Boost": "⚡",
    };
    return `<span style="font-size: 24px;">${
      iconMap[powerupName] || "🔮"
    }</span>`;
  }
  getRandomPowerups(count) {
    const shuffled = POWERUPS.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  pauseGame() {
    this.isRunning = false;
  }
  resumeGame() {
    this.isRunning = true;
    this.animate(performance.now());
  }
  triggerEnergyBarBloom() {
    this.energyBarBloomActive = true;
    this.energyBarBloomTimer = this.energyBarBloomDuration;
  }
  showLevelUpEffect(x, y) {
    this.particleSystem.addLevelUpEffect(x, y);
  }
  handleInfectedCells(infectedCells, deltaTime) {
    infectedCells.forEach((cell) => {
      // Create virus effect particles
      this.particleSystem.addParticles(
        cell.x,
        cell.y,
        "rgba(0, 255, 0, 0.5)",
        3,
        "virusEffect"
      );

      // Chance for the infected cell to die
      if (Math.random() < 0.01 * deltaTime) {
        this.cells = this.cells.filter((c) => c !== cell);
        // Create death effect particles
        this.particleSystem.addParticles(
          cell.x,
          cell.y,
          "rgba(255, 0, 0, 0.5)",
          5,
          "cellDeath"
        );
      }
    });
  }
  visualizeVirusEffect(infectedCells) {
    infectedCells.forEach((cell) => {
      this.particleSystem.addParticles(
        cell.x,
        cell.y,
        "rgba(0, 255, 0, 0.5)",
        3,
        "virusEffect"
      );
    });
  }
  getDirectionFromKey(key) {
    const keyMap = {
      w: "up",
      a: "left",
      s: "down",
      d: "right",
    };
    return keyMap[key];
  }
  moveUserControlledCell(key) {
    if (!this.userControlledCell) return;

    const speed = this.userControlledCell.attributes.maxSpeed * 2; // Increased speed for responsiveness
    switch (key) {
      case "w":
        this.userControlledCell.vy = -speed;
        break;
      case "s":
        this.userControlledCell.vy = speed;
        break;
      case "a":
        this.userControlledCell.vx = -speed;
        break;
      case "d":
        this.userControlledCell.vx = speed;
        break;
    }
  }
  selectNewPredatorCell() {
    const availableCells =
      this.userOffspring.length > 0
        ? this.userOffspring
        : this.cells.filter(
            (cell) =>
              !cell.isPrey &&
              !(cell instanceof HybridCell) &&
              !(cell instanceof AdaptiveCell)
          );

    if (availableCells.length > 0) {
      this.userControlledCell =
        availableCells[Math.floor(Math.random() * availableCells.length)];
      this.userControlledCell.isUserControlled = true;
      this.userControlledCell.age = 0;
      this.userControlledCell.level = 1;
      this.userControlledCell.preyEaten = 0;
      this.userControlledCell.color = "blue";
      this.updateUserDashboard();

      // Center the camera on the user-controlled cell
      this.focusCameraOnCell(this.userControlledCell, true);
    } else {
      this.gameOver = true;
      this.showEndgamePopup(winnerType);
    }
  }
  centerCameraOnCell(cell) {
    this.cameraX = cell.x - this.viewportWidth / 2;
    this.cameraY = cell.y - this.viewportHeight / 2;
    this.clampCamera();
  }
  stopFollowingCell() {
    this.followedCell = null;
  }
  battlePredators(userCell, enemyCell) {
    const userStrength = userCell.energy * (1 + userCell.level * 0.1);
    const enemyStrength = enemyCell.energy;
    const totalStrength = userStrength + enemyStrength;
    const userWinProbability = userStrength / totalStrength;

    if (Math.random() < userWinProbability) {
      // User wins
      userCell.energy += enemyCell.energy * 0.5;
      this.removeCell(enemyCell);
      return true;
    } else {
      // User loses
      return false;
    }
  }
  handleUserDeath(cell) {
    this.createDeathEffect(cell.x, cell.y);
    this.removeCell(cell);
    this.userOffspring = this.userOffspring.filter(
      (offspring) => offspring !== cell
    );
    this.selectNewPredatorCell();
  }
  // showGameOverPopup() {
  //   const popup = document.createElement("div");
  //   popup.id = "game-over-popup";
  //   popup.innerHTML = `
  //     <h2>Game Over</h2>
  //     <p>You have run out of cells to control!</p>
  //     <button id="restart-game-btn">Restart Game</button>
  //   `;
  //   popup.style.cssText = `
  //     position: fixed;
  //     top: 50%;
  //     left: 50%;
  //     transform: translate(-50%, -50%);
  //     background-color: rgba(0, 0, 0, 0.8);
  //     color: white;
  //     padding: 20px;
  //     border-radius: 10px;
  //     text-align: center;
  //     z-index: 1000;
  //   `;
  //   this.shadowRoot.appendChild(popup);

  //   const restartButton = popup.querySelector("#restart-game-btn");
  //   restartButton.addEventListener("click", () => {
  //     this.restartSimulation("user-controlled");
  //     popup.remove();
  //   });
  // }
  addUserOffspring(offspring) {
    offspring.forEach((cell) => {
      cell.isUserOffspring = true;
      cell.color = "blue"; // Set offspring color to blue
      this.userOffspring.push(cell);
      this.cells.push(cell);
    });
  }
  checkCollision(entity1, entity2) {
    const dx = entity1.x - entity2.x;
    const dy = entity1.y - entity2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < entity1.radius + entity2.radius;
  }
  removeCell(cell) {
    const index = this.cells.indexOf(cell);
    if (index > -1) {
      this.cells.splice(index, 1);
    }

    // If it's a user-controlled cell or offspring, handle accordingly
    if (cell === this.userControlledCell) {
      this.selectNewPredatorCell();
    }
    const offspringIndex = this.userOffspring.indexOf(cell);
    if (offspringIndex > -1) {
      this.userOffspring.splice(offspringIndex, 1);
    }

    this.createDeathEffect(cell.x, cell.y);
    this.updatePopulationCounts();
  }
  createDeathEffect(x, y) {
    if (this.particleSystem) {
      this.particleSystem.addParticles(
        x,
        y,
        "rgba(255, 0, 0, 0.7)",
        5,
        "burst"
      );
    }
  }
  updatePopulationCounts() {
    this.populationCounts = {
      prey: 0,
      predator: 0,
      hybrid: 0,
      adaptive: 0,
    };

    for (const cell of this.cells) {
      if (cell instanceof HybridCell) {
        this.populationCounts.hybrid++;
      } else if (cell instanceof AdaptiveCell) {
        this.populationCounts.adaptive++;
      } else if (cell.isPrey) {
        this.populationCounts.prey++;
      } else {
        this.populationCounts.predator++;
      }
    }
  }
  createDeathEffect(x, y) {
    if (this.particleSystem) {
      this.particleSystem.addParticles(
        x,
        y,
        "rgba(255, 0, 0, 0.7)",
        5,
        "burst"
      );
    }
  }
  triggerEnergyBarEffect(color) {
    if (this.userDashboard) {
      const energyBar = this.userDashboard.querySelector(".energy-bar");
      if (energyBar) {
        energyBar.style.transition = "box-shadow 0.3s ease-in-out";
        energyBar.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
        setTimeout(() => {
          energyBar.style.boxShadow = "none";
        }, 300);
      }
    }
  }

  //TOGGLES
  togglePedigreeGraph(cellType) {
    this.isPedigreeGraphVisible = !this.isPedigreeGraphVisible;
    this.currentPedigreeType = this.isPedigreeGraphVisible ? cellType : null;
    this.pedigreeGraphContainer.style.display = this.isPedigreeGraphVisible
      ? "block"
      : "none";
    if (this.isPedigreeGraphVisible) {
      this.updatePedigreeGraph(cellType);
    }
  }
  toggleRuntimePopup() {
    if (
      this.runtimePopup.style.display === "none" ||
      this.runtimePopup.style.display === ""
    ) {
      this.runtimePopup.style.display = "block";
      this.updateRuntime();
      this.runtimeInterval = setInterval(() => this.updateRuntime(), 1000);
    } else {
      this.runtimePopup.style.display = "none";
      clearInterval(this.runtimeInterval);
    }
  }
  toggleFPSCounter() {
    this.showFPS = !this.showFPS;
    this.fpsCounter.style.display = this.showFPS ? "block" : "none";
    this.fpsToggleButton.classList.toggle("active", this.showFPS);
  }
  toggleGUI() {
    this.guiContainer.classList.toggle("open");
    this.toggleGuiButton.classList.toggle("active");
  }
  toggleEyeColorDashboard(type) {
    const dashboards = {
      prey: this.preyEyeColorDashboard,
      predator: this.predatorEyeColorDashboard,
      hybrid: this.hybridEyeColorDashboard,
      adaptive: this.shadowRoot.getElementById("adaptive-eye-color-dashboard"),
    };

    Object.entries(dashboards).forEach(([key, dashboard]) => {
      if (dashboard) {
        if (key === type) {
          dashboard.classList.toggle("hidden");
          if (!dashboard.classList.contains("hidden")) {
            this.updateEyeColorStats(type);
          }
        } else {
          dashboard.classList.add("hidden");
        }
      }
    });
  }
  toggleFullscreen() {
    if (!document.fullscreenElement) {
      if (this.requestFullscreen) {
        this.requestFullscreen().catch((err) => {
          console.error(
            `Error attempting to enable fullscreen: ${err.message}`
          );
        });
      } else if (this.webkitRequestFullscreen) {
        // For Safari
        this.webkitRequestFullscreen();
      }
      this.fullscreenButton.textContent = "↙";
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        // For Safari
        document.webkitExitFullscreen();
      }
      this.fullscreenButton.textContent = "⛶";
    }
  }
  toggleHybridMode() {
    this.hybridMode = !this.hybridMode;
    this.toggleHybridButton.classList.toggle("hybrid-active");
    if (this.hybridMode) {
      this.params.hybridCount = 10;
    } else {
      this.params.hybridCount = 0;
    }
    this.updateDashboard();
    if (this.gameMode === "simulation-only") {
      this.initializeSimulation();
    } else {
      this.updateCellTypes();
    }
  }
  toggleAdaptiveMode() {
    this.adaptiveMode = !this.adaptiveMode;
    this.toggleAdaptiveButton.classList.toggle("adaptive-active");
    if (this.adaptiveMode) {
      this.params.adaptiveCount = 10;
    } else {
      this.params.adaptiveCount = 0;
    }
    this.updateDashboard();
    if (this.gameMode === "simulation-only") {
      this.initializeSimulation();
    } else {
      this.updateCellTypes();
    }
  }
  toggleFlocking() {
    this.flockingEnabled = !this.flockingEnabled;
    this.shadowRoot
      .getElementById("toggle-flocking")
      .classList.toggle("flocking-active");
    this.cells.forEach((cell) => {
      if (cell instanceof Cell && !(cell instanceof AdaptiveCell)) {
        cell.flockingEnabled = this.flockingEnabled;
      }
    });
  }
  toggleFoodMode() {
    this.foodMode = this.foodMode === "random" ? "feedingAreas" : "random";
    this.shadowRoot
      .getElementById("toggle-food-mode")
      .classList.toggle("active");
    if (this.foodMode === "feedingAreas") {
      this.initializeFeedingAreas();
    } else {
      this.feedingAreas = [];
    }
    this.food = [];
    this.initializeFood();
  }
  toggleDashboard() {
    this.dashboard.classList.toggle("hidden");
    this.toggleDashboardButton.classList.toggle("active");
  }
  toggleGraph() {
    this.graphContainer.classList.toggle("hidden");
    this.toggleGraphButton.classList.toggle("active");
  }
  toggleFullHistoryGraph() {
    this.fullHistoryGraphContainer.classList.toggle("hidden");
    this.toggleFullHistoryGraphButton.classList.toggle("active");
  }
  toggleFullHistoryGraph() {
    this.fullHistoryGraphContainer.classList.toggle("hidden");
    this.toggleFullHistoryGraphButton.classList.toggle("active");
  }
  toggleDebugMenu() {
    const debugMenu = this.shadowRoot.getElementById("debug-menu");
    this.debugMenuVisible = !this.debugMenuVisible;
    debugMenu.style.display = this.debugMenuVisible ? "block" : "none";
  }

  //SETUPS
  setupGraph() {
    this.graphCanvas.width = 350;
    this.graphCanvas.height = 180;
    this.fullHistoryGraphCanvas.width = 650; // Increased width
    this.fullHistoryGraphCanvas.height = 350;
    this.updateGraph();
  }
  setupFPSCounter() {
    // Create FPS counter element
    this.fpsCounter = document.createElement("div");
    this.fpsCounter.id = "fps-counter";
    this.fpsCounter.style.cssText = `
      position: fixed;
      top: 170px;
      right: 20px;
      max-width: 4vw;
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 5px 8px;
      border-radius: 5px;
      font-family: "Space Grotesk", sans-serif;
      font-size: 12px;
      z-index: 1000;
      display: none;
      height: 24px;
      
    `;
    this.shadowRoot.appendChild(this.fpsCounter);

    // Create FPS toggle button
    this.fpsToggleButton = document.createElement("button");
    this.fpsToggleButton.id = "toggle-fps";
    this.fpsToggleButton.textContent = "FPS";
    this.fpsToggleButton.classList.add("toggle-button");
    this.fpsToggleButton.style.cssText = `
      position: fixed;
      bottom: 170px;
      left: 20px;
      width: 40px;
      height: 40px;
      z-index: 1;
    `;
    this.shadowRoot.appendChild(this.fpsToggleButton);

    // Add event listener for the FPS toggle button
    this.fpsToggleButton.addEventListener("click", () =>
      this.toggleFPSCounter()
    );
  }
  setupDebugMenu() {
    const debugMenu = document.createElement("div");
    debugMenu.id = "debug-menu";
    debugMenu.style.cssText = `
      position: fixed;
      top: 60px;
      left: 70px;
      width: 300px;
      max-height: 80vh;
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 15px;
      border-radius: 8px;
      font-family: "Space Grotesk", sans-serif;
      font-size: 12px;
      z-index: 1000;
      overflow-y: auto;
      display: none;
    `;
    this.shadowRoot.appendChild(debugMenu);

    const parameterGroups = {
      "General Cell Parameters": [
        "MAX_SPEED",
        "MAX_ENERGY",
        "MUTATION_RATE",
        "MAX_AGE",
        "MIN_SIZE_FACTOR",
        "MAX_SIZE_FACTOR",
        "EVOLUTION_BOOST",
      ],
      "Prey Parameters": [
        "PREY_REPRODUCTION_THRESHOLD",
        "PREY_MOVEMENT_COST",
        "PREY_REPRODUCTION_RATE",
        "PREY_SPEED_ADVANTAGE",
        "PREY_ESCAPE_CHANCE",
        "PREY_DEFENSE_CHANCE",
        "PREY_EVOLUTION_THRESHOLD",
      ],
      "Predator Parameters": [
        "PREDATOR_REPRODUCTION_THRESHOLD",
        "PREDATOR_REPRODUCTION_RATE",
        "PREDATOR_MOVEMENT_COST",
        "PREDATOR_DIGESTION_TIME",
        "PREDATOR_ENERGY_GAIN",
        "PREDATOR_VISION_RANGE",
        "PREDATOR_PACK_HUNTING_RADIUS",
        "PREDATOR_EVOLUTION_THRESHOLD",
      ],
      "Pack Behavior": [
        "PACK_HUNT_RADIUS",
        "PACK_SIZE_THRESHOLD",
        "PACK_SPEED_BOOST",
        "PACK_VISION_BOOST",
        "PACK_SPREAD_DISTANCE",
        "PACK_ENERGY_SHARE_PERCENTAGE",
        "MAX_PACK_SIZE",
        "PACK_AVOIDANCE_RADIUS",
        "PACK_AVOIDANCE_STRENGTH",
      ],
      "User-Controlled Parameters": ["USER_CONTROLLED_REPRODUCTION_THRESHOLD"],
    };

    Object.entries(parameterGroups).forEach(([groupName, parameters]) => {
      const groupContainer = document.createElement("div");
      groupContainer.style.marginBottom = "20px";

      const groupTitle = document.createElement("h3");
      groupTitle.textContent = groupName;
      groupTitle.style.marginBottom = "10px";
      groupContainer.appendChild(groupTitle);

      parameters.forEach((paramName) => {
        const param = {
          name: paramName,
          get: () => CellConfig.get(paramName),
          set: (v) => CellConfig.setDebugOverride(paramName, v),
          min: 0,
          max: CellConfig.get(paramName) * 2,
          step: CellConfig.get(paramName) / 100,
        };

        const container = document.createElement("div");
        container.style.marginBottom = "10px";

        const label = document.createElement("label");
        label.textContent = param.name;
        label.style.display = "block";
        label.style.marginBottom = "5px";

        const input = document.createElement("input");
        input.type = "range";
        input.min = param.min;
        input.max = param.max;
        input.step = param.step;
        input.value = param.get();
        input.style.width = "100%";

        const value = document.createElement("span");
        value.textContent = param.get();
        value.style.marginLeft = "10px";

        input.addEventListener("input", (e) => {
          const newValue = parseFloat(e.target.value);
          value.textContent = newValue.toFixed(2);
          param.set(newValue);
          this.applyDebugOverrides();
        });

        container.appendChild(label);
        container.appendChild(input);
        container.appendChild(value);
        groupContainer.appendChild(container);
      });

      debugMenu.appendChild(groupContainer);
    });

    // Add a "Reset to Defaults" button
    const resetButton = document.createElement("button");
    resetButton.textContent = "Reset to Defaults";
    resetButton.style.marginTop = "20px";
    resetButton.style.width = "100%";
    resetButton.style.padding = "10px";
    resetButton.style.backgroundColor = "#4CAF50";
    resetButton.style.color = "white";
    resetButton.style.border = "none";
    resetButton.style.borderRadius = "5px";
    resetButton.style.cursor = "pointer";
    resetButton.addEventListener("click", () => this.resetDebugOverrides());
    debugMenu.appendChild(resetButton);
  }
  setupPedigreeGraph() {
    this.pedigreeGraphContainer = document.createElement("div");
    this.pedigreeGraphContainer.id = "pedigree-graph-container";
    this.pedigreeGraphContainer.style.cssText = `
      position: fixed;
      top: 20px;
      left: 70px;
      width: 350px;
      height: 175px;
      background-color: rgba(0, 0, 0, 0.8);
      border-radius: 8px;
      padding: 15px;
      box-sizing: border-box;
      display: none;
      z-index: 1000;
    `;

    this.pedigreeGraphCanvas = document.createElement("canvas");
    this.pedigreeGraphCanvas.width = 470;
    this.pedigreeGraphCanvas.height = 200;
    this.pedigreeGraphCtx = this.pedigreeGraphCanvas.getContext("2d");

    this.pedigreeGraphContainer.appendChild(this.pedigreeGraphCanvas);
    this.shadowRoot.appendChild(this.pedigreeGraphContainer);
  }

  //UPDATES
  updateCellTypes() {
    if (this.hybridMode) {
      const hybridColors = this.generateUniqueColors(this.params.hybridCount);
      for (let i = 0; i < this.params.hybridCount; i++) {
        const cell = new HybridCell(
          Math.random() * this.mapWidth,
          Math.random() * this.mapHeight,
          hybridColors[i]
        );
        cell.simulation = this;
        cell.age = 0;
        cell.baseSizeRadius = cell.radius;
        this.cells.push(cell);
      }
    } else {
      this.cells = this.cells.filter((cell) => !(cell instanceof HybridCell));
    }

    if (this.adaptiveMode) {
      const adaptiveColors = this.generateUniqueColors(
        this.params.adaptiveCount
      );
      for (let i = 0; i < this.params.adaptiveCount; i++) {
        const cell = new AdaptiveCell(
          Math.random() * this.mapWidth,
          Math.random() * this.mapHeight,
          adaptiveColors[i]
        );
        cell.simulation = this;
        cell.age = 0;
        cell.baseSizeRadius = cell.radius;
        this.cells.push(cell);
      }
    } else {
      this.cells = this.cells.filter((cell) => !(cell instanceof AdaptiveCell));
    }
  }
  updateDetailedDashboard(cells, eyeColor, cellType) {
    let dashboardId = `detailed-dashboard-${cellType}`;
    let dashboard = this.shadowRoot.getElementById(dashboardId);

    // If the dashboard doesn't exist, create it
    if (!dashboard) {
      dashboard = document.createElement("div");
      dashboard.id = dashboardId;
      dashboard.className = "detailed-dashboard";
      this.shadowRoot.appendChild(dashboard);
    }

    // If this dashboard is already open, close it and return
    if (!dashboard.classList.contains("hidden")) {
      dashboard.classList.add("hidden");
      this.followedCell = null;
      return;
    }

    // Close any other open dashboards
    const allDashboards = this.shadowRoot.querySelectorAll(
      ".detailed-dashboard"
    );
    allDashboards.forEach((db) => db.classList.add("hidden"));

    dashboard.classList.remove("hidden");

    let currentIndex = 0;

    const updateDashboard = () => {
      // Filter out dead cells
      cells = cells.filter((cell) => this.cells.includes(cell));

      if (cells.length === 0) {
        dashboard.innerHTML = "<p>No cells found with this eye color.</p>";
        this.followedCell = null;
        dashboard.classList.add("hidden");
        return;
      }

      currentIndex = Math.min(currentIndex, cells.length - 1);
      const cell = cells[currentIndex];

      if (this.gameMode === "simulation-only") {
        this.followedCell = cell;
        this.focusCameraOnCell(cell, true);
      }

      // Add or remove the 'evolved' class based on the cell's evolution status
      if (cell.isEvolved) {
        dashboard.classList.add("evolved");
      } else {
        dashboard.classList.remove("evolved");
      }

      // Determine the correct label and value for eaten items
      let eatenLabel, eatenValue;
      if (cellType === "predator") {
        eatenLabel = "Prey Eaten";
        eatenValue = cell.preyEaten || 0;
      } else {
        eatenLabel = "Food Eaten";
        eatenValue = cell.preyEaten || 0;
      }

      if (cell instanceof HybridCell || cell instanceof AdaptiveCell) {
        eatenLabel = "Food Eaten";
        eatenValue = cell.foodEaten || 0;
      }

      dashboard.innerHTML = `
        <div class="cell-info">
          <div class="cell-stats">
            <div class="cell-stat">
              <span class="stat-label">Energy</span>
              <span class="stat-value" id="cell-energy">${Math.floor(
                cell.energy
              )}</span>
            </div>
            <div class="cell-stat">
              <span class="stat-label">Age</span>
              <span class="stat-value" id="cell-age">${Math.floor(
                cell.age
              )}</span>
            </div>
            <div class="cell-stat">
              <span class="stat-label">${eatenLabel}</span>
              <span class="stat-value" id="cell-eaten">${eatenValue}</span>
            </div>
            <div class="cell-stat">
              <span class="stat-label">Speed</span>
              <span class="stat-value">${cell.geneticTraits.speedModifier.toFixed(
                2
              )}</span>
            </div>
            <div class="cell-stat">
              <span class="stat-label">Energy Eff</span>
              <span class="stat-value">${cell.geneticTraits.energyEfficiency.toFixed(
                2
              )}</span>
            </div>
            <div class="cell-stat">
              <span class="stat-label">Repro Bonus</span>
              <span class="stat-value">${cell.geneticTraits.reproductionBonus.toFixed(
                2
              )}</span>
            </div>
          </div>
        </div>
        <h3>
          ${cellType.charAt(0).toUpperCase() + cellType.slice(1)} Cell
          <div class="eye-color-sample" style="background-color: ${eyeColor};"></div>
        </h3>
        <div class="navigation-controls">
          <button id="prev-cell" class="nav-button">◀</button>
          <span class="cell-count">${currentIndex + 1} of ${cells.length}</span>
          <button id="next-cell" class="nav-button">▶</button>
        </div>
        ${
          this.gameMode === "simulation-only"
            ? `<div class="action-buttons">
                 <button id="unfollow-cell" class="action-button">Unfollow</button>
                 <button id="view-genetics" class="action-button">View Genetics</button>
               </div>`
            : ""
        }
      `;

      const prevButton = dashboard.querySelector("#prev-cell");
      const nextButton = dashboard.querySelector("#next-cell");

      prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + cells.length) % cells.length;
        updateDashboard();
      });

      nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % cells.length;
        updateDashboard();
      });

      if (this.gameMode === "simulation-only") {
        const unfollowButton = dashboard.querySelector("#unfollow-cell");
        unfollowButton.addEventListener("click", () => {
          this.stopFollowingCell();
          dashboard.classList.add("hidden");
        });
      }

      const viewGeneticsButton = dashboard.querySelector("#view-genetics");
      viewGeneticsButton.addEventListener("click", () => {
        this.showGeneticsPopup(cell);
      });

      // Update real-time stats
      const updateStats = () => {
        const cellEnergy = dashboard.querySelector("#cell-energy");
        const cellAge = dashboard.querySelector("#cell-age");
        const cellEaten = dashboard.querySelector("#cell-eaten");

        if (cellEnergy && cellAge && cellEaten) {
          if (this.cells.includes(cell)) {
            cellEnergy.textContent = Math.floor(cell.energy);
            cellAge.textContent = Math.floor(cell.age);
            if (cell instanceof HybridCell || cell instanceof AdaptiveCell) {
              cellEaten.textContent = cell.foodEaten || 0;
            } else {
              cellEaten.textContent =
                cellType === "predator"
                  ? cell.preyEaten || 0
                  : cell.foodEaten || 0;
            }
          } else {
            // Cell has died, move to the next cell
            currentIndex = (currentIndex + 1) % cells.length;
            this.followedCell = cells[currentIndex];
            this.focusCameraOnCell(this.followedCell, true);
            updateDashboard();
            return;
          }
        }

        if (!dashboard.classList.contains("hidden")) {
          requestAnimationFrame(updateStats);
        }
      };

      updateStats();
    };

    updateDashboard();
  }
  showGeneticsPopup(cell) {
    const traits = cell.interpretGeneCode();

    const popup = document.createElement("div");
    popup.id = "genetics-popup";
    popup.innerHTML = `
      <div class="gene-display">
        <h3>Genetic Code:</h3>
        <button id="close-genetics">✕</button>
        <div class="gene-code">${cell.geneCode}</div>
      </div>
      <div class="traits-container">
        <h3 class="trait-header">Traits:</h3>
        <div class="traits-list">
          ${Object.entries(traits)
            .map(
              ([trait, value]) => `
            <div class="trait-item">
              <span class="trait-label">${
                trait.charAt(0).toUpperCase() + trait.slice(1)
              }:</span>
              <span class="trait-value">${value.toFixed(2)}</span>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;

    popup.style.cssText = `
      position: fixed;
      bottom: 30px;
      left: 80px;
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 15px;
      border-radius: 10px;
      font-size: 12px;
      font-family: "Space Grotesk", sans-serif;
      z-index: 1002;
      width: 200px;
      display: flex;
      flex-direction: column;
    `;

    const geneDisplay = popup.querySelector(".gene-display");
    geneDisplay.style.cssText = `
      margin-bottom: 10px;
      position: relative;
    `;

    const closeButton = popup.querySelector("#close-genetics");
    closeButton.style.cssText = `
      position: absolute;
      top: 0;
      left: 90px;
      background-color: transparent;
      border: none;
      color: white;
      font-size: 16px;
      cursor: pointer;
      padding: 0;
      margin: 0;
      line-height: 1;
    `;

    const geneCode = popup.querySelector(".gene-code");
    geneCode.style.cssText = `
      background-color: rgba(255, 255, 255, 0.1);
      padding: 5px;
      color: #2b6bff;
      border-radius: 5px;
      font-family: monospace;
      font-size: 14px;
      text-align: center;
      margin-top: 5px;
    `;

    const traitsContainer = popup.querySelector(".traits-container");
    traitsContainer.style.cssText = `
      flex-grow: 1;
      overflow-y: auto;
      max-height: 150px;
    `;

    const traitsList = popup.querySelector(".traits-list");
    traitsList.style.cssText = `
      display: grid;
      grid-template-columns: 1fr;
      gap: 5px;
    `;

    const traitItems = popup.querySelectorAll(".trait-item");
    traitItems.forEach((el) => {
      el.style.cssText = `
        display: flex;
        justify-content: space-between;
        background-color: rgba(255, 255, 255, 0.05);
        padding: 3px 5px;
        border-radius: 3px;
        color: ${cell.eyeColor};
      `;
    });

    // Add custom scrollbar styles
    const style = document.createElement("style");
    style.textContent = `
      #genetics-popup .traits-container::-webkit-scrollbar {
        width: 8px;
      }
      #genetics-popup .traits-container::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.1);
        border-radius: 4px;
      }
      #genetics-popup .traits-container::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.3);
        border-radius: 4px;
      }
      #genetics-popup .traits-container::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.5);
      }
    `;
    popup.appendChild(style);

    this.shadowRoot.appendChild(popup);

    closeButton.addEventListener("click", () => {
      this.shadowRoot.removeChild(popup);
    });
  }

  updatePedigreeGraph(cellType) {
    if (!this.isPedigreeGraphVisible || !cellType) return;

    const ctx = this.pedigreeGraphCtx;
    const width = this.pedigreeGraphCanvas.width;
    const height = this.pedigreeGraphCanvas.height;

    ctx.clearRect(0, 0, width, height);

    // Draw background
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.beginPath();
    for (let i = 0; i < width; i += 50) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
    }
    for (let i = 0; i < height; i += 50) {
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
    }
    ctx.stroke();

    // Update eye color pedigree data
    const currentTime = Date.now() - this.startTime;
    const eyeColorCounts = {};

    this.cells.forEach((cell) => {
      if (this.getCellType(cell) === cellType) {
        if (!eyeColorCounts[cell.eyeColor]) {
          eyeColorCounts[cell.eyeColor] = 0;
        }
        eyeColorCounts[cell.eyeColor]++;
      }
    });

    Object.entries(eyeColorCounts).forEach(([color, count]) => {
      if (!this.eyeColorPedigree[cellType][color]) {
        this.eyeColorPedigree[cellType][color] = [];
      }
      this.eyeColorPedigree[cellType][color].push({
        time: currentTime,
        count: count,
      });
    });

    // Draw pedigree lines
    const pedigreeData = this.eyeColorPedigree[cellType];
    const maxTime = currentTime;
    const maxCount = Math.max(
      ...Object.values(pedigreeData)
        .flat()
        .map((d) => d.count),
      1
    );

    Object.entries(pedigreeData).forEach(([color, data]) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      data.forEach((point, index) => {
        const x = (point.time / maxTime) * width;
        const y = height - (point.count / maxCount) * height;
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();
    });

    // Draw legend
    const legendX = 10;
    const legendY = 10;
    const boxSize = 10;
    const lineHeight = 20;

    ctx.font = "12px Arial";
    ctx.textBaseline = "middle";

    Object.keys(pedigreeData).forEach((color, index) => {
      const y = legendY + index * lineHeight;

      ctx.fillStyle = color;
      ctx.fillRect(legendX, y, boxSize, boxSize);

      ctx.fillStyle = "white";
    });
  }
  updateRuntime() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - this.startTime;
    const hours = Math.floor(elapsedTime / 3600000);
    const minutes = Math.floor((elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    this.runtimePopup.innerHTML = `<p>Runtime: ${formattedTime}</p>`;
  }
  updateGraph() {
    const preyCount = this.cells.filter(
      (cell) =>
        cell.isPrey &&
        !(cell instanceof HybridCell) &&
        !(cell instanceof AdaptiveCell)
    ).length;
    const predatorCount = this.cells.filter(
      (cell) =>
        !cell.isPrey &&
        !(cell instanceof HybridCell) &&
        !(cell instanceof AdaptiveCell)
    ).length;
    const hybridCount = this.cells.filter(
      (cell) => cell instanceof HybridCell
    ).length;
    const adaptiveCount = this.cells.filter(
      (cell) => cell instanceof AdaptiveCell
    ).length;

    const newData = {
      prey: preyCount,
      predators: predatorCount,
      hybrids: hybridCount,
      adaptive: adaptiveCount,
    };
    this.populationData.push(newData);
    this.fullPopulationData.push(newData);

    if (this.populationData.length > 50) this.populationData.shift();

    this.drawGraph();
    this.drawFullHistoryGraph();
  }
  updateDebugMenuDisplay() {
    const debugMenu = this.shadowRoot.getElementById("debug-menu");
    if (!debugMenu) return;

    const sliders = debugMenu.querySelectorAll('input[type="range"]');
    sliders.forEach((slider) => {
      const paramName = slider.id;
      const currentValue = CellConfig.get(paramName);

      if (currentValue === undefined) {
        console.warn(`Parameter ${paramName} is undefined in CellConfig.`);
        return; // Skip this iteration
      }

      try {
        slider.value = currentValue;
        slider.nextElementSibling.textContent = currentValue.toFixed(2);
      } catch (error) {
        console.error(`Error updating slider for ${paramName}:`, error);
      }
    });
  }
  updateDebugMenuDisplay() {
    const debugMenu = this.shadowRoot.getElementById("debug-menu");
    if (!debugMenu) return;

    const sliders = debugMenu.querySelectorAll('input[type="range"]');
    sliders.forEach((slider) => {
      const paramName = slider.id;
      const currentValue = CellConfig.get(paramName);
      slider.value = currentValue;
      slider.nextElementSibling.textContent = currentValue.toFixed(2);
    });
  }
  updateSimulationState() {
    this.cells.forEach((cell) => {
      cell.update(
        null,
        null,
        this.mapWidth,
        this.mapHeight,
        this.cells,
        1 / 60
      ); // Assume 60 FPS
    });
    this.updateGraph();
    this.updateDashboard();
  }
  updateDashboard() {
    const preyCount = this.cells.filter(
      (cell) =>
        cell.isPrey &&
        !(cell instanceof HybridCell) &&
        !(cell instanceof AdaptiveCell)
    ).length;
    const predatorCount = this.cells.filter(
      (cell) =>
        !cell.isPrey &&
        !(cell instanceof HybridCell) &&
        !(cell instanceof AdaptiveCell)
    ).length;
    const hybridCount = this.cells.filter(
      (cell) => cell instanceof HybridCell
    ).length;
    const adaptiveCount = this.cells.filter(
      (cell) => cell instanceof AdaptiveCell
    ).length;

    const evolvedPreyCount = this.cells.filter(
      (cell) =>
        cell.isPrey &&
        cell.isEvolved &&
        !(cell instanceof HybridCell) &&
        !(cell instanceof AdaptiveCell)
    ).length;
    const evolvedPredatorCount = this.cells.filter(
      (cell) =>
        !cell.isPrey &&
        cell.isEvolved &&
        !(cell instanceof HybridCell) &&
        !(cell instanceof AdaptiveCell)
    ).length;
    const evolvedHybridCount = this.cells.filter(
      (cell) => cell instanceof HybridCell && cell.isEvolved
    ).length;
    const evolvedAdaptiveCount = this.cells.filter(
      (cell) => cell instanceof AdaptiveCell && cell.isEvolved
    ).length;

    this.updatePopulationCounts();

    this.shadowRoot.getElementById("evolved-prey-count").textContent =
      evolvedPreyCount;
    this.shadowRoot.getElementById("evolved-predator-count").textContent =
      evolvedPredatorCount;
    this.shadowRoot.getElementById("evolved-hybrid-count").textContent =
      evolvedHybridCount;
    this.shadowRoot.getElementById("evolved-adaptive-count").textContent =
      evolvedAdaptiveCount;

    this.shadowRoot.getElementById("adaptive-count").textContent =
      adaptiveCount;
    this.shadowRoot.getElementById("prey-count").textContent = preyCount;
    this.shadowRoot.getElementById("predator-count").textContent =
      predatorCount;
    this.shadowRoot.getElementById("hybrid-count").textContent = hybridCount;

    // Show or hide the hybrid count based on hybrid mode
    const hybridCountContainer = this.shadowRoot.getElementById(
      "hybrid-count-container"
    );
    hybridCountContainer.style.display = this.hybridMode ? "block" : "none";

    // Show or hide the adaptive count based on adaptive mode
    const adaptiveCountContainer = this.shadowRoot.getElementById(
      "adaptive-count-container"
    );
    adaptiveCountContainer.style.display = this.adaptiveMode ? "block" : "none";

    // Update color stats if they are visible
    ["prey", "predator", "hybrid", "adaptive"].forEach((type) => {
      const dashboard = this.shadowRoot.getElementById(
        `${type}-eye-color-dashboard`
      );
      if (!dashboard.classList.contains("hidden")) {
        this.updateEyeColorStats(type);
      }
    });
  }
  updateCellPosition(cell) {
    cell.x = (cell.x + this.mapWidth) % this.mapWidth;
    cell.y = (cell.y + this.mapHeight) % this.mapHeight;
  }
  updateEyeColorStats(type) {
    const statsContainers = {
      prey: this.shadowRoot.getElementById("prey-eye-color-stats"),
      predator: this.shadowRoot.getElementById("predator-eye-color-stats"),
      hybrid: this.shadowRoot.getElementById("hybrid-eye-color-stats"),
      adaptive: this.shadowRoot.getElementById("adaptive-eye-color-stats"),
    };

    const statsContainer = statsContainers[type];
    if (!statsContainer) {
      return;
    }

    const cellsOfType = this.cells.filter((cell) => {
      if (type === "prey")
        return (
          cell.isPrey &&
          !(cell instanceof HybridCell) &&
          !(cell instanceof AdaptiveCell)
        );
      if (type === "predator")
        return (
          !cell.isPrey &&
          !(cell instanceof HybridCell) &&
          !(cell instanceof AdaptiveCell)
        );
      if (type === "hybrid") return cell instanceof HybridCell;
      if (type === "adaptive") return cell instanceof AdaptiveCell;
    });

    const eyeColorCounts = {};
    const eyeColorAttributes = {};
    const evolvedCounts = {};
    const cellsByEyeColor = {};

    cellsOfType.forEach((cell) => {
      if (!eyeColorCounts[cell.eyeColor]) {
        eyeColorCounts[cell.eyeColor] = 0;
        eyeColorAttributes[cell.eyeColor] = cell.geneticTraits;
        evolvedCounts[cell.eyeColor] = 0;
        cellsByEyeColor[cell.eyeColor] = [];
      }
      eyeColorCounts[cell.eyeColor]++;
      cellsByEyeColor[cell.eyeColor].push(cell);
      if (cell.isEvolved) {
        evolvedCounts[cell.eyeColor]++;
      }
    });

    let statsHtml = "";
    Object.entries(eyeColorCounts).forEach(([color, count]) => {
      const attributes = eyeColorAttributes[color];
      const evolvedCount = evolvedCounts[color];
      statsHtml += `
        <div class="eye-color-item" data-eye-color="${color}" data-cell-type="${type}">
          <div class="eye-color-sample" style="background-color: ${color};"></div>
          <div class="eye-color-info">
            <span class="eye-color-count">${count}</span>
            ${
              evolvedCount > 0
                ? `<span class="evolved-count">(${evolvedCount} evolved)</span>`
                : ""
            }
          </div>
        </div>
      `;
    });

    // Add pedigree graph toggle button
    statsHtml += `
      <button id="toggle-pedigree-graph-${type}" class="toggle-pedigree-graph">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="48px" fill="#e8eaed"><path d="M160-448v-60h306l232-232H575v-60h225v225h-60v-122L491-448H160Zm415 288v-60h123L524-395l42-42 174 174v-122h60v225H575Z"/></svg>
      </button>
    `;

    statsContainer.innerHTML = statsHtml;

    // Add click event listeners to eye-color-items
    statsContainer.querySelectorAll(".eye-color-item").forEach((item) => {
      item.addEventListener("click", () => {
        const eyeColor = item.dataset.eyeColor;
        const cellType = item.dataset.cellType;
        this.showDetailedCellDashboard(
          cellsByEyeColor[eyeColor],
          eyeColor,
          cellType
        );
      });
    });

    // Add event listener to the pedigree graph toggle button
    const togglePedigreeButton = statsContainer.querySelector(
      `#toggle-pedigree-graph-${type}`
    );
    if (togglePedigreeButton) {
      togglePedigreeButton.addEventListener("click", () =>
        this.togglePedigreeGraph(type)
      );
    }
  }

  //GUI, GRAPHS and DASHBOARDS
  showDetailedCellDashboard(cells, eyeColor, cellType) {
    if (this.gameMode === "user-controlled") {
      // In game mode, just update the dashboard without changing camera focus
      this.updateDetailedDashboard(cells, eyeColor, cellType);
    } else {
      // In simulation mode, update dashboard and focus camera
      this.updateDetailedDashboard(cells, eyeColor, cellType);
      if (
        cells.length > 0 &&
        !this.shadowRoot
          .querySelector(`#detailed-dashboard-${cellType}`)
          .classList.contains("hidden")
      ) {
        this.followedCell = cells[0];
        this.focusCameraOnCell(this.followedCell, true); // true for immediate focus
      } else {
        this.followedCell = null;
      }
    }
  }
  focusCameraOnCell(cell, immediate = false) {
    if (!cell) return;
    const targetX = cell.x - this.viewportWidth / 2;
    const targetY = cell.y - this.viewportHeight / 2;

    if (immediate) {
      this.cameraX = targetX;
      this.cameraY = targetY;
    } else {
      // Smoothly move the camera to the target position
      const smoothFactor = 0.1;
      this.cameraX += (targetX - this.cameraX) * smoothFactor;
      this.cameraY += (targetY - this.cameraY) * smoothFactor;
    }

    // Ensure the camera stays within the map bounds
    this.cameraX = Math.max(
      0,
      Math.min(this.cameraX, this.mapWidth - this.viewportWidth)
    );
    this.cameraY = Math.max(
      0,
      Math.min(this.cameraY, this.mapHeight - this.viewportHeight)
    );
  }
  stopFollowingCell() {
    this.followedCell = null;
    const dashboard = this.shadowRoot.querySelector(
      ".detailed-dashboard:not(.hidden)"
    );
    if (dashboard) {
      dashboard.classList.add("hidden");
    }
  }
  handleFullscreenChange() {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      this.fullscreenButton.textContent = "⛶";
    }
  }
  drawFullHistoryGraph() {
    const ctx = this.fullHistoryGraphCtx;
    const width = this.fullHistoryGraphCanvas.width;
    const height = this.fullHistoryGraphCanvas.height;

    ctx.clearRect(0, 0, width, height);

    // Draw background
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.beginPath();
    for (let i = 0; i < width; i += 60) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
    }
    for (let i = 0; i < height; i += 30) {
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
    }
    ctx.stroke();

    // Calculate max values for scaling
    const maxPrey = Math.max(...this.fullPopulationData.map((d) => d.prey));
    const maxPredators = Math.max(
      ...this.fullPopulationData.map((d) => d.predators)
    );
    const maxHybrids = this.hybridMode
      ? Math.max(...this.fullPopulationData.map((d) => d.hybrids))
      : 0;
    const maxAdaptive = this.adaptiveMode
      ? Math.max(...this.fullPopulationData.map((d) => d.adaptive))
      : 0;
    const maxValue = Math.max(
      maxPrey,
      maxPredators,
      maxHybrids,
      maxAdaptive,
      1
    );

    // Draw lines
    const drawLine = (data, color) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      this.fullPopulationData.forEach((point, index) => {
        const x =
          (index / (this.fullPopulationData.length - 1)) * (width - 60) + 30;
        const y = height - 30 - (point[data] / maxValue) * (height - 60);
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    };

    drawLine("prey", "white");
    drawLine("predators", "magenta");
    if (this.hybridMode) {
      drawLine("hybrids", "indigo");
    }
    if (this.adaptiveMode) {
      drawLine("adaptive", "teal");
    }

    // Draw legend
    const legend = [
      { label: "Prey", color: "white" },
      { label: "Predators", color: "magenta" },
    ];
    if (this.hybridMode) {
      legend.push({ label: "Hybrids", color: "indigo" });
    }
    if (this.adaptiveMode) {
      legend.push({ label: "Adaptive", color: "teal" });
    }

    const legendX = width - 550;
    const legendY = 10;
    const boxSize = 10;
    const textOffset = 5;
    const lineHeight = 25;

    ctx.font = "12px Arial";
    ctx.textBaseline = "middle";

    // Draw semi-transparent background for legend
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(
      legendX - 5,
      legendY - 5,
      115,
      legend.length * lineHeight + 10
    );

    legend.forEach((item, index) => {
      const y = legendY + index * lineHeight;

      ctx.fillStyle = item.color;
      ctx.fillRect(legendX, y, boxSize, boxSize);

      ctx.fillStyle = "white";
      ctx.textAlign = "left";
      ctx.fillText(item.label, legendX + boxSize + textOffset, y + boxSize / 2);
    });

    // Draw y-axis labels
    ctx.fillStyle = "white";
    ctx.font = "12px Arial";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    for (let i = 0; i <= 5; i++) {
      const value = Math.round((maxValue / 5) * i);
      const y = height - 30 - (i / 5) * (height - 60);
      ctx.fillText(value.toString(), 25, y);
    }

    // Draw x-axis labels (time)
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    const timeIntervals = 5;
    const currentTime = Date.now() - this.startTime;
    const timeStep = currentTime / timeIntervals;

    for (let i = 0; i <= timeIntervals; i++) {
      const x = 30 + (i / timeIntervals) * (width - 60);
      const time = i * timeStep;
      const seconds = Math.floor(time / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      let timeString;

      if (hours > 0) {
        timeString = `${hours}:${(minutes % 60).toString().padStart(2, "0")}:${(
          seconds % 60
        )
          .toString()
          .padStart(2, "0")}`;
      } else {
        timeString = `${minutes}:${(seconds % 60).toString().padStart(2, "0")}`;
      }

      ctx.fillText(timeString, x, height - 20);
    }

    // Draw axes
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(30, 0);
    ctx.lineTo(30, height - 30);
    ctx.lineTo(width, height - 30);
    ctx.stroke();
  }
  downloadFullHistoryGraph() {
    // Create a new canvas element
    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 320; // Slightly increased height to accommodate the time text
    const ctx = canvas.getContext("2d");

    // Draw the graph on the new canvas
    this.drawFullHistoryGraphForDownload(ctx);

    // Convert the canvas to a data URL
    const dataURL = canvas.toDataURL("image/png");

    // Create a temporary anchor element and trigger the download
    const downloadLink = document.createElement("a");
    downloadLink.href = dataURL;
    downloadLink.download = "full_history_graph.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
  drawFullHistoryGraphForDownload(ctx) {
    const width = 600;
    const height = 320;
    const graphHeight = 300; // The actual graph area height

    // Draw background
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.beginPath();
    for (let i = 0; i < width; i += 60) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, graphHeight);
    }
    for (let i = 0; i < graphHeight; i += 30) {
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
    }
    ctx.stroke();

    // Calculate max values for scaling
    const maxPrey = Math.max(...this.fullPopulationData.map((d) => d.prey));
    const maxPredators = Math.max(
      ...this.fullPopulationData.map((d) => d.predators)
    );
    const maxHybrids = this.hybridMode
      ? Math.max(...this.fullPopulationData.map((d) => d.hybrids))
      : 0;
    const maxAdaptive = this.adaptiveMode
      ? Math.max(...this.fullPopulationData.map((d) => d.adaptive))
      : 0;
    const maxValue = Math.max(
      maxPrey,
      maxPredators,
      maxHybrids,
      maxAdaptive,
      1
    );

    // Draw lines
    const drawLine = (data, color) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      this.fullPopulationData.forEach((point, index) => {
        const x =
          (index / (this.fullPopulationData.length - 1)) * (width - 60) + 30;
        const y =
          graphHeight - 30 - (point[data] / maxValue) * (graphHeight - 60);
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    };

    drawLine("prey", "white");
    drawLine("predators", "magenta");
    if (this.hybridMode) {
      drawLine("hybrids", "indigo");
    }
    if (this.adaptiveMode) {
      drawLine("adaptive", "teal");
    }

    // Draw legend
    const legend = [
      { label: "Prey", color: "white" },
      { label: "Predators", color: "magenta" },
    ];
    if (this.hybridMode) {
      legend.push({ label: "Hybrids", color: "indigo" });
    }
    if (this.adaptiveMode) {
      legend.push({ label: "Adaptive", color: "teal" });
    }

    const legendX = width - 550;
    const legendY = 10;
    const boxSize = 10;
    const textOffset = 5;
    const lineHeight = 25;

    ctx.font = "12px Arial";
    ctx.textBaseline = "middle";

    // Draw semi-transparent background for legend
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(
      legendX - 5,
      legendY - 5,
      115,
      legend.length * lineHeight + 10
    );

    legend.forEach((item, index) => {
      const y = legendY + index * lineHeight;

      ctx.fillStyle = item.color;
      ctx.fillRect(legendX, y, boxSize, boxSize);

      ctx.fillStyle = "white";
      ctx.textAlign = "left";
      ctx.fillText(item.label, legendX + boxSize + textOffset, y + boxSize / 2);
    });

    // Draw y-axis labels
    ctx.fillStyle = "white";
    ctx.font = "12px Arial";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    for (let i = 0; i <= 5; i++) {
      const value = Math.round((maxValue / 5) * i);
      const y = graphHeight - 30 - (i / 5) * (graphHeight - 60);
      ctx.fillText(value.toString(), 25, y);
    }

    // Draw axes
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(30, 0);
    ctx.lineTo(30, graphHeight - 30);
    ctx.lineTo(width, graphHeight - 30);
    ctx.stroke();

    // Add title
    ctx.fillStyle = "white";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Cell Life Simulation - Full History Graph", width / 2, 20);

    // Add total simulation time at the bottom
    const totalSimulationTime = this.formatTime(Date.now() - this.startTime);
    ctx.fillStyle = "white";
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
      `Total Simulation Time: ${totalSimulationTime}`,
      width / 2,
      height - 10
    );
  }
  drawGraph() {
    const ctx = this.graphCtx;
    const width = this.graphCanvas.width;
    const height = this.graphCanvas.height;

    ctx.clearRect(0, 0, width, height);

    // Draw background
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.beginPath();
    for (let i = 0; i < width; i += 50) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
    }
    for (let i = 0; i < height; i += 30) {
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
    }
    ctx.stroke();

    // Calculate max values for scaling
    const maxPrey = Math.max(...this.populationData.map((d) => d.prey));
    const maxPredators = Math.max(
      ...this.populationData.map((d) => d.predators)
    );
    const maxHybrids = this.hybridMode
      ? Math.max(...this.populationData.map((d) => d.hybrids))
      : 0;
    const maxAdaptive = this.adaptiveMode
      ? Math.max(...this.populationData.map((d) => d.adaptive))
      : 0;
    const maxValue = Math.max(
      maxPrey,
      maxPredators,
      maxHybrids,
      maxAdaptive,
      1
    );

    // Draw lines
    const drawLine = (data, color) => {
      ctx.strokeStyle = color;
      ctx.beginPath();
      this.populationData.forEach((point, index) => {
        const x = (index / (this.populationData.length - 1)) * width;
        const y = height - (point[data] / maxValue) * (height - 20);
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    };

    drawLine("prey", "white");
    drawLine("predators", "magenta");
    if (this.hybridMode) {
      drawLine("hybrids", "indigo");
    }
    if (this.adaptiveMode) {
      drawLine("adaptive", "teal");
    }

    // Draw legend
    const legend = [
      { label: "Prey", color: "white" },
      { label: "Predators", color: "magenta" },
    ];
    if (this.hybridMode) {
      legend.push({ label: "Hybrids", color: "indigo" });
    }
    if (this.adaptiveMode) {
      legend.push({ label: "Adaptive", color: "teal" });
    }

    const legendX = 10;
    const legendY = 10;
    const boxSize = 10;
    const textOffset = 5;
    const lineHeight = 15;

    ctx.font = "10px Arial";
    ctx.textBaseline = "middle";

    legend.forEach((item, index) => {
      const y = legendY + index * lineHeight;

      ctx.fillStyle = item.color;
      ctx.fillRect(legendX, y, boxSize, boxSize);

      ctx.fillStyle = "white";
      ctx.textAlign = "left";
      ctx.fillText(item.label, legendX + boxSize + textOffset, y + boxSize / 2);
    });

    // Draw y-axis labels
    ctx.fillStyle = "white";
    ctx.font = "10px Arial";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    for (let i = 0; i <= 4; i++) {
      const value = Math.round((maxValue / 4) * i);
      const y = height - (i / 4) * (height - 20);
      ctx.fillText(value.toString(), width - 5, y);
    }
  }
  applyChanges() {
    this.maxPreyPopulation = parseInt(
      this.shadowRoot.getElementById("maxPreyPopulation").value,
      10
    );
    this.maxHybridPopulation = parseInt(
      this.shadowRoot.getElementById("maxHybridPopulation").value,
      10
    );
    this.initializeSimulation();
  }
  setDebugOverride(paramName, value) {
    this.debugOverrides[paramName] = value;
  }
  applyDebugOverrides() {
    const debugMenu = this.shadowRoot.getElementById("debug-menu");
    if (!debugMenu) return;

    const sliders = debugMenu.querySelectorAll('input[type="range"]');
    sliders.forEach((slider) => {
      const paramName = slider.id;
      const value = parseFloat(slider.value);
      CellConfig.setDebugOverride(paramName, value);
    });

    this.updateSimulationState();
  }
  resetDebugOverrides() {
    Cell.resetDefaults();
    this.updateDebugMenuDisplay();
    this.updateSimulationState();
  }

  //START UP and END GAME
  startNewGame() {
    // Set up for user-controlled mode
    this.gameMode = "user-controlled";
    this.selectNewPredatorCell();

    // Show the user dashboard
    if (this.userDashboard) {
      this.userDashboard.style.display = "block";
      this.updateUserDashboard();
    }
  }
  startGame(mode) {
    this.gameMode = mode;
    const popup = this.shadowRoot.getElementById("start-game-popup");
    popup.style.opacity = "0";
    setTimeout(() => {
      this.shadowRoot.removeChild(popup);
      this.initializeSimulation();
      this.startSimulation();

      // Reset and update user dashboard
      if (this.userDashboard) {
        this.userDashboard.style.display =
          mode === "user-controlled" ? "block" : "none";
        this.updateUserDashboard();
      }
    }, 300);
  }
  startSimulation() {
    // Initialize the simulation
    this.initializeSimulation();

    // Start the animation loop
    this.isRunning = true;
    this.lastTimestamp = 0;
    this.animate(performance.now());

    // Start the runtime calculation
    this.startTime = Date.now();
    this.runtimeInterval = setInterval(() => this.updateRuntime(), 1000);
  }
  showStartGamePopup() {
    const popup = document.createElement("div");
    popup.id = "start-game-popup";

    popup.innerHTML = `
      <style>
        #start-game-popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: rgba(10, 10, 10, 0.95);
          color: #e0e0e0;
          box-shadow: 0 0 30px rgba(43, 107, 255, 0.2);
          padding: 2rem;
          border-radius: 15px;
          font-family: "Space Grotesk", sans-serif;
          z-index: 1000;
          width: 90%;
          max-width: 500px;
          display: grid;
          gap: 1.5rem;
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
        }
        #start-game-popup h2 {
          margin: 0;
          font-size: 1.8rem;
          color: #2b6bff;
          text-shadow: 0 0 10px rgba(43, 107, 255, 0.5);
          text-align: center;
        }
        #start-game-popup p {
          margin: 0.5rem 0;
          font-size: 1rem;
          line-height: 1.5;
        }
        .feature-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .feature-icon {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(43, 107, 255, 0.2);
          border-radius: 50%;
          padding: 0.25rem;
        }
        .button-container {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
        }
        #start-game-popup button {
          flex: 1;
          background-color: #2b6bff;
          border: none;
          color: white;
          padding: 10px 20px;
          text-align: center;
          text-decoration: none;
          display: block;
          font-size: 1rem;
          cursor: pointer;
          border-radius: 5px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(43, 107, 255, 0.1);
        }
        #start-game-popup button:hover {
          background-color: #4080ff;
          transform: translateY(-2px);
          box-shadow: 0 6px 8px rgba(43, 107, 255, 0.15);
        }
      </style>
      <h2>Cell Life Simulation</h2>
      <p>Explore a dynamic ecosystem where cells interact, evolve, and compete.</p>
      <div class="feature-list">
        <div class="feature-item">
          <div class="feature-icon">🦠</div>
          <span>Prey & Predators</span>
        </div>
        <div class="feature-item">
          <div class="feature-icon">🧬</div>
          <span>Hybrid Cells</span>
        </div>
        <div class="feature-item">
          <div class="feature-icon">🧠</div>
          <span>Adaptive Cells</span>
        </div>
        <div class="feature-item">
          <div class="feature-icon">🐦</div>
          <span>Flocking Behavior</span>
        </div>
      </div>
      <p>Toggle buttons on the right to enable different cell types and behaviors. Access stats and graphs using dashboard toggles.</p>
      <div class="button-container">
        <button id="user-controlled-mode">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 9l-10 9-10-9L12 3z"/></svg>
          Game
        </button>
        <button id="simulation-only-mode">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          Simulation
        </button>
      </div>
    `;

    this.shadowRoot.appendChild(popup);

    // Fade in the popup
    setTimeout(() => {
      popup.style.opacity = "1";
    }, 0);

    // Add event listeners for the buttons
    const userControlledButton = this.shadowRoot.getElementById(
      "user-controlled-mode"
    );
    const simulationOnlyButton = this.shadowRoot.getElementById(
      "simulation-only-mode"
    );

    userControlledButton.addEventListener("click", () => {
      this.startGame("user-controlled");
    });

    simulationOnlyButton.addEventListener("click", () => {
      this.startGame("simulation-only");
    });
  }
  checkEndgame() {
    const currentTime = Date.now();
    const gameStartDelay = 15000; // 15 seconds delay

    if (currentTime - this.startTime < gameStartDelay) {
      return false; // Don't check for endgame during the initial delay
    }

    if (this.gameMode === "user-controlled") {
      const userControlledPredatorCount = this.cells.filter(
        (cell) =>
          (cell === this.userControlledCell || cell.isUserOffspring) &&
          !cell.isPrey &&
          !(cell instanceof HybridCell) &&
          !(cell instanceof AdaptiveCell)
      ).length;

      const preyCount = this.cells.filter(
        (cell) =>
          cell.isPrey ||
          cell instanceof HybridCell ||
          cell instanceof AdaptiveCell
      ).length;

      if (
        userControlledPredatorCount === 0 &&
        this.userOffspring.length === 0
      ) {
        this.showEndgamePopup("Prey");
        return true;
      }

      if (preyCount === 0) {
        this.showEndgamePopup("Predator");
        return true;
      }
    } else {
      // Simulation mode logic
      if (!this.populationCounts) {
        this.updatePopulationCounts();
      }

      const cellTypes = {
        prey: this.populationCounts.prey,
        predator: this.populationCounts.predator,
        hybrid: this.populationCounts.hybrid,
        adaptive: this.populationCounts.adaptive,
      };

      const totalCells = Object.values(cellTypes).reduce((a, b) => a + b, 0);
      const nonZeroTypes = Object.entries(cellTypes).filter(
        ([_, count]) => count > 0
      );

      const endgameThreshold = Math.max(
        10,
        Math.floor((this.mapWidth * this.mapHeight) / 100000)
      );

      if (nonZeroTypes.length === 1 && totalCells > endgameThreshold) {
        const [winnerType, _] = nonZeroTypes[0];
        this.showEndgamePopup(this.getWinnerDisplayName(winnerType));
        return true;
      }
    }

    return false;
  }
  getWinnerDisplayName(winnerType) {
    const displayNames = {
      prey: "Prey",
      predator: "Predator",
      hybrid: "Hybrid",
      adaptive: "Adaptive",
    };
    return displayNames[winnerType] || winnerType;
  }
  showEndgamePopup(winnerType) {
    // Stop the animation
    this.isRunning = false;
    cancelAnimationFrame(this.animationFrame);

    // Stop the runtime calculation
    clearInterval(this.runtimeInterval);

    // Calculate the final runtime
    const finalRuntime = this.formatTime(Date.now() - this.startTime);

    // Create popup container if it doesn't exist
    let popup = this.shadowRoot.getElementById("endgame-popup");
    if (!popup) {
      popup = document.createElement("div");
      popup.id = "endgame-popup";
      this.shadowRoot.appendChild(popup);
    }

    const userWon = winnerType === "Predator";
    const winnerMessage = userWon
      ? "Congratulations! The predators have taken over the ecosystem!"
      : `The ${winnerType} cells have taken over the ecosystem! The predators have been eliminated.`;
    const virusMessage =
      "<p>A virus is now spreading through the remaining population...</p>";

    popup.innerHTML = `
      <style>
        #endgame-popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: rgba(10, 10, 10, 0.95);
          color: #e0e0e0;
          padding: 1.5rem; /* Reduced padding */
          border-radius: 20px;
          font-family: "Space Grotesk", sans-serif;
          text-align: center;
          z-index: 100000;
          width: 90%;
          max-width: 500px; /* Slightly reduced max-width */
          box-shadow: 0 2px 4px rgba(43, 107, 255, 0.1);
          display: grid;
          gap: 1rem; /* Reduced gap */
          opacity: 0;
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        #endgame-popup.show {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
        #endgame-popup h2 {
          margin: 0;
          font-size: 2rem; /* Slightly reduced font size */
          color: #2b6bff;
          text-shadow: 0 0 10px rgba(43, 107, 255, 0.5);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { text-shadow: 0 0 10px rgba(43, 107, 255, 0.5); }
          50% { text-shadow: 0 0 20px rgba(43, 107, 255, 0.8); }
          100% { text-shadow: 0 0 10px rgba(43, 107, 255, 0.5); }
        }
        #endgame-popup p {
          margin: 0.3rem 0; /* Reduced margin */
          font-size: 1rem; /* Slightly reduced font size */
          line-height: 1.4; /* Reduced line height */
        }
        .winner-type {
          font-size: 1.2rem; /* Slightly reduced font size */
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin: 0.5rem 0; /* Reduced margin */
          padding: 0.4rem 0.8rem; /* Reduced padding */
          border-radius: 8px;
          background: linear-gradient(45deg, rgba(43, 107, 255, 0.2), rgba(43, 107, 255, 0.4));
          display: inline-block;
        }
        .stats {
          background-color: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          padding: 0.8rem; /* Reduced padding */
          display: grid;
          gap: 0.3rem; /* Reduced gap */
        }
        .stat-item {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem; /* Slightly reduced font size */
        }
        .button-container {
          display: flex;
          justify-content: center;
          gap: 0.8rem; /* Reduced gap */
          margin-top: 0.8rem; /* Reduced margin */
        }
        #endgame-popup button {
          flex: 1;
          background-color: #2b6bff;
          border: none;
          color: white;
          padding: 10px 20px; /* Slightly reduced padding */
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 0.9rem; /* Slightly reduced font size */
          font-weight: bold;
          cursor: pointer;
          border-radius: 50px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        #endgame-popup button:hover {
          background-color: #4080ff;
          transform: translateY(-2px);
          box-shadow: 0 6px 8px rgba(43, 107, 255, 0.15);
        }
        #endgame-popup button:active {
          transform: translateY(0);
          box-shadow: 0 2px 4px rgba(43, 107, 255, 0.1);
        }
        #endgame-popup a {
          color: #2b6bff;
          text-decoration: none;
          transition: color 0.3s ease;
          font-size: 0.9rem; /* Slightly reduced font size */
        }
        #endgame-popup a:hover {
          color: #4080ff;
          text-decoration: underline;
        }
        @media (max-width: 600px) {
          #endgame-popup {
            width: 95%;
            padding: 1.2rem; /* Further reduced padding for mobile */
          }
          #endgame-popup h2 {
            font-size: 1.6rem; /* Further reduced font size for mobile */
          }
          #endgame-popup p {
            font-size: 0.9rem; /* Further reduced font size for mobile */
          }
          .button-container {
            flex-direction: column;
          }
          #endgame-popup button {
            width: 100%;
            margin-bottom: 0.5rem; /* Added margin between buttons */
          }
        }
      </style>
      <h2>Simulation Complete!</h2>
      <div class="winner-type" style="color: ${this.getWinnerColor(
        winnerType
      )};">
        ${userWon ? "Predator Victory" : `${winnerType} Dominance`}
      </div>
      <p>${winnerMessage}</p>
      <div class="stats">
        <div class="stat-item">
          <span>Total Runtime:</span>
          <span>${finalRuntime}</span>
        </div>
      </div>
      ${virusMessage}
      <div class="button-container">
        <button id="restart-simulation-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          Restart Simulation
        </button>
        <button id="start-game-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 9l-10 9-10-9L12 3z"/></svg>
          Play Game
        </button>
      </div>
      <div class="button-container">
        <button id="downloadGraphBtn">Download History Graph</button>
      </div>
      <p>
        <a href="https://www.tyflannagan.tech/" target="_blank">
          Visit Creator's Page
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-left: 5px;">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      </p>
    `;

    const restartSimulationBtn = popup.querySelector("#restart-simulation-btn");
    restartSimulationBtn.addEventListener("click", () => {
      popup.remove();
      this.restartSimulation("simulation-only");
    });

    const startGameBtn = popup.querySelector("#start-game-btn");
    startGameBtn.addEventListener("click", () => {
      popup.remove();
      this.restartSimulation("user-controlled");
    });
    // Add event listener for the download button
    const downloadGraphBtn = popup.querySelector("#downloadGraphBtn");
    downloadGraphBtn.addEventListener("click", () =>
      this.downloadFullHistoryGraph()
    );

    // Show the popup immediately
    popup.classList.add("show");

    // Start the virus spread immediately
    this.spreadVirus();
  }
  hideAllButtons() {
    const buttonsToHide = [
      "toggle-gui",
      "toggle-adaptive",
      "toggle-full-history-graph",
      "toggle-hybrid",
      "toggle-graph",
      "toggle-dashboard",
      "toggle-food-mode",
      "toggle-flocking",
      "fullscreen-button",
      "runtime-button",
      "restart-button",
      "toggle-fps",
    ];

    buttonsToHide.forEach((id) => {
      const button = this.shadowRoot.getElementById(id);
      if (button) {
        button.style.display = "none";
      }
    });
  }

  //FOOD
  adjustFoodSupply() {
    const desiredFoodCount = this.calculateDesiredFoodCount();

    // Add food if there's not enough
    while (this.food.length < desiredFoodCount) {
      this.addFood();
    }

    // Remove excess food gradually
    if (this.food.length > desiredFoodCount) {
      const removeCount = Math.min(5, this.food.length - desiredFoodCount);
      this.food.splice(0, removeCount);
    }

    this.foodCount = this.food.length;
  }
  updateFood(deltaTime) {
    const currentTime = Date.now();
    const timeSinceLastRegeneration =
      (currentTime - this.lastFoodRegenerationTime) / 1000;

    if (this.foodMode === "random") {
      this.updateRandomFood(timeSinceLastRegeneration);
    } else {
      this.updateFeedingAreaFood(timeSinceLastRegeneration, deltaTime);
    }

    this.lastFoodRegenerationTime = currentTime;
  }
  updateRandomFood(timeSinceLastRegeneration) {
    const foodToAdd = Math.floor(
      timeSinceLastRegeneration * this.foodRegenerationRate
    );
    for (let i = 0; i < foodToAdd; i++) {
      this.addRandomFood();
    }

    // Ensure minimum food count
    while (this.food.length < this.baseFoodCount) {
      this.addRandomFood();
    }
  }
  addRandomFood() {
    const x = Math.random() * this.mapWidth;
    const y = Math.random() * this.mapHeight;
    const food = new Food(x, y);
    this.food.push(food);
  }
  updateFeedingAreaFood(timeSinceLastRegeneration, deltaTime) {
    this.feedingAreas = this.feedingAreas.filter((area) => {
      // Regenerate food in the area
      const foodToAdd = Math.floor(
        timeSinceLastRegeneration * this.foodRegenerationRate
      );
      for (
        let i = 0;
        i < foodToAdd && area.food.length < this.foodPerArea;
        i++
      ) {
        this.addFeedingAreaFood(area);
      }

      // Check if the area should be removed
      if (area.food.length === 0 && Math.random() < 0.01) {
        return false; // Remove this area
      }
      return true;
    });

    // Add new feeding areas if needed
    while (this.feedingAreas.length < this.feedingAreaCount) {
      const newArea = this.createFeedingArea();
      for (let i = 0; i < this.foodPerArea; i++) {
        this.addFeedingAreaFood(newArea);
      }
      this.feedingAreas.push(newArea);
    }

    // Update the main food array
    this.food = this.feedingAreas.flatMap((area) => area.food);
    this.foodCount = this.food.length; // Update the food count
  }
  addFeedingAreaFood(area) {
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * area.radius;
    let x = area.x + Math.cos(angle) * distance;
    let y = area.y + Math.sin(angle) * distance;

    // Wrap the coordinates
    const wrappedCoords = this.wrapCoordinates(x, y);
    x = wrappedCoords.x;
    y = wrappedCoords.y;

    const food = new Food(x, y);
    area.food.push(food);
  }
  relocateFeedingAreas() {
    this.feedingAreas = this.feedingAreas.map(() => this.createFeedingArea());
  }
  createFeedingArea() {
    const x = Math.random() * this.mapWidth;
    const y = Math.random() * this.mapHeight;
    return {
      x: x,
      y: y,
      radius: this.feedingAreaRadius,
      food: [],
    };
  }
  initializeFood() {
    this.food = [];
    if (this.foodMode === "feedingAreas") {
      this.initializeFeedingAreas();
      this.feedingAreas.forEach((area) => {
        for (let i = 0; i < this.foodPerArea; i++) {
          this.addFeedingAreaFood(area);
        }
      });
    } else {
      for (let i = 0; i < this.baseFoodCount; i++) {
        this.addRandomFood();
      }
    }
  }
  initializeFeedingAreas() {
    this.feedingAreas = [];
    for (let i = 0; i < this.feedingAreaCount; i++) {
      this.feedingAreas.push(this.createFeedingArea());
    }
  }
  removeFood(food) {
    // Remove from main food array
    const index = this.food.indexOf(food);
    if (index !== -1) {
      this.food.splice(index, 1);
      this.foodCount--; // Decrease the food count
    }

    // If in feeding area mode, remove from the specific feeding area
    if (this.foodMode === "feedingAreas") {
      this.feedingAreas = this.feedingAreas.map((area) => {
        area.food = area.food.filter((f) => f !== food);
        return area;
      });
    }
  }
  wrapCoordinates(x, y) {
    return {
      x: (x + this.mapWidth) % this.mapWidth,
      y: (y + this.mapHeight) % this.mapHeight,
    };
  }
  calculateDesiredFoodCount() {
    const preyCount = this.cells.filter((cell) => cell.isPrey).length;
    const populationFactor = preyCount * 2; // 2 food items per prey
    const areaDensityFactor = this.mapWidth * this.mapHeight * this.foodDensity;
    const desiredCount = Math.min(
      this.maxFoodCount,
      Math.max(this.minFoodCount, populationFactor, areaDensityFactor)
    );
    return Math.floor(desiredCount);
  }
  addFood(feedingArea = null) {
    if (!feedingArea) {
      if (this.feedingAreas.length === 0) {
        this.initializeFeedingAreas();
      }
      feedingArea =
        this.feedingAreas[Math.floor(Math.random() * this.feedingAreas.length)];
    }

    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * feedingArea.radius;
    const x = feedingArea.x + Math.cos(angle) * distance;
    const y = feedingArea.y + Math.sin(angle) * distance;

    x = Math.max(0, Math.min(x, this.mapWidth));
    y = Math.max(0, Math.min(y, this.mapHeight));

    const food = new Food(x, y);
    feedingArea.food.push(food);
    this.food.push(food);
  }
  calculateFoodCount() {
    let foodCount = this.baseFoodCount;
    if (this.hybridMode) foodCount += 20;
    if (this.adaptiveMode) foodCount += 20;
    return foodCount;
  }

  //RANDOM UTILS
  adjustReproductionLimits(
    preyLimit,
    predatorLimit,
    hybridLimit,
    adaptiveLimit
  ) {
    this.cells.forEach((cell) => {
      if (cell instanceof HybridCell) {
        cell.maxOffspringPerReproduction = hybridLimit;
      } else if (cell instanceof AdaptiveCell) {
        cell.maxOffspringPerReproduction = adaptiveLimit;
      } else if (cell.isPrey) {
        cell.maxOffspringPerReproduction = preyLimit;
      }
    });
  }
  restartSimulation(specifiedGameMode = null) {
    this.clearVirusAnimation();
    // Use the current game mode if no new mode is specified
    const gameMode = specifiedGameMode || this.gameMode;
    // Cancel any ongoing animation
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }

    // Reset animation-related variables
    this.isRunning = false;
    this.lastTimestamp = 0;
    this.frameCount = 0;
    this.fps = 0;
    this.lastFrameTime = 0;

    // Remove the existing endgame popup if it exists
    const existingPopup = this.shadowRoot.getElementById("endgame-popup");
    if (existingPopup) {
      this.shadowRoot.removeChild(existingPopup);
    }

    // Store the current state of hybrid and adaptive modes
    const wasHybridMode = this.hybridMode;
    const wasAdaptiveMode = this.adaptiveMode;

    // Store the current visibility state of the graph
    const wasGraphVisible = !this.graphContainer.classList.contains("hidden");

    // Reset the simulation parameters
    this.params = {
      preyCount: 5,
      predatorCount: 8,
      foodCount: 20,
      hybridCount: 0,
      adaptiveCount: 0,
    };

    // Clear the graph data
    this.populationData = [];
    this.fullPopulationData = [];

    // Reset the start time for runtime calculation
    this.startTime = Date.now();

    // Restore hybrid and adaptive modes if they were active
    if (wasHybridMode) {
      this.hybridMode = true;
      this.toggleHybridButton.classList.add("hybrid-active");
      this.params.hybridCount = 5;
    }
    if (wasAdaptiveMode) {
      this.adaptiveMode = true;
      this.toggleAdaptiveButton.classList.add("adaptive-active");
      this.params.adaptiveCount = 3;
    }

    // Reset the start time for runtime calculation
    this.startTime = Date.now();

    // Clear existing data
    this.cells = [];
    this.food = [];
    this.populationData = [];
    this.fullPopulationData = [];

    // Clear any existing runtime interval and start a new one
    clearInterval(this.runtimeInterval);
    this.runtimeInterval = setInterval(() => this.updateRuntime(), 1000);

    // Re-initialize the simulation with the restored settings
    this.initializeSimulation();
    this.initializeFood();

    // Restore graph visibility if it was previously visible
    if (wasGraphVisible) {
      this.graphContainer.classList.remove("hidden");
      this.toggleGraphButton.classList.add("active");
    }

    // Start the runtime calculation
    this.runtimeInterval = setInterval(() => this.updateRuntime(), 1000);

    // Update the dashboard
    this.updateDashboard();

    // Reset debug overrides
    this.resetDebugOverrides();

    // Set the game mode
    this.gameMode = gameMode;

    // Handle user-controlled specific setup
    if (this.gameMode === "user-controlled") {
      this.selectNewPredatorCell();
      if (this.userDashboard) {
        this.userDashboard.style.display = "block";
        this.updateUserDashboard();
      }
    } else {
      // Clear user-controlled elements for simulation mode
      this.userControlledCell = null;
      if (this.userDashboard) {
        this.userDashboard.style.display = "none";
      }
    }

    // Reset and restart the animation
    this.isRunning = true;
    this.lastTimestamp = 0;
    this.animate(performance.now());
  }
  generateRandomColor() {
    return `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
      Math.random() * 256
    )},${Math.floor(Math.random() * 256)})`;
  }
  generateUniqueColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(
        `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
          Math.random() * 256
        )},${Math.floor(Math.random() * 256)})`
      );
    }
    return colors;
  }
  getWinnerColor(winnerType) {
    const colors = {
      Prey: "white",
      Predator: "magenta",
      Hybrid: "indigo",
      Adaptive: "teal",
    };
    return colors[winnerType] || "white";
  }
  findNearest(entity, targets) {
    if (!targets || targets.length === 0) return null;

    let nearest = null;
    let minDistanceSquared = Infinity;

    for (let i = 0, len = targets.length; i < len; i++) {
      const target = targets[i];
      const dx = entity.x - target.x;
      const dy = entity.y - target.y;
      const distanceSquared = dx * dx + dy * dy;

      if (distanceSquared < minDistanceSquared) {
        nearest = target;
        minDistanceSquared = distanceSquared;
      }
    }

    return nearest;
  }
  clearVirusAnimation() {
    // Stop any ongoing virus animation
    if (this.virusAnimationFrame) {
      cancelAnimationFrame(this.virusAnimationFrame);
      this.virusAnimationFrame = null;
    }

    // Clear virus particles
    if (this.particleSystem) {
      this.particleSystem.particles = this.particleSystem.particles.filter(
        (p) => p.type !== "virus"
      );
    }

    // Reset any virus-related variables
    this.virusParticles = [];
  }
  spreadVirus() {
    const virusParticles = [];
    const infectionRadius = 50;
    const infectionRate = 0.4;
    const virusColor = "rgba(0, 255, 0, 0.5)";

    // Create initial virus particles
    for (let i = 0; i < 10; i++) {
      virusParticles.push({
        x: Math.random() * this.mapWidth,
        y: Math.random() * this.mapHeight,
        radius: 5,
        speedX: (Math.random() - 0.5) * 7,
        speedY: (Math.random() - 0.5) * 7,
      });
    }

    const spreadAnimation = (timestamp) => {
      // Clear the canvas
      this.ctx.clearRect(0, 0, this.mapWidth, this.mapHeight);

      // Update and draw virus particles
      for (let virus of virusParticles) {
        virus.x += virus.speedX;
        virus.y += virus.speedY;

        // Bounce off walls
        if (virus.x < 0 || virus.x > this.mapWidth) virus.speedX *= -1;
        if (virus.y < 0 || virus.y > this.mapHeight) virus.speedY *= -1;

        this.ctx.beginPath();
        this.ctx.arc(virus.x, virus.y, virus.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = virusColor;
        this.ctx.fill();
      }

      // Infect and remove cells
      this.cells = this.cells.filter((cell) => {
        let infected = false;
        for (let virus of virusParticles) {
          const dx = cell.x - virus.x;
          const dy = cell.y - virus.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < infectionRadius && Math.random() < infectionRate) {
            infected = true;
            break;
          }
        }

        if (infected) {
          // Create particle effect for infected cell
          this.particleSystem.addParticles(
            cell.x,
            cell.y,
            virusColor,
            10,
            "burst"
          );
          return false;
        }
        return true;
      });

      // Draw remaining cells
      for (let cell of this.cells) {
        cell.draw(this.ctx);
      }

      // Draw particles
      this.particleSystem.update(1 / 60); // Assume 60 FPS for consistent animation speed
      this.particleSystem.draw(this.ctx);

      // Continue animation if there are still cells
      if (this.cells.length > 0) {
        this.virusAnimationFrame = requestAnimationFrame(spreadAnimation);
      } else {
        // Enable restart button when all cells are gone
        const restartBtn = this.shadowRoot.querySelector("#restartBtn");
        if (restartBtn) {
          restartBtn.textContent = "Restart Simulation";
          restartBtn.disabled = false;
        }
      }
    };

    // Start the spread animation
    this.virusAnimationFrame = requestAnimationFrame(spreadAnimation);
  }
  formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
  createBattleParticles(x, y, color) {
    const particleCount = 20;
    const particleColor =
      color === "purple" ? "rgba(128, 0, 128, 0.7)" : "rgba(0, 128, 128, 0.7)";
    this.particleSystem.addParticles(x, y, particleColor, particleCount);
  }
}

//Flock Variables
const ALIGNMENT_FACTOR = 0.05;
const COHESION_FACTOR = 0.009;
const SEPARATION_FACTOR = 0.05;
const FLOCKING_RADIUS = 50;

const CellConfig = {
  defaults: {
    MAX_SPEED: 2,
    MAX_ENERGY: 110,
    MUTATION_RATE: 0.002,
    MAX_AGE: 1000,
    MIN_SIZE_FACTOR: 0.75,
    MAX_SIZE_FACTOR: 3,
    PREY_REPRODUCTION_THRESHOLD: 89.45,
    PREY_MOVEMENT_COST: 0.07,
    PREY_REPRODUCTION_RATE: 2,
    PREY_SPEED_ADVANTAGE: 1.35,
    PREY_ESCAPE_CHANCE: 0.001,
    PREY_DEFENSE_CHANCE: 0.002,
    PREDATOR_REPRODUCTION_THRESHOLD: 75,
    PREDATOR_REPRODUCTION_RATE: 1.25,
    PREDATOR_MOVEMENT_COST: 0.015,
    PREDATOR_DIGESTION_TIME: 99,
    PREDATOR_ENERGY_GAIN: 70,
    PREDATOR_VISION_RANGE: 360,
    PREDATOR_PACK_HUNTING_RADIUS: 120,
    PACK_HUNT_RADIUS: 120,
    PACK_SIZE_THRESHOLD: 2,
    PACK_SPEED_BOOST: 1.25,
    PACK_VISION_BOOST: 1.3,
    PACK_SPREAD_DISTANCE: 55,
    PACK_ENERGY_SHARE_PERCENTAGE: 0.25,
    MAX_PACK_SIZE: 45,
    PACK_AVOIDANCE_RADIUS: 150,
    PACK_AVOIDANCE_STRENGTH: 0.8,
    PREY_EVOLUTION_THRESHOLD: 200,
    PREDATOR_EVOLUTION_THRESHOLD: 75,
    EVOLUTION_BOOST: 1.25,
    USER_CONTROLLED_REPRODUCTION_THRESHOLD: 70,
  },
  debugOverrides: {},

  get(key) {
    if (this.debugOverrides.hasOwnProperty(key)) {
      return this.debugOverrides[key];
    } else if (this.defaults.hasOwnProperty(key)) {
      return this.defaults[key];
    } else {
      return 0; // or some default value
    }
  },

  setDebugOverride(key, value) {
    this.debugOverrides[key] = value;
  },

  resetDebugOverrides() {
    Cell.resetDefaults();
    this.updateDebugMenuDisplay();
    this.updateSimulationState();
  },

  resetToDefaults() {
    this.debugOverrides = {};
  },
};

const POWERUPS = [
  {
    name: "Virus Pull Aura",
    description: "Creates a pulling aura around the cell",
    levels: Array.from({ length: 10 }, (_, i) => ({
      radius: 50 + i * 10,
      strength: 0.1 + i * 0.02,
    })),
  },
  {
    name: "Quantum Tunneling",
    description: "Teleport to high-density prey areas",
    levels: Array.from({ length: 10 }, (_, i) => ({
      cooldown: 15 - i * 0.5,
      range: 100 + i * 20,
    })),
  },
  {
    name: "Viral Replicator",
    description: "Infect and convert nearby prey",
    levels: Array.from({ length: 10 }, (_, i) => ({
      infectionRadius: 50 + i * 10,
      conversionTime: 10 - i * 0.5,
      maxInfected: 3 + i,
    })),
  },
  {
    name: "Temporal Rift",
    description: "Create time distortions affecting nearby cells",
    levels: Array.from({ length: 10 }, (_, i) => ({
      radius: 50 + i * 10,
      duration: 5 + i,
      timeWarpFactor: 1.5 + i * 0.1,
    })),
  },
  {
    name: "Biome Catalyst",
    description: "Transform the environment to favor predators",
    levels: Array.from({ length: 10 }, (_, i) => ({
      transformRadius: 60 + i * 10,
      duration: 10 + i * 2,
      preyWeakeningFactor: 0.8 - i * 0.05,
    })),
  },
  {
    name: "Energy Efficiency",
    description: "Reduces energy consumption",
    levels: Array.from({ length: 10 }, (_, i) => ({
      reduction: 0.9 - i * 0.05,
    })),
  },
  {
    name: "Speed Boost",
    description: "Increases movement speed",
    levels: Array.from({ length: 10 }, (_, i) => ({
      boost: 1.2 + i * 0.1,
    })),
  },
];

class Cell {
  static get MAX_SPEED() {
    return CellConfig.get("MAX_SPEED");
  }
  static get MAX_ENERGY() {
    return CellConfig.get("MAX_ENERGY");
  }
  static get MUTATION_RATE() {
    return CellConfig.get("MUTATION_RATE");
  }
  static get MAX_AGE() {
    return CellConfig.get("MAX_AGE");
  }
  static get MIN_SIZE_FACTOR() {
    return CellConfig.get("MIN_SIZE_FACTOR");
  }
  static get MAX_SIZE_FACTOR() {
    return CellConfig.get("MAX_SIZE_FACTOR");
  }
  static get PREY_REPRODUCTION_THRESHOLD() {
    return CellConfig.get("PREY_REPRODUCTION_THRESHOLD");
  }
  static get PREY_MOVEMENT_COST() {
    return CellConfig.get("PREY_MOVEMENT_COST");
  }
  static get PREY_REPRODUCTION_RATE() {
    return CellConfig.get("PREY_REPRODUCTION_RATE");
  }
  static get PREY_SPEED_ADVANTAGE() {
    return CellConfig.get("PREY_SPEED_ADVANTAGE");
  }
  static get PREY_ESCAPE_CHANCE() {
    return CellConfig.get("PREY_ESCAPE_CHANCE");
  }
  static get PREY_DEFENSE_CHANCE() {
    return CellConfig.get("PREY_DEFENSE_CHANCE");
  }
  static get PREDATOR_REPRODUCTION_THRESHOLD() {
    return CellConfig.get("PREDATOR_REPRODUCTION_THRESHOLD");
  }
  static get PREDATOR_REPRODUCTION_RATE() {
    return CellConfig.get("PREDATOR_REPRODUCTION_RATE");
  }
  static get PREDATOR_MOVEMENT_COST() {
    return CellConfig.get("PREDATOR_MOVEMENT_COST");
  }
  static get PREDATOR_DIGESTION_TIME() {
    return CellConfig.get("PREDATOR_DIGESTION_TIME");
  }
  static get PREDATOR_ENERGY_GAIN() {
    return CellConfig.get("PREDATOR_ENERGY_GAIN");
  }
  static get PREDATOR_VISION_RANGE() {
    return CellConfig.get("PREDATOR_VISION_RANGE");
  }
  static get PREDATOR_PACK_HUNTING_RADIUS() {
    return CellConfig.get("PREDATOR_PACK_HUNTING_RADIUS");
  }
  static get PACK_HUNT_RADIUS() {
    return CellConfig.get("PACK_HUNT_RADIUS");
  }
  static get PACK_SIZE_THRESHOLD() {
    return CellConfig.get("PACK_SIZE_THRESHOLD");
  }
  static get PACK_SPEED_BOOST() {
    return CellConfig.get("PACK_SPEED_BOOST");
  }
  static get PACK_VISION_BOOST() {
    return CellConfig.get("PACK_VISION_BOOST");
  }
  static get PACK_SPREAD_DISTANCE() {
    return CellConfig.get("PACK_SPREAD_DISTANCE");
  }
  static get PACK_ENERGY_SHARE_PERCENTAGE() {
    return CellConfig.get("PACK_ENERGY_SHARE_PERCENTAGE");
  }
  static get MAX_PACK_SIZE() {
    return CellConfig.get("MAX_PACK_SIZE");
  }
  static get PACK_AVOIDANCE_RADIUS() {
    return CellConfig.get("PACK_AVOIDANCE_RADIUS");
  }
  static get PACK_AVOIDANCE_STRENGTH() {
    return CellConfig.get("PACK_AVOIDANCE_STRENGTH");
  }
  static get PREY_EVOLUTION_THRESHOLD() {
    return CellConfig.get("PREY_EVOLUTION_THRESHOLD");
  }
  static get PREDATOR_EVOLUTION_THRESHOLD() {
    return CellConfig.get("PREDATOR_EVOLUTION_THRESHOLD");
  }
  static get EVOLUTION_BOOST() {
    return CellConfig.get("EVOLUTION_BOOST");
  }
  static get USER_CONTROLLED_REPRODUCTION_THRESHOLD() {
    return CellConfig.get("USER_CONTROLLED_REPRODUCTION_THRESHOLD");
  }
  static resetDefaults() {
    CellConfig.resetToDefaults();
  }

  constructor(
    x,
    y,
    color,
    isPrey,
    eyeColor = null,
    attributes = null,
    geneticTraits = null,
    spikeCount = null
  ) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.isPrey = isPrey;
    this.energy = isPrey ? 40 : 60;
    this.radius = isPrey ? 3.5 : 5;
    this.vx = 0;
    this.vy = 0;
    this.defenseStrength = Math.random() * 0.5;
    this.flockingEnabled = false;

    this.consecutiveKills = 0;
    this.evolutionProgress = 0;
    this.isEvolved = false;
    this.glowRadius = 0;
    this.glowOpacity = 0;
    this.inPack = false;
    this.packMembers = [];
    this.age = 0;
    this.baseSizeRadius = this.radius;
    this.isUserControlled = false;
    this.level = 1;
    this.preyEatenForNextLevel = 5;

    this.virusAura = null;
    this.isUserOffspring = false;
    this.powerups = [];
    this.virusPullAura = null;
    this.eggSpawner = null;
    this.projectileShooter = null;
    this.eggs = [];
    this.eggSpawnTimer = 0;
    this.eggSpawnInterval = 5;
    this.projectiles = [];
    this.projectileShootTimer = 0;
    this.maxOffspringPerReproduction = isPrey ? 60 : 40;

    this.parentEyeColor = eyeColor;
    this.geneCode = this.generateGeneCode();
    this.applyGeneCode();

    this.attributes = attributes || {
      maxSpeed: isPrey
        ? Cell.MAX_SPEED * Cell.PREY_SPEED_ADVANTAGE
        : Cell.MAX_SPEED,
      reproductionThreshold: isPrey
        ? Cell.PREY_REPRODUCTION_THRESHOLD
        : Cell.PREDATOR_REPRODUCTION_THRESHOLD,
      movementCost: isPrey
        ? Cell.PREY_MOVEMENT_COST
        : Cell.PREDATOR_MOVEMENT_COST,
      reproductionRate: isPrey
        ? Cell.PREY_REPRODUCTION_RATE
        : Cell.PREDATOR_REPRODUCTION_RATE,
    };

    this.isPrey = isPrey;
    if (!this.isPrey) {
      this.spikeCount = spikeCount || Math.floor(Math.random() * 4) + 6; // Random number of spikes between 4 and 8
    }

    this.eyeColor = eyeColor || this.generateRandomColor();
    this.geneticTraits = geneticTraits || this.initializeGeneticTraits();

    this.mutate();
  }

  update(nearestFood, nearestCell, width, height, neighbors, deltaTime) {
    let targetX, targetY;

    if (this.isPrey && nearestFood) {
      targetX = nearestFood.x;
      targetY = nearestFood.y;
    } else if (!this.isPrey) {
      const nearbyPrey = neighbors.filter(
        (cell) =>
          cell.isPrey &&
          Math.hypot(cell.x - this.x, cell.y - this.y) <
            Cell.PREDATOR_VISION_RANGE * this.geneticTraits.speedModifier
      );
      if (nearbyPrey.length > 0) {
        const target = this.findNearestPrey(nearbyPrey);
        targetX = target.x;
        targetY = target.y;
      } else {
        targetX = this.x + (Math.random() - 0.5) * 100;
        targetY = this.y + (Math.random() - 0.5) * 100;
      }
    } else {
      targetX = this.x + (Math.random() - 0.5) * 100;
      targetY = this.y + (Math.random() - 0.5) * 100;
    }

    const dx = targetX - this.x;
    const dy = targetY - this.y;
    const magnitude = Math.sqrt(dx * dx + dy * dy);

    let targetVx = 0;
    let targetVy = 0;

    if (magnitude > 0) {
      targetVx = (dx / magnitude) * this.attributes.maxSpeed;
      targetVy = (dy / magnitude) * this.attributes.maxSpeed;
    }

    // Apply collision avoidance
    if (this.isPrey || !nearestCell || !nearestCell.isPrey) {
      const avoidanceForce = this.calculateCollisionAvoidance(neighbors);
      targetVx += avoidanceForce.x;
      targetVy += avoidanceForce.y;
    }

    const easing = this.isPrey ? 0.05 : 0.1;
    this.vx += (targetVx - this.vx) * easing;
    this.vy += (targetVy - this.vy) * easing;

    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    const maxSpeed =
      this.attributes.maxSpeed * this.geneticTraits.speedModifier;
    if (speed > maxSpeed) {
      const factor = maxSpeed / speed;
      this.vx *= factor;
      this.vy *= factor;
    }

    const wrappedCoords = this.simulation.wrapCoordinates(this.x, this.y);
    this.x = wrappedCoords.x;
    this.y = wrappedCoords.y;

    this.x += this.vx * deltaTime * 60;
    this.y += this.vy * deltaTime * 60;

    if (!this.isPrey) {
      if (this.digesting > 0) {
        this.digesting -= deltaTime;
        this.vx *= 0.95;
        this.vy *= 0.95;
      }

      if (this.flockingEnabled && Math.random() < 0.1) {
        this.simulation.particleSystem.addParticles(
          this.x,
          this.y,
          this.color,
          1,
          "trail"
        );
      }

      const extraCost = Math.min(this.consecutiveKills * 0.0006, 0.05);

      this.energy -=
        ((this.attributes.movementCost + extraCost) /
          this.geneticTraits.energyEfficiency) *
        deltaTime *
        60;
    } else {
      this.energy -=
        (this.attributes.movementCost / this.geneticTraits.energyEfficiency) *
        deltaTime *
        60;
    }

    if (!this.isUserControlled) {
      const evolutionThreshold = this.isPrey
        ? Cell.PREY_EVOLUTION_THRESHOLD
        : Cell.PREDATOR_EVOLUTION_THRESHOLD;
      if (this.evolutionProgress >= evolutionThreshold && !this.isEvolved) {
        this.evolve();
      }
    }

    if (this.virusAura) {
      const affectedCells = this.applyVirusAura(neighbors);
      if (this.simulation && this.simulation.particleSystem) {
        affectedCells.forEach((cell) => {
          this.simulation.particleSystem.addParticles(
            cell.x,
            cell.y,
            "rgba(0, 255, 0, 0.5)",
            3,
            "virusEffect"
          );
        });
      }
    }

    this.age += deltaTime;
    if (this.age >= Cell.MAX_AGE) {
      // Rapidly decrease energy when cell reaches MAX_AGE
      this.energy = Math.max(0, this.energy - 10 * deltaTime);
    }

    this.flock(neighbors);

    this.updateSizeBasedOnAge();
    this.updateBiomeCatalyst(deltaTime, neighbors);
    this.updateViralReplicator(deltaTime, neighbors);
    this.updateTemporalRift(deltaTime, neighbors);
    this.updateQuantumTunneling(deltaTime, neighbors);

    this.energy -=
      (this.attributes.movementCost / this.geneticTraits.energyEfficiency) *
      deltaTime *
      60;
    if (this.energy <= 0) {
      this.simulation.removeCell(this);
    }

    return null;
  }

  //DRAW
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

    if (this.isPrey) {
      // prey
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    } else {
      // predators
      const outerRadius = this.radius;
      const innerRadius = this.radius * 0.5;

      ctx.beginPath();
      ctx.moveTo(0, -outerRadius);
      for (let i = 0; i < this.spikeCount * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (Math.PI * 2 * i) / (this.spikeCount * 2) - Math.PI / 2;
        ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
      }
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    // eye
    const eyeRadius = this.radius * 0.3;
    const eyeDistance = this.isPrey ? this.radius * 0.3 : this.radius * 0.4;
    const angle = Math.atan2(this.vy, this.vx);
    const eyeX = Math.cos(angle) * eyeDistance;
    const eyeY = Math.sin(angle) * eyeDistance;

    ctx.beginPath();
    ctx.arc(eyeX, eyeY, eyeRadius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();

    // pupil
    const pupilRadius = eyeRadius * 0.6;
    const pupilX = eyeX + Math.cos(angle) * (eyeRadius * 0.3);
    const pupilY = eyeY + Math.sin(angle) * (eyeRadius * 0.3);

    ctx.beginPath();
    ctx.arc(pupilX, pupilY, pupilRadius, 0, Math.PI * 2);
    ctx.fillStyle = this.eyeColor;
    ctx.fill();

    // evolution glow
    if (this.isEvolved) {
      ctx.beginPath();
      ctx.arc(0, 0, this.radius * 1.3, 0, Math.PI * 2);
      ctx.strokeStyle = this.isPrey
        ? "rgba(255, 255, 0, 0.5)"
        : "rgba(220, 20, 255, 0.5)";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    ctx.restore();

    // user-controlled indicator
    if (this.isUserControlled) {
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius + 5, 0, Math.PI * 2);
      ctx.stroke();
    }

    // virus aura
    if (this.isUserControlled && this.virusAura) {
      const virusAuraRadius = Math.max(this.virusAura.radius, this.radius);
      const gradient = ctx.createRadialGradient(
        this.x,
        this.y,
        this.radius,
        this.x,
        this.y,
        virusAuraRadius
      );
      gradient.addColorStop(0, "rgba(0, 255, 0, 0.2)");
      gradient.addColorStop(1, "rgba(0, 255, 0, 0)");

      ctx.beginPath();
      ctx.arc(this.x, this.y, virusAuraRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }

  // FUNCTIONS
  generateRandomColor() {
    return `rgb(${Math.random() * 256},${Math.random() * 256},${
      Math.random() * 256
    })`;
  }
  mutate() {
    if (Math.random() < Cell.MUTATION_RATE) {
      // Mutate attributes
      for (let attr in this.attributes) {
        this.attributes[attr] *= 1 + (Math.random() - 0.5) * 0.1; // +/- 5% change
      }

      // Mutate genetic traits
      for (let trait in this.geneticTraits) {
        this.geneticTraits[trait] *= 1 + (Math.random() - 0.5) * 0.05; // +/- 2.5% change
      }
    }
  }
  flock(neighbors) {
    if (!this.flockingEnabled || !this.simulation.flockingEnabled) return;

    let alignment = { x: 0, y: 0 };
    let cohesion = { x: 0, y: 0 };
    let separation = { x: 0, y: 0 };
    let flockmates = 0;

    for (let other of neighbors) {
      if (
        other === this ||
        !(other instanceof Cell) ||
        other.constructor !== this.constructor
      )
        continue;

      const dx = other.x - this.x;
      const dy = other.y - this.y;
      const distSquared = dx * dx + dy * dy;

      if (distSquared < FLOCKING_RADIUS * FLOCKING_RADIUS) {
        // Alignment
        alignment.x += other.vx;
        alignment.y += other.vy;

        // Cohesion
        cohesion.x += other.x;
        cohesion.y += other.y;

        // Separation
        const factor = 1 / Math.max(distSquared, 0.1);
        separation.x += dx * factor;
        separation.y += dy * factor;

        flockmates++;
      }
    }

    if (flockmates > 0) {
      // Alignment
      this.vx += (alignment.x / flockmates - this.vx) * ALIGNMENT_FACTOR;
      this.vy += (alignment.y / flockmates - this.vy) * ALIGNMENT_FACTOR;

      // Cohesion
      this.vx += (cohesion.x / flockmates - this.x) * COHESION_FACTOR;
      this.vy += (cohesion.y / flockmates - this.y) * COHESION_FACTOR;

      // Separation
      this.vx -= separation.x * SEPARATION_FACTOR;
      this.vy -= separation.y * SEPARATION_FACTOR;
    }
  }
  initializeGeneticTraits() {
    const [r, g, b] = this.eyeColor.match(/\d+/g).map(Number);
    return {
      speedModifier: 0.9 + (r / 255) * 0.2, // 0.9 to 1.1
      energyEfficiency: 0.9 + (g / 255) * 0.2, // 0.9 to 1.1
      reproductionBonus: 0.9 + (b / 255) * 0.2, // 0.9 to 1.1
    };
  }
  eat(prey) {
    let energyGained = 0;

    if (this.isPrey) {
      if (prey instanceof Food) {
        energyGained = 40;
        this.energy += energyGained;
        this.energy = Math.min(this.energy, Cell.MAX_ENERGY);
        this.evolutionProgress++;
        this.foodEaten = (this.foodEaten || 0) + 1;
      }
    } else {
      if (prey instanceof Cell && prey.isPrey) {
        energyGained = Math.max(
          Cell.PREDATOR_ENERGY_GAIN - this.consecutiveKills * 2,
          60
        );
        this.energy += energyGained;
        this.energy = Math.min(this.energy, Cell.MAX_ENERGY);
        this.consecutiveKills++;
        this.evolutionProgress++;
        this.preyEaten = (this.preyEaten || 0) + 1;

        if (this.simulation && this.simulation.particleSystem) {
          this.simulation.particleSystem.addParticles(
            this.x,
            this.y,
            "rgba(255, 0, 0, 0.5)",
            10,
            "predatorFeed"
          );
        }
      }
    }

    this.energy = Math.min(this.energy, Cell.MAX_ENERGY);
    return energyGained;
  }
  calculateCollisionAvoidance(neighbors) {
    const avoidanceForce = { x: 0, y: 0 };
    const avoidanceRadius = this.radius * 3;

    for (const other of neighbors) {
      if (other === this || !this.isSameType(other)) continue;

      const dx = this.x - other.x;
      const dy = this.y - other.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < avoidanceRadius) {
        const force = (avoidanceRadius - distance) / avoidanceRadius;
        avoidanceForce.x += (dx / distance) * force;
        avoidanceForce.y += (dy / distance) * force;
      }
    }

    // Normalize and scale the avoidance force
    const magnitude = Math.sqrt(
      avoidanceForce.x * avoidanceForce.x + avoidanceForce.y * avoidanceForce.y
    );
    if (magnitude > 0) {
      avoidanceForce.x =
        (avoidanceForce.x / magnitude) * this.attributes.maxSpeed * 0.5;
      avoidanceForce.y =
        (avoidanceForce.y / magnitude) * this.attributes.maxSpeed * 0.5;
    }

    return avoidanceForce;
  }
  isSameType(other) {
    // Check if either cell is a user-controlled offspring
    if (this.isUserOffspring || other.isUserOffspring) {
      return this.isPrey === other.isPrey;
    }

    // Handle HybridCells
    if (this instanceof HybridCell && other instanceof HybridCell) return true;

    // Handle AdaptiveCells
    if (this instanceof AdaptiveCell && other instanceof AdaptiveCell)
      return true;

    // Handle regular cells (including offspring)
    if (
      !(this instanceof HybridCell) &&
      !(this instanceof AdaptiveCell) &&
      !(other instanceof HybridCell) &&
      !(other instanceof AdaptiveCell)
    ) {
      return this.isPrey === other.isPrey;
    }

    return false;
  }
  reproduce() {
    const threshold = this.isPrey
      ? Cell.PREY_REPRODUCTION_THRESHOLD
      : Cell.PREDATOR_REPRODUCTION_THRESHOLD;
    if (this.energy >= threshold) {
      const offspringCount = Math.min(
        Math.floor(this.attributes.reproductionRate),
        this.isPrey ? 2 : 10
      );
      const offspring = this.createOffspring(offspringCount);
      this.energy /= 2;
      offspring.parentEyeColor = this.eyeColor;
      return offspring;
    }
    return [];
  }

  //GENES
  generateGeneCode() {
    const genes = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let code = "";
    for (let i = 0; i < 10; i++) {
      code += genes[Math.floor(Math.random() * genes.length)];
    }
    return code;
  }

  applyGeneCode() {
    const traits = this.interpretGeneCode();
    this.geneticTraits = {
      speedModifier: traits.speedModifier,
      energyEfficiency: traits.energyEfficiency,
      reproductionBonus: traits.reproductionBonus,
      visionRange: traits.visionRange,
    };
    this.radius *= traits.size; // Adjust cell size based on gene
  }
  interpretGeneCode() {
    const baseValue = 0.5;
    const variationRange = 0.8;

    return {
      speedModifier:
        baseValue +
        (variationRange *
          (this.geneCode.charCodeAt(0) + this.geneCode.charCodeAt(1) - 130)) /
          50,
      energyEfficiency:
        baseValue +
        (variationRange *
          (this.geneCode.charCodeAt(2) + this.geneCode.charCodeAt(3) - 130)) /
          50,
      reproductionBonus:
        baseValue +
        (variationRange *
          (this.geneCode.charCodeAt(4) + this.geneCode.charCodeAt(5) - 130)) /
          50,
      visionRange:
        baseValue +
        (variationRange *
          (this.geneCode.charCodeAt(6) + this.geneCode.charCodeAt(7) - 130)) /
          50,
      size:
        baseValue +
        (variationRange *
          (this.geneCode.charCodeAt(8) + this.geneCode.charCodeAt(9) - 130)) /
          50,
    };
  }

  mutate() {
    if (Math.random() < Cell.MUTATION_RATE) {
      const index = Math.floor(Math.random() * this.geneCode.length);
      const genes = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const newGene = genes[Math.floor(Math.random() * genes.length)];
      this.geneCode =
        this.geneCode.substring(0, index) +
        newGene +
        this.geneCode.substring(index + 1);
      this.applyGeneCode();
    }
  }
  createOffspring(count) {
    const newCells = [];
    for (let i = 0; i < count; i++) {
      const offspring = new Cell(
        this.x + (Math.random() - 0.5) * 20,
        this.y + (Math.random() - 0.5) * 20,
        this.color,
        this.isPrey,
        this.eyeColor,
        { ...this.attributes },
        { ...this.geneticTraits },
        this.spikeCount
      );
      offspring.geneCode = this.geneCode;
      offspring.mutate();
      offspring.energy = this.isPrey ? 40 : 60;
      offspring.age = 0;
      offspring.baseSizeRadius = offspring.radius;
      offspring.simulation = this.simulation;
      offspring.isUserOffspring = this.isUserControlled || this.isUserOffspring;
      offspring.isPrey = this.isPrey;
      newCells.push(offspring);
    }
    return newCells;
  }
  findNearestPrey(nearbyPrey) {
    return nearbyPrey.reduce((closest, current) => {
      const distToCurrent = Math.hypot(current.x - this.x, current.y - this.y);
      const distToClosest = Math.hypot(closest.x - this.x, closest.y - this.y);
      return distToCurrent < distToClosest ? current : closest;
    });
  }
  addPowerup(powerup) {
    const existingPowerup = this.powerups.find((p) => p.name === powerup.name);
    if (existingPowerup) {
      existingPowerup.level = Math.min(
        existingPowerup.level + 1,
        powerup.levels.length - 1
      );
    } else {
      this.powerups.push({ ...powerup, level: 0 });
    }
    this.applyPowerups();
  }
  applyPowerups() {
    if (!this.powerups) return;

    this.powerups.forEach((powerup) => {
      const currentLevel =
        powerup.levels && powerup.levels[powerup.level]
          ? powerup.levels[powerup.level]
          : {};

      switch (powerup.name) {
        case "Virus Pull Aura":
          this.virusAura = {
            radius: currentLevel.radius || 50,
            strength: currentLevel.strength || 0.1,
          };
          break;

        case "Speed Boost":
          this.attributes.maxSpeed *= currentLevel.boost || 1.2;
          break;

        case "Energy Efficiency":
          this.attributes.movementCost *= currentLevel.reduction || 0.9;
          break;

        case "Quantum Tunneling":
          this.quantumTunneling = {
            cooldown: currentLevel.cooldown,
            range: currentLevel.range,
            timer: 0,
          };
          break;

        case "Viral Replicator":
          this.viralReplicator = {
            radius: currentLevel.infectionRadius,
            conversionTime: currentLevel.conversionTime,
            maxInfected: currentLevel.maxInfected,
            infectedCells: [],
          };
          break;

        case "Temporal Rift":
          this.temporalRift = {
            radius: currentLevel.radius,
            duration: currentLevel.duration,
            warpFactor: currentLevel.timeWarpFactor,
            active: false,
            timer: 0,
          };
          break;

        case "Biome Catalyst":
          this.biomeCatalyst = {
            radius: currentLevel.transformRadius,
            duration: currentLevel.duration,
            weakenFactor: currentLevel.preyWeakeningFactor,
            active: false,
            timer: 0,
          };
          break;
      }
    });

    this.virusAura = this.virusAura || null;
  }

  addPowerup(powerup) {
    const existingPowerup = this.powerups.find((p) => p.name === powerup.name);
    if (existingPowerup) {
      existingPowerup.level = Math.min(
        (existingPowerup.level || 0) + 1,
        (powerup.levels ? powerup.levels.length : 1) - 1
      );
    } else {
      this.powerups.push({ ...powerup, level: 0 });
    }
    this.applyPowerups();
  }
  applyPowerups() {
    if (!this.powerups) return;

    this.powerups.forEach((powerup) => {
      const currentLevel = powerup.levels[powerup.level];
      switch (powerup.name) {
        case "Virus Pull Aura":
          this.virusAura = {
            radius: currentLevel.radius,
            strength: currentLevel.strength,
          };
          break;
        case "Egg Spawner":
          this.eggSpawner = {
            spawnRate: currentLevel.spawnRate,
            maxEggs: currentLevel.maxEggs,
          };
          break;
        case "Projectile Shooter":
          this.projectileShooter = {
            damage: currentLevel.damage,
            cooldown: currentLevel.cooldown,
            speed: currentLevel.speed,
            lastShot: 0,
          };
          break;
        case "Speed Boost":
          this.attributes.maxSpeed *= currentLevel.boost;
          break;
        case "Energy Efficiency":
          this.attributes.movementCost *= currentLevel.reduction;
          break;
        case "Rapid Reproduction":
          this.attributes.reproductionRate *= currentLevel.boost;
          break;
        case "Enhanced Vision":
          // Assume we have a visionRange attribute
          this.attributes.visionRange *= currentLevel.range;
          break;
      }
    });

    // Ensure virus aura is properly set even if not selected as a powerup
    if (!this.virusAura) {
      this.virusAura = null;
    }
  }

  spawnEgg(deltaTime) {
    if (!this.eggSpawner) return;

    this.eggSpawnTimer += deltaTime;

    if (
      this.eggSpawnTimer >= this.eggSpawnInterval &&
      this.eggs.length < this.eggSpawner.maxEggs
    ) {
      const angle = Math.random() * Math.PI * 2;
      const distance = this.radius * 3;
      const egg = {
        x: this.x + Math.cos(angle) * distance,
        y: this.y + Math.sin(angle) * distance,
        hatchTime: 10, // Hatch after 10 seconds
        radius: this.radius * 0.5,
      };
      this.eggs.push(egg);
      if (this.simulation && this.simulation.particleSystem) {
        this.simulation.particleSystem.addEggSpawnEffect(egg.x, egg.y);
      }
      this.eggSpawnTimer = 0;
    }
  }

  updateEggs(deltaTime, width, height) {
    this.eggs = this.eggs.filter((egg) => {
      egg.hatchTime -= deltaTime;
      if (egg.hatchTime <= 0) {
        // Hatch the egg
        const offspring = this.createOffspring(1)[0];
        offspring.x = egg.x;
        offspring.y = egg.y;
        if (this.simulation) {
          this.simulation.cells.push(offspring);
        }
        return false;
      }
      // Wrap egg position around the screen
      egg.x = (egg.x + width) % width;
      egg.y = (egg.y + height) % height;
      return true;
    });
  }

  shootProjectile(nearestEnemy, deltaTime) {
    if (!this.projectileShooter) return;

    this.projectileShootTimer += deltaTime;
    if (this.projectileShootTimer >= this.projectileShooter.cooldown) {
      if (nearestEnemy) {
        const angle = Math.atan2(
          nearestEnemy.y - this.y,
          nearestEnemy.x - this.x
        );
        const projectile = {
          x: this.x,
          y: this.y,
          speed: this.projectileShooter.speed,
          damage: this.projectileShooter.damage,
          angle: angle,
          target: nearestEnemy,
        };
        this.projectiles.push(projectile);
        this.projectileShootTimer = 0;
      }
    }
  }

  updateProjectiles(deltaTime, width, height, neighbors) {
    this.projectiles = this.projectiles.filter((projectile) => {
      // Update projectile position
      projectile.x += Math.cos(projectile.angle) * projectile.speed * deltaTime;
      projectile.y += Math.sin(projectile.angle) * projectile.speed * deltaTime;

      // Wrap projectile position around the screen
      projectile.x = (projectile.x + width) % width;
      projectile.y = (projectile.y + height) % height;

      // Check for collision with enemies
      const hitEnemy = neighbors.find(
        (cell) =>
          !cell.isPrey &&
          cell !== this &&
          Math.hypot(cell.x - projectile.x, cell.y - projectile.y) < cell.radius
      );

      if (hitEnemy) {
        hitEnemy.energy -= projectile.damage;
        if (hitEnemy.energy <= 0 && this.simulation) {
          this.simulation.removeCell(hitEnemy);
        }
        if (this.simulation && this.simulation.particleSystem) {
          this.simulation.particleSystem.addProjectileHitEffect(
            projectile.x,
            projectile.y
          );
        }
        return false;
      }

      return true;
    });
  }

  battle(opponent) {
    // Prey cells should not battle
    if (this.isPrey) {
      return null;
    }

    // Only predators (non-prey cells) can battle other predators
    if (
      !opponent.isPrey &&
      !this.isUserControlled &&
      !opponent.isUserControlled
    ) {
      const battleRoll = Math.random();
      const winThreshold = 0.5; // 50% chance of winning

      if (battleRoll > winThreshold) {
        // This cell wins
        this.energy += 20;
        return true;
      } else {
        // This cell loses
        this.energy = 0;
        return false;
      }
    }

    return null; // No battle occurs in other cases
  }

  avoidOtherPacks(neighbors) {
    if (!this.inPack) return;

    let avoidX = 0;
    let avoidY = 0;
    let avoidCount = 0;

    neighbors.forEach((cell) => {
      if (!cell.isPrey && cell.inPack && !this.packMembers.includes(cell)) {
        const dx = this.x - cell.x;
        const dy = this.y - cell.y;
        const distanceSquared = dx * dx + dy * dy;

        if (
          distanceSquared <
          Cell.PACK_AVOIDANCE_RADIUS * Cell.PACK_AVOIDANCE_RADIUS
        ) {
          const distance = Math.sqrt(distanceSquared);
          const factor = 1 - distance / Cell.PACK_AVOIDANCE_RADIUS;
          avoidX += (dx / distance) * factor;
          avoidY += (dy / distance) * factor;
          avoidCount++;
        }
      }
    });

    if (avoidCount > 0) {
      const avoidanceFactor = Cell.PACK_AVOIDANCE_STRENGTH / avoidCount;
      this.vx += avoidX * avoidanceFactor;
      this.vy += avoidY * avoidanceFactor;

      // Normalize velocity to maintain speed
      const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (speed > this.attributes.maxSpeed) {
        this.vx = (this.vx / speed) * this.attributes.maxSpeed;
        this.vy = (this.vy / speed) * this.attributes.maxSpeed;
      }
    }
  }
  shareEnergyEffect(recipient) {
    if (this.simulation && this.simulation.particleSystem) {
      const dx = recipient.x - this.x;
      const dy = recipient.y - this.y;
      const distance = Math.hypot(dx, dy);
      const particleCount = 5;

      for (let i = 0; i < particleCount; i++) {
        const t = i / (particleCount - 1);
        const x = this.x + dx * t;
        const y = this.y + dy * t;
        this.simulation.particleSystem.addParticles(
          x,
          y,
          "rgba(255, 215, 0, 0.7)",
          1,
          "energyShare"
        );
      }
    }
  }
  defend(attacker) {
    if (this.isPrey && attacker instanceof HybridCell) {
      if (Math.random() < Cell.PREY_DEFENSE_CHANCE + this.defenseStrength) {
        this.energy += 10; // Energy boost for successful defense
        attacker.energy -= 15; // Energy penalty for the hybrid
        return true; // Defense successful
      }
    }
    return false; // Defense failed
  }

  userControlledEat(prey) {
    let energyGained =
      Math.max(Cell.PREDATOR_ENERGY_GAIN - this.consecutiveKills, 25) * 1.5;
    this.energy += energyGained;
    this.energy = Math.min(this.energy, Cell.MAX_ENERGY);
    this.consecutiveKills++;
    this.evolutionProgress++;
    this.preyEaten++;

    if (this.simulation && this.simulation.particleSystem) {
      this.simulation.particleSystem.addParticles(
        this.x,
        this.y,
        "rgba(255, 0, 0, 0.5)",
        10,
        "predatorFeed"
      );
    }

    this.checkLevelUp();

    return this.userControlledReproduce();
  }

  checkLevelUp() {
    if (this.preyEaten >= this.preyEatenForNextLevel) {
      this.level++;
      this.preyEaten = 0;
      this.preyEatenForNextLevel = Math.floor(
        5 * Math.pow(1.5, this.level - 1)
      ); // Exponential increase
      if (this.simulation) {
        this.simulation.showLevelUpPopup(this);
      }
      return true;
    }
    return false;
  }

  userControlledReproduce() {
    if (this.energy >= Cell.USER_CONTROLLED_REPRODUCTION_THRESHOLD) {
      const offspring = this.createOffspring(1);
      this.energy /= 1;
      this.consecutiveKills = 0;
      offspring.forEach((child) => {
        child.isUserOffspring = true;
        child.color = "blue";
      });
      return offspring;
    }
    return [];
  }

  evolve() {
    if (!this.isEvolved) {
      this.isEvolved = true;
      this.radius *= 1.5;
      this.glowRadius = this.radius * 1.2;
      this.glowOpacity = 0.3;

      // Boost attributes
      for (let attr in this.attributes) {
        this.attributes[attr] *= Cell.EVOLUTION_BOOST;
      }

      // Boost genetic traits
      for (let trait in this.geneticTraits) {
        this.geneticTraits[trait] *= Cell.EVOLUTION_BOOST;
      }

      // Change color to indicate evolution
      this.color = this.isPrey ? "blue" : "crimson";

      // Add evolution burst effect
      if (this.simulation && this.simulation.particleSystem) {
        this.simulation.particleSystem.addParticles(
          this.x,
          this.y,
          this.color,
          10,
          "burst"
        );
      }
    }
  }

  highlightCell(ctx) {
    if (this === this.simulation.userControlledCell) {
      const screenX = this.x - this.simulation.cameraX;
      const screenY = this.y - this.simulation.cameraY;

      ctx.save();
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius + 9, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }
  collidesWith(entity) {
    const distance = Math.hypot(this.x - entity.x, this.y - entity.y);
    return distance < (this.radius + entity.radius) * 1.1; // 10% buffer
  }
  updatePackStatus(neighbors) {
    if (!this.isPrey) {
      const nearbyPredators = neighbors.filter(
        (cell) =>
          !cell.isPrey &&
          cell !== this &&
          Math.hypot(cell.x - this.x, cell.y - this.y) < Cell.PACK_HUNT_RADIUS
      );

      if (
        nearbyPredators.length >= Cell.PACK_SIZE_THRESHOLD - 1 &&
        nearbyPredators.length <= Cell.MAX_PACK_SIZE - 1
      ) {
        this.inPack = true;
        this.packMembers = nearbyPredators.slice(0, Cell.MAX_PACK_SIZE - 1); // Limit pack members
      } else {
        this.inPack = false;
        this.packMembers = [];
      }
    }
  }
  huntInPack(neighbors) {
    if (!this.inPack || this.packMembers.length === 0) return;

    // Find the average position of the pack
    const packCenter = this.packMembers.reduce(
      (acc, member) => ({ x: acc.x + member.x, y: acc.y + member.y }),
      { x: this.x, y: this.y }
    );
    packCenter.x /= this.packMembers.length + 1;
    packCenter.y /= this.packMembers.length + 1;

    // Find the nearest prey to the pack center
    const nearestPrey = neighbors.find(
      (cell) =>
        cell.isPrey &&
        Math.hypot(cell.x - packCenter.x, cell.y - packCenter.y) <
          Cell.PREDATOR_VISION_RANGE * Cell.PACK_VISION_BOOST
    );

    if (nearestPrey) {
      // Calculate direction to prey
      const dx = nearestPrey.x - this.x;
      const dy = nearestPrey.y - this.y;
      const distance = Math.hypot(dx, dy);

      // Calculate spread vector
      let spreadX = 0;
      let spreadY = 0;
      this.packMembers.forEach((member) => {
        const memberDx = this.x - member.x;
        const memberDy = this.y - member.y;
        const memberDist = Math.hypot(memberDx, memberDy);
        if (memberDist < Cell.PACK_SPREAD_DISTANCE) {
          spreadX += memberDx / memberDist;
          spreadY += memberDy / memberDist;
        }
      });

      // Normalize spread vector
      const spreadMagnitude = Math.hypot(spreadX, spreadY);
      if (spreadMagnitude > 0) {
        spreadX /= spreadMagnitude;
        spreadY /= spreadMagnitude;
      }

      // Combine prey direction and spread
      const targetX = dx / distance + spreadX * 0.5;
      const targetY = dy / distance + spreadY * 0.5;

      // Normalize and apply speed
      const targetMagnitude = Math.hypot(targetX, targetY);
      if (targetMagnitude > 0) {
        this.vx =
          (targetX / targetMagnitude) *
          this.attributes.maxSpeed *
          Cell.PACK_SPEED_BOOST;
        this.vy =
          (targetY / targetMagnitude) *
          this.attributes.maxSpeed *
          Cell.PACK_SPEED_BOOST;
      }

      // Add pack formation particles
      if (this.simulation && this.simulation.particleSystem) {
        this.packMembers.forEach((member) => {
          const midX = (this.x + member.x) / 2;
          const midY = (this.y + member.y) / 2;
          this.simulation.particleSystem.addParticles(
            midX,
            midY,
            "rgba(5, 0, 250, 0.3)",
            10,
            "packFormation"
          );
        });
      }

      // Increase chance of successful hunt
      if (this.collidesWith(nearestPrey)) {
        const huntSuccess = Math.random() < 0.8; // 80% success rate when in a pack
        if (huntSuccess) {
          const energyGained = this.eat(nearestPrey);

          // Share energy with pack members
          if (energyGained > 0) {
            const energyToShare =
              energyGained * Cell.PACK_ENERGY_SHARE_PERCENTAGE;
            const sharePerMember = energyToShare / this.packMembers.length;

            this.packMembers.forEach((member) => {
              if (member instanceof Cell && !member.isPrey) {
                member.energy = Math.min(
                  member.energy + sharePerMember,
                  Cell.MAX_ENERGY
                );
                this.shareEnergyEffect(member);
              }
            });

            // Reduce the energy of the predator that made the kill
            this.energy = Math.max(0, this.energy - energyToShare);
          }

          // Remove the eaten prey from the simulation
          const preyIndex = this.simulation.cells.indexOf(nearestPrey);
          if (preyIndex > -1) {
            this.simulation.cells.splice(preyIndex, 1);
          }
        }
      }
    }
  }
  updateSizeBasedOnAge() {
    if (!this.age || !this.baseSizeRadius) return;

    const ageFactor = Math.min(this.age / (Cell.MAX_AGE / 10), 1); // Grow 10 times faster
    const sizeFactor =
      Cell.MIN_SIZE_FACTOR +
      (Cell.MAX_SIZE_FACTOR - Cell.MIN_SIZE_FACTOR) * ageFactor;
    const newRadius =
      this.baseSizeRadius * sizeFactor * (1 + (this.level - 1) * 0.15);

    if (isFinite(newRadius) && newRadius > 0) {
      const maxChange = this.baseSizeRadius * 2; // Allow up to 50% change per update
      const change = Math.min(Math.abs(newRadius - this.radius), maxChange);
      this.radius += newRadius > this.radius ? change : -change;
    }
  }
  levelUp() {
    this.level++;
    this.yearsSinceLastLevel = 0;

    return {
      newLevel: this.level,
      x: this.x,
      y: this.y,
    };
  }

  //POWERUPS
  updateQuantumTunneling(deltaTime, neighbors) {
    if (this.quantumTunneling) {
      this.quantumTunneling.timer -= deltaTime;
      if (this.quantumTunneling.timer <= 0) {
        const highDensityLocation = this.findHighDensityLocation(neighbors);
        if (highDensityLocation) {
          this.x = highDensityLocation.x;
          this.y = highDensityLocation.y;
          this.quantumTunneling.timer = this.quantumTunneling.cooldown;
          if (this.simulation && this.simulation.particleSystem) {
            this.simulation.particleSystem.addParticles(
              this.x,
              this.y,
              "rgba(0, 255, 255, 0.7)",
              50,
              "quantumTunnel"
            );
          }
        }
      }
    }
  }

  findHighDensityLocation(neighbors) {
    const gridSize = 10;
    const grid = new Array(gridSize)
      .fill(0)
      .map(() => new Array(gridSize).fill(0));

    // Count prey in each grid cell
    neighbors.forEach((cell) => {
      if (cell.isPrey) {
        const gridX = Math.floor(cell.x / (this.simulation.width / gridSize));
        const gridY = Math.floor(cell.y / (this.simulation.height / gridSize));
        if (gridX >= 0 && gridX < gridSize && gridY >= 0 && gridY < gridSize) {
          grid[gridY][gridX]++;
        }
      }
    });

    // Find the cell with the highest prey count within range
    let maxCount = 0;
    let bestLocation = null;

    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const centerX = (x + 0.5) * (this.simulation.width / gridSize);
        const centerY = (y + 0.5) * (this.simulation.height / gridSize);
        const distance = Math.hypot(centerX - this.x, centerY - this.y);

        if (distance <= this.quantumTunneling.range && grid[y][x] > maxCount) {
          maxCount = grid[y][x];
          bestLocation = { x: centerX, y: centerY };
        }
      }
    }

    // If no suitable location found, return null
    if (!bestLocation) return null;

    // Add some randomness to the exact location within the chosen grid cell
    const cellWidth = this.simulation.width / gridSize;
    const cellHeight = this.simulation.height / gridSize;
    bestLocation.x += (Math.random() - 0.5) * cellWidth;
    bestLocation.y += (Math.random() - 0.5) * cellHeight;

    return bestLocation;
  }

  updateViralReplicator(deltaTime, neighbors) {
    if (this.viralReplicator) {
      this.viralReplicator.infectedCells =
        this.viralReplicator.infectedCells.filter((infected) => {
          infected.timer -= deltaTime;
          if (infected.timer <= 0) {
            this.convertToPredator(infected.cell);
            return false;
          }
          return true;
        });

      if (
        this.viralReplicator.infectedCells.length <
        this.viralReplicator.maxInfected
      ) {
        this.infectNewCells(neighbors);
      }
    }
  }

  infectNewCells(neighbors) {
    neighbors.forEach((cell) => {
      if (
        cell.isPrey &&
        Math.hypot(cell.x - this.x, cell.y - this.y) <=
          this.viralReplicator.radius &&
        !this.viralReplicator.infectedCells.some(
          (infected) => infected.cell === cell
        )
      ) {
        this.viralReplicator.infectedCells.push({
          cell: cell,
          timer: this.viralReplicator.conversionTime,
        });
        if (this.simulation && this.simulation.particleSystem) {
          this.simulation.particleSystem.addParticles(
            cell.x,
            cell.y,
            "rgba(255, 0, 255, 0.5)",
            10,
            "viralInfection"
          );
        }
      }
    });
  }

  convertToPredator(cell) {
    cell.isPrey = false;
    cell.color = this.color;

    // Adjust traits for predator behavior
    cell.attributes.maxSpeed *= 1.2; // Increase speed
    cell.attributes.visionRange *= 1.5; // Increase vision range
    cell.attributes.energyEfficiency *= 0.9; // Slightly reduce energy efficiency

    // Adjust genetic traits
    cell.geneticTraits.speedModifier *= 1.1;
    cell.geneticTraits.energyEfficiency *= 0.95;
    cell.geneticTraits.reproductionBonus *= 0.9;

    // Reset energy and add predator-specific properties
    cell.energy = Cell.MAX_ENERGY / 2;
    cell.preyEaten = 0;

    // Add predator abilities
    cell.addPredatorAbilities();

    // Trigger conversion effect
    if (this.simulation && this.simulation.particleSystem) {
      this.simulation.particleSystem.addParticles(
        cell.x,
        cell.y,
        "rgba(255, 0, 0, 0.7)",
        30,
        "conversion"
      );
    }

    // Update the simulation's cell categorization
    this.simulation.updateCellCategories(cell);
  }

  addPredatorAbilities() {
    // Add basic predator powerups
    this.powerups.push({
      name: "Virus Pull Aura",
      level: 0,
    });
    this.applyPowerups();
  }

  createPredatorZone(x, y, radius) {
    this.predatorZones.push({ x, y, radius });
    // You might want to add visual representation of this zone
  }

  removePredatorZone(x, y) {
    this.predatorZones = this.predatorZones.filter(
      (zone) => zone.x !== x || zone.y !== y
    );
  }

  addPredatorFood(x, y) {
    const food = new Food(x, y, "predatorFood");
    this.food.push(food);
  }

  updateCellCategories(cell) {
    // Remove cell from its old category and add to the new one
    if (cell.isPrey) {
      this.predators = this.predators.filter((p) => p !== cell);
      this.prey.push(cell);
    } else {
      this.prey = this.prey.filter((p) => p !== cell);
      this.predators.push(cell);
    }
  }

  updateTemporalRift(deltaTime, neighbors) {
    if (this.temporalRift) {
      if (this.temporalRift.active) {
        this.temporalRift.timer -= deltaTime;
        if (this.temporalRift.timer <= 0) {
          this.temporalRift.active = false;
        } else {
          this.applyTemporalRift(neighbors, deltaTime);
        }
      } else if (Math.random() < 0.005) {
        // Random chance to activate
        this.temporalRift.active = true;
        this.temporalRift.timer = this.temporalRift.duration;
      }
    }
  }

  applyTemporalRift(neighbors, deltaTime) {
    neighbors.forEach((cell) => {
      const distance = Math.hypot(cell.x - this.x, cell.y - this.y);
      if (distance <= this.temporalRift.radius) {
        const timeFactor = cell.isPrey
          ? 1 / this.temporalRift.warpFactor
          : this.temporalRift.warpFactor;
        cell.update(
          null,
          null,
          this.simulation.width,
          this.simulation.height,
          neighbors,
          deltaTime * timeFactor
        );
      }
    });
    if (this.simulation && this.simulation.particleSystem) {
      this.simulation.particleSystem.addParticles(
        this.x,
        this.y,
        "rgba(128, 0, 128, 0.5)",
        20,
        "temporalRift"
      );
    }
  }

  updateBiomeCatalyst(deltaTime, neighbors) {
    if (this.biomeCatalyst) {
      if (this.biomeCatalyst.active) {
        this.biomeCatalyst.timer -= deltaTime;
        if (this.biomeCatalyst.timer <= 0) {
          this.deactivateBiomeCatalyst();
        } else {
          this.applyBiomeCatalyst(neighbors);
        }
      } else if (Math.random() < 0.005) {
        // Random chance to activate
        this.activateBiomeCatalyst();
      }
    }
  }

  activateBiomeCatalyst() {
    this.biomeCatalyst.active = true;
    this.biomeCatalyst.timer = this.biomeCatalyst.duration;
    if (this.simulation && this.simulation.particleSystem) {
      this.simulation.particleSystem.addParticles(
        this.x,
        this.y,
        "rgba(255, 128, 0, 0.6)",
        50,
        "biomeCatalyst"
      );
    }
    // Create a predator-friendly zone
    this.simulation.createPredatorZone(
      this.x,
      this.y,
      this.biomeCatalyst.radius
    );
  }

  deactivateBiomeCatalyst() {
    this.biomeCatalyst.active = false;
    // Remove the predator-friendly zone
    this.simulation.removePredatorZone(this.x, this.y);
  }

  applyBiomeCatalyst(neighbors) {
    neighbors.forEach((cell) => {
      if (
        cell.isPrey &&
        Math.hypot(cell.x - this.x, cell.y - this.y) <=
          this.biomeCatalyst.radius
      ) {
        cell.applyWeakening(this.biomeCatalyst.weakenFactor);
        // Slow down prey movement
        cell.attributes.maxSpeed *= 0.9;
        // Reduce prey energy gain from food
        cell.attributes.energyGainFactor *= 0.8;
      }
    });
    // Periodically spawn food for predators in the catalyzed area
    if (Math.random() < 0.1) {
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * this.biomeCatalyst.radius;
      const foodX = this.x + Math.cos(angle) * distance;
      const foodY = this.y + Math.sin(angle) * distance;
      this.simulation.addPredatorFood(foodX, foodY);
    }
  }

  applyVirusAura(neighbors) {
    if (!this.virusAura) return [];

    const affectedCells = [];
    const pullStrength = 50 * this.virusAura.strength;

    neighbors.forEach((cell) => {
      if (
        cell !== this &&
        (cell.isPrey ||
          cell instanceof HybridCell ||
          cell instanceof AdaptiveCell)
      ) {
        const distance = Math.hypot(this.x - cell.x, this.y - cell.y);
        if (distance < this.virusAura.radius) {
          const effect = 1 - distance / this.virusAura.radius;
          const dx = this.x - cell.x;
          const dy = this.y - cell.y;
          const pullFactor = effect * pullStrength;

          cell.vx += (dx / distance) * pullFactor;
          cell.vy += (dy / distance) * pullFactor;

          affectedCells.push(cell);
        }
      }
    });

    return affectedCells;
  }
  static resetDefaults() {
    CellConfig.resetToDefaults();
  }
}

class Food {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 1.2;
    this.color = this.generateFoodColor();
    this.opacity = 0; // Start with 0 opacity
    this.targetOpacity = Math.random() * 0.3 + 0.3;
    this.glowRadius = this.radius * 2;
    this.glowOpacity = 0;
    this.animationProgress = 0;
  }

  generateFoodColor() {
    const hue = Math.random() * 60 + 140;
    return `hsl(${hue}, 100%, 70%)`;
  }

  update(deltaTime) {
    if (this.animationProgress < 1) {
      this.animationProgress += deltaTime * 2.5; // Adjust speed of appearance
      this.animationProgress = Math.min(this.animationProgress, 1);
      this.opacity = this.targetOpacity * this.animationProgress;
      this.glowOpacity = this.opacity * 0.5;
      this.radius = 1.5 * this.animationProgress;
    }
  }

  draw(ctx) {
    const safeRadius = Math.max(this.radius, 0.1);
    const safeGlowRadius = Math.max(this.glowRadius, safeRadius);

    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      safeRadius,
      this.x,
      this.y,
      safeGlowRadius
    );
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(1, "rgba(0, 255, 255, 0)");

    ctx.beginPath();
    ctx.arc(this.x, this.y, safeGlowRadius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.globalAlpha = this.glowOpacity;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(this.x, this.y, safeRadius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.fill();

    ctx.globalAlpha = 1;
  }
}

class HybridCell extends Cell {
  static HYBRID_REPRODUCTION_THRESHOLD = 55;
  static HYBRID_MOVEMENT_COST = 0.0019;
  static HYBRID_REPRODUCTION_RATE = 2;
  static HYBRID_MAX_ENERGY = 120;
  static HYBRID_MUTATION_RATE = 0.03;
  static PREDATOR_MODE_ENERGY_DRAIN = 0.01;
  static HYBRID_SPEED_BOOST = 1.6;

  constructor(x, y, eyeColor = null, attributes = null, geneticTraits = null) {
    super(x, y, "indigo", true, eyeColor, attributes, geneticTraits);
    this.maxOffspringPerReproduction = 20;
    this.isPrey = true;
    this.switchCooldown = 0;
    this.adaptability = 0.05;
    this.energyDecayRate = 0.1;
    this.camouflageEffectiveness = 0.14;

    // Override some attributes for hybrid cells
    this.attributes = {
      ...this.attributes,
      maxSpeed: Cell.MAX_SPEED * HybridCell.HYBRID_SPEED_BOOST, // Use Cell.MAX_SPEED as base
      reproductionThreshold: HybridCell.HYBRID_REPRODUCTION_THRESHOLD,
      movementCost: HybridCell.HYBRID_MOVEMENT_COST,
      reproductionRate: HybridCell.HYBRID_REPRODUCTION_RATE,
    };
  }

  update(nearestFood, nearestCell, width, height, neighbors, deltaTime) {
    if (this.switchCooldown > 0) {
      this.switchCooldown -= deltaTime;
    } else {
      // More balanced mode switching
      const nearbyPrey = neighbors.filter(
        (cell) => cell.isPrey && !(cell instanceof HybridCell)
      ).length;
      const nearbyPredators = neighbors.filter(
        (cell) => !cell.isPrey && !(cell instanceof HybridCell)
      ).length;

      if (nearbyPredators > nearbyPrey * 0.5 && this.energy > 70) {
        this.isPrey = false;
      } else if (nearbyPrey > nearbyPredators || this.energy < 80) {
        this.isPrey = true;
      }

      this.color = this.isPrey ? "indigo" : "red";
      this.switchCooldown = 5 * deltaTime; // Cooldown in seconds
    }

    super.update(nearestFood, nearestCell, width, height, neighbors, deltaTime);

    // Adjusted adaptability increase
    this.energy += this.adaptability * 0.06 * deltaTime;
    this.adaptability += 0.0008 * deltaTime;
    this.adaptability = Math.min(this.adaptability, 0.02);

    // Increased energy decay in predator mode
    if (!this.isPrey) {
      this.energy -= HybridCell.PREDATOR_MODE_ENERGY_DRAIN * deltaTime;
    }

    // Add speed limiting logic
    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    const maxSpeed =
      this.attributes.maxSpeed * this.geneticTraits.speedModifier;
    if (speed > maxSpeed) {
      const factor = maxSpeed / speed;
      this.vx *= factor;
      this.vy *= factor;
    }

    // Constant energy decay
    this.energy -= this.energyDecayRate * deltaTime;
    this.energy = Math.max(
      0,
      Math.min(this.energy, HybridCell.HYBRID_MAX_ENERGY)
    );
  }

  draw(ctx) {
    // Draw a diamond shape for hybrid cells
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(Math.PI / 4);

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.rect(-this.radius, -this.radius, this.radius * 2, this.radius * 2);
    ctx.fill();

    // Draw eye
    const eyeSize = this.radius * 0.6;
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(0, 0, eyeSize, 0, Math.PI * 2);
    ctx.fill();

    // Draw pupil
    const pupilSize = eyeSize * 0.6;
    ctx.fillStyle = this.eyeColor;
    ctx.beginPath();
    ctx.arc(0, 0, pupilSize, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // Draw evolution glow if evolved
    if (this.isEvolved) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(128, 0, 128, 0.3)";
      ctx.fill();
    }
  }

  eat(prey) {
    if (this.isPrey) {
      this.energy += 10;
      this.foodEaten = (this.foodEaten || 0) + 1;
    } else {
      if (prey instanceof Cell && !(prey instanceof HybridCell)) {
        this.energy += 10;
        this.energyDecayRate += 0.2;
        this.foodEaten = (this.foodEaten || 0) + 1;
      }
    }
    this.energy = Math.min(this.energy, HybridCell.HYBRID_MAX_ENERGY);
    return this.createOffspring(this.attributes.reproductionRate);
  }

  defend(attacker) {
    if (Math.random() < this.camouflageEffectiveness) {
      return true; // Successfully avoided attack
    }
    return false;
  }

  evolve() {
    super.evolve();
    this.color = "indigo";
    this.adaptability *= Cell.EVOLUTION_BOOST;
    this.camouflageEffectiveness *= Cell.EVOLUTION_BOOST;

    // Add evolution burst effect
    if (this.simulation && this.simulation.particleSystem) {
      this.simulation.particleSystem.addParticles(
        this.x,
        this.y,
        this.color,
        10,
        "burst"
      );
    }
  }

  createOffspring(count) {
    const newCells = [];
    for (let i = 0; i < count; i++) {
      const offspring = new HybridCell(
        this.x + (Math.random() - 0.5) * 2,
        this.y + (Math.random() - 0.5) * 2,
        this.eyeColor,
        { ...this.attributes },
        { ...this.geneticTraits }
      );
      offspring.adaptability = Math.max(
        0,
        this.adaptability + (Math.random() - 0.2) * 0.1
      );
      offspring.energyDecayRate =
        this.energyDecayRate * (1 + (Math.random() - 0.5) * 0.1);
      offspring.simulation = this.simulation;
      newCells.push(offspring);
    }
    return newCells;
  }

  battle(opponent) {
    if (opponent instanceof AdaptiveCell) {
      const battleRoll = Math.random();
      if (battleRoll > 0.5) {
        // HybridCell wins
        this.energy += 20;
        return true;
      } else {
        // HybridCell loses
        this.energy = 0;
        return false;
      }
    }
    return null; // No battle occurs with other cell types
  }
}

class AdaptiveCell extends Cell {
  static ADAPTIVE_REPRODUCTION_THRESHOLD = 75;
  static ADAPTIVE_MOVEMENT_COST = 0.015;
  static ADAPTIVE_REPRODUCTION_RATE = 1.34;
  static ADAPTIVE_MAX_ENERGY = 100;
  static ADAPTIVE_MUTATION_RATE = 0.03;
  static MODE_SWITCH_COST = 8;
  static CAMOUFLAGE_EFFECTIVENESS = 0.25;
  static SYMBIOSIS_RANGE = 2;
  static SYMBIOSIS_ENERGY_SHARE = 0.09;
  static MAX_STORED_ENERGY = 80;
  static DANGER_DETECTION_RANGE = 25;
  static CLUSTERING_RANGE = 42;
  static WARNING_SIGNAL_RANGE = 35;
  static EVASION_SPEED_MULTIPLIER = 1.45;
  static SAFE_ZONE_RADIUS = 20;
  static SAFE_ZONE_DURATION = 1.5;
  static MAX_SPEED = 1.3;
  static ENERGY_DECAY_RATE = 0.005;

  constructor(x, y, eyeColor = null, attributes = null, geneticTraits = null) {
    super(x, y, "teal", true, eyeColor, attributes, geneticTraits);
    this.maxOffspringPerReproduction = 20;
    this.mode = 0; // 0 is fully autotrophic, 1 is fully heterotrophic
    this.camouflageActive = false;
    this.camouflageEffectiveness = AdaptiveCell.CAMOUFLAGE_EFFECTIVENESS;
    this.storedEnergy = 0;
    this.dormant = false;
    this.symbioticPartner = null;
    this.inDanger = false;
    this.clusterPartners = [];
    this.warningSignalStrength = 0;
    this.nestLocation = { x: this.x, y: this.y };
    this.safeZoneTimer = 0;
    this.evading = false;

    this.attributes = {
      ...this.attributes,
      maxSpeed: AdaptiveCell.MAX_SPEED,
      reproductionThreshold: AdaptiveCell.ADAPTIVE_REPRODUCTION_THRESHOLD,
      movementCost: AdaptiveCell.ADAPTIVE_MOVEMENT_COST,
      reproductionRate: AdaptiveCell.ADAPTIVE_REPRODUCTION_RATE,
    };
  }

  update(nearestFood, nearestCell, width, height, neighbors, deltaTime) {
    super.update(nearestFood, nearestCell, width, height, neighbors, deltaTime);
    if (this.dormant) {
      this.energy += 0.005 * deltaTime;
      if (this.energy > 40) this.dormant = false;
      return;
    }

    const foodScarcity =
      !nearestFood ||
      Math.hypot(this.x - nearestFood.x, this.y - nearestFood.y) > 100;
    const predatorNearby = this.detectPredator(neighbors);

    this.adjustMode(foodScarcity, deltaTime);
    this.inDanger = predatorNearby !== null;

    if (this.inDanger) {
      this.activateCamouflage();
      this.emitWarningSignal(deltaTime);
      this.formCluster(neighbors);
      this.evade(predatorNearby, width, height, deltaTime);
    } else {
      this.deactivateCamouflage();
      this.dissolveCluster();
      this.evading = false;
      this.moveTowardsTarget(
        nearestFood,
        nearestCell,
        width,
        height,
        deltaTime
      );
    }

    this.handleSymbiosis(nearestCell, deltaTime);
    this.manageEnergy(deltaTime);

    this.energy = Math.max(
      0,
      Math.min(this.energy, AdaptiveCell.ADAPTIVE_MAX_ENERGY)
    );
    this.warningSignalStrength = Math.max(
      0,
      this.warningSignalStrength - 0.1 * deltaTime
    );

    if (this.safeZoneTimer > 0) {
      this.safeZoneTimer -= deltaTime;
    }
  }

  detectPredator(neighbors) {
    return (
      neighbors.find(
        (cell) =>
          !cell.isPrey &&
          Math.hypot(cell.x - this.x, cell.y - this.y) <
            AdaptiveCell.DANGER_DETECTION_RANGE
      ) || null
    );
  }

  adjustMode(foodScarcity, deltaTime) {
    const adjustment = (foodScarcity ? 0.1 : -0.1) * deltaTime;
    this.mode = Math.max(0, Math.min(1, this.mode + adjustment));
    this.energy -= AdaptiveCell.MODE_SWITCH_COST * Math.abs(adjustment) * 0.1;
  }

  manageEnergy(deltaTime) {
    const photosyntheticGain = 0.03 * (1 - this.mode) * deltaTime;
    this.energy += photosyntheticGain;

    if (this.energy > 85) {
      const excessEnergy = this.energy - 85;
      const storageCapacity =
        AdaptiveCell.MAX_STORED_ENERGY - this.storedEnergy;
      const energyToStore = Math.min(
        excessEnergy,
        storageCapacity,
        0.1 * deltaTime
      );
      this.storedEnergy += energyToStore;
      this.energy -= energyToStore;
    }

    if (this.energy < 15 && this.storedEnergy > 0) {
      const energyToUse = Math.min(
        this.storedEnergy,
        20 - this.energy,
        0.1 * deltaTime
      );
      this.energy += energyToUse;
      this.storedEnergy -= energyToUse;
    }

    this.energy -= AdaptiveCell.ENERGY_DECAY_RATE * deltaTime;

    if (this.energy < 10) {
      this.dormant = true;
    }
  }

  moveTowardsTarget(nearestFood, nearestCell, width, height, deltaTime) {
    let targetX, targetY;
    const speedMultiplier = this.inDanger ? 1.1 : 1;

    if (this.inDanger) {
      const dx = this.x - nearestCell.x;
      const dy = this.y - nearestCell.y;
      const dist = Math.hypot(dx, dy);
      targetX = this.x + (dx / dist) * 50;
      targetY = this.y + (dy / dist) * 50;
    } else if (nearestFood) {
      targetX = nearestFood.x;
      targetY = nearestFood.y;
    } else {
      targetX = this.x + (Math.random() - 0.5) * 40;
      targetY = this.y + (Math.random() - 0.5) * 40;
    }

    const dx = targetX - this.x;
    const dy = targetY - this.y;
    const magnitude = Math.sqrt(dx * dx + dy * dy);
    if (magnitude > 0) {
      this.vx = (dx / magnitude) * this.attributes.maxSpeed * speedMultiplier;
      this.vy = (dy / magnitude) * this.attributes.maxSpeed * speedMultiplier;
    }

    this.x += this.vx * deltaTime;
    this.y += this.vy * deltaTime;
    this.x = (this.x + width) % width;
    this.y = (this.y + height) % height;

    this.energy -=
      ((this.attributes.movementCost * speedMultiplier) /
        this.geneticTraits.energyEfficiency) *
      deltaTime;
  }

  activateCamouflage() {
    this.camouflageActive = true;
    this.camouflageEffectiveness = Math.min(
      0.9,
      this.camouflageEffectiveness + 0.005
    );
  }

  deactivateCamouflage() {
    this.camouflageActive = false;
    this.camouflageEffectiveness = AdaptiveCell.CAMOUFLAGE_EFFECTIVENESS;
  }

  emitWarningSignal(deltaTime) {
    this.warningSignalStrength = 1;
    this.clusterPartners.forEach((partner) => {
      if (partner instanceof AdaptiveCell) {
        partner.receiveWarning(this);
      }
    });

    if (this.simulation && this.simulation.particleSystem) {
      this.simulation.particleSystem.addParticles(
        this.x,
        this.y,
        "rgba(255, 0, 0, 0.5)",
        3,
        "ripple"
      );
    }
  }

  receiveWarning(sender) {
    if (!this.inDanger) {
      this.inDanger = true;
      this.evading = true;
      const dx = sender.x - this.x;
      const dy = sender.y - this.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 0) {
        this.vx = (dx / dist) * this.attributes.maxSpeed * 0.8;
        this.vy = (dy / dist) * this.attributes.maxSpeed * 0.8;
      }
    }
  }

  formCluster(neighbors) {
    this.clusterPartners = this.clusterPartners.filter(
      (partner) =>
        Math.hypot(this.x - partner.x, this.y - partner.y) <
        AdaptiveCell.CLUSTERING_RANGE
    );

    const nearestAdaptiveCell = neighbors.find(
      (cell) =>
        cell instanceof AdaptiveCell &&
        cell !== this &&
        Math.hypot(this.x - cell.x, this.y - cell.y) <
          AdaptiveCell.CLUSTERING_RANGE
    );

    if (
      nearestAdaptiveCell &&
      !this.clusterPartners.includes(nearestAdaptiveCell)
    ) {
      this.clusterPartners.push(nearestAdaptiveCell);
    }
  }

  dissolveCluster() {
    this.clusterPartners = [];
  }

  handleSymbiosis(nearestCell, deltaTime) {
    if (
      nearestCell instanceof AdaptiveCell &&
      Math.hypot(this.x - nearestCell.x, this.y - nearestCell.y) <
        AdaptiveCell.SYMBIOSIS_RANGE
    ) {
      this.symbioticPartner = nearestCell;
      const energyToShare =
        this.energy * AdaptiveCell.SYMBIOSIS_ENERGY_SHARE * deltaTime;
      this.energy -= energyToShare;
      this.symbioticPartner.energy += energyToShare;
    } else {
      this.symbioticPartner = null;
    }
  }

  eat(prey) {
    if (prey instanceof Food) {
      const energyGain = (15 * (1 - this.mode) + 35 * this.mode) * 0.8;
      this.energy += energyGain;
      this.energy = Math.min(this.energy, AdaptiveCell.ADAPTIVE_MAX_ENERGY);
      this.evolutionProgress++;
      this.foodEaten = (this.foodEaten || 0) + 1;
    } else if (prey instanceof Cell || prey instanceof HybridCell) {
      if (this.mode > 0.5) {
        const energyGain = 35 * this.mode * 0.8;
        this.energy += energyGain;
        this.energy = Math.min(this.energy, AdaptiveCell.ADAPTIVE_MAX_ENERGY);
        this.evolutionProgress++;
        this.foodEaten = (this.foodEaten || 0) + 1;
      }
    }
    return this.createOffspring(
      this.attributes.reproductionRate * (1 - this.mode * 0.15)
    );
  }
  defend(attacker) {
    if (this.camouflageActive && Math.random() < this.camouflageEffectiveness) {
      return true;
    }
    if (
      this.clusterPartners.length > 0 &&
      Math.random() < this.clusterPartners.length * 0.08
    ) {
      return true;
    }
    return false;
  }

  evade(predator, width, height, deltaTime) {
    this.evading = true;
    let dx, dy;

    if (predator) {
      dx = this.x - predator.x;
      dy = this.y - predator.y;
      const dist = Math.hypot(dx, dy);

      if (dist < AdaptiveCell.SAFE_ZONE_RADIUS) {
        this.createSafeZone();
      }
    }

    if (this.safeZoneTimer > 0) {
      dx = this.nestLocation.x - this.x;
      dy = this.nestLocation.y - this.y;
    } else if (predator) {
      dx = this.x - predator.x;
      dy = this.y - predator.y;
    } else {
      dx = Math.random() - 0.5;
      dy = Math.random() - 0.5;
    }

    const magnitude = Math.sqrt(dx * dx + dy * dy);
    if (magnitude > 0) {
      this.vx =
        (dx / magnitude) *
        this.attributes.maxSpeed *
        AdaptiveCell.EVASION_SPEED_MULTIPLIER;
      this.vy =
        (dy / magnitude) *
        this.attributes.maxSpeed *
        AdaptiveCell.EVASION_SPEED_MULTIPLIER;
    }

    this.x += this.vx * deltaTime;
    this.y += this.vy * deltaTime;
    this.x = (this.x + width) % width;
    this.y = (this.y + height) % height;

    this.energy -=
      ((this.attributes.movementCost * AdaptiveCell.EVASION_SPEED_MULTIPLIER) /
        this.geneticTraits.energyEfficiency) *
      deltaTime;
  }

  createSafeZone() {
    if (this.safeZoneTimer === 0) {
      this.safeZoneTimer = AdaptiveCell.SAFE_ZONE_DURATION * 0.45;
      this.nestLocation = { x: this.x, y: this.y };
    }
  }

  reproduce() {
    if (this.energy >= this.attributes.reproductionThreshold) {
      const offspringCount = this.isPrey ? 2 : 1;
      const offspring = this.createOffspring(offspringCount);
      this.energy /= 1.3;
      return Array.isArray(offspring) ? offspring : [offspring];
    }
    return []; // Return an empty array if no reproduction occurs
  }
  createOffspring(count) {
    const newCells = [];
    for (let i = 0; i < count; i++) {
      const offspring = new AdaptiveCell(
        this.x + (Math.random() - 0.5) * 20,
        this.y + (Math.random() - 0.5) * 20,
        this.eyeColor,
        { ...this.attributes },
        { ...this.geneticTraits }
      );
      offspring.mode = this.mode;
      offspring.storedEnergy = this.storedEnergy * 0.08;
      this.storedEnergy *= 0.75;
      offspring.simulation = this.simulation;
      newCells.push(offspring);
    }
    return newCells;
  }

  draw(ctx) {
    const hexagonRadius = this.radius * 1.1; // Slightly larger to compensate for the hexagon shape
    const hexagonAngle = Math.PI / 3;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(Math.atan2(this.vy, this.vx)); // Rotate based on movement direction

    // Draw hexagon body
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = i * hexagonAngle;
      const x = hexagonRadius * Math.cos(angle);
      const y = hexagonRadius * Math.sin(angle);
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.fillStyle = this.camouflageActive
      ? this.generateRandomColor()
      : `rgb(0, ${Math.floor(255 * (1 - this.mode))}, ${Math.floor(
          255 * (1 - this.mode)
        )})`;
    ctx.fill();

    // Draw eye
    const eyeRadius = this.radius * 0.4;
    const eyeX = hexagonRadius * 0.5;
    const eyeY = 0;

    ctx.beginPath();
    ctx.arc(eyeX, eyeY, eyeRadius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();

    // Draw pupil
    const pupilRadius = eyeRadius * 0.6;
    const pupilX = eyeX + pupilRadius * 0.3;
    const pupilY = eyeY;

    ctx.beginPath();
    ctx.arc(pupilX, pupilY, pupilRadius, 0, Math.PI * 2);
    ctx.fillStyle = this.eyeColor;
    ctx.fill();

    ctx.restore();

    // Draw additional features
    this.drawAdditionalFeatures(ctx);
  }

  drawAdditionalFeatures(ctx) {
    // Draw safe zone if active
    if (this.safeZoneTimer > 0) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 1.5, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0, 255, 255, 0.4)";
      ctx.stroke();
    }

    // Draw evasion indicator
    if (this.evading) {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);

      ctx.strokeStyle = "rgba(255, 255, 0, 0.6)";
      ctx.stroke();
    }

    // Draw warning signal
    if (this.warningSignalStrength > 0) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 0, 0, ${this.warningSignalStrength * 0.4})`;
      ctx.stroke();
    }

    // Draw dormant state indicator
    if (this.dormant) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 1.2, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
      ctx.stroke();
    }

    // Draw evolution glow if evolved
    if (this.isEvolved) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 1.7, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 255, 255, 0.2)";
      ctx.fill();
    }
  }

  generateRandomColor() {
    return `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
      Math.random() * 256
    )},${Math.floor(Math.random() * 256)})`;
  }

  evolve() {
    if (!this.isEvolved) {
      super.evolve();
      this.radius *= 1.3;
      this.attributes.maxSpeed *= 1.13;
      this.camouflageEffectiveness *= 1.1;

      // Add evolution burst effect
      if (this.simulation && this.simulation.particleSystem) {
        this.simulation.particleSystem.addParticles(
          this.x,
          this.y,
          this.color,
          10,
          "burst"
        );
      }
    }
  }

  battle(opponent) {
    if (opponent instanceof HybridCell) {
      const battleRoll = Math.random();
      if (battleRoll > 0.5) {
        // AdaptiveCell wins
        this.energy += 20;
        return true;
      } else {
        // AdaptiveCell loses
        this.energy = 0;
        return false;
      }
    }
    return null; // No battle occurs with other cell types
  }
}

class Particle {
  constructor(x, y, color, type = "burst") {
    this.x = x;
    this.y = y;
    this.color = color;
    this.type = type;
    this.size = Math.max(Math.abs(Math.random() * 2 + 1), 0.1);
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 4 - 2;
    this.lifetime = 80;
    this.alpha = 1;

    if (this.type === "packFormation") {
      this.lifetime = 30;
      this.size = 3; // Increased size
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
    }

    if (this.type === "energyShare") {
      this.lifetime = 20;
      this.size = 2;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
    }

    if (this.type === "levelUp") {
      this.lifetime = 60;
      this.size = 5;
      this.speedX = (Math.random() - 0.5) * 2;
      this.speedY = -Math.random() * 2 - 1; // Particles move upwards
      this.color = "rgba(255, 215, 0, 0.8)"; // Golden color
    }

    if (this.type === "pullEffect") {
      this.lifetime = 30;
      this.size = 2;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
    } else if (this.type === "eggSpawn") {
      this.lifetime = 20;
      this.size = 1;
      this.speedX = (Math.random() - 0.5) * 2;
      this.speedY = (Math.random() - 0.5) * 2;
    } else if (this.type === "projectileHit") {
      this.lifetime = 15;
      this.size = 2;
      this.speedX = (Math.random() - 0.5) * 3;
      this.speedY = (Math.random() - 0.5) * 3;
    }

    if (this.type === "cellDeath") {
      this.lifetime = 40;
      this.size = 3;
      this.speedX = (Math.random() - 0.5) * 1;
      this.speedY = (Math.random() - 0.5) * 1;
    }

    if (this.type === "ripple") {
      this.radius = 0;
      this.maxRadius = Math.random() * 20 + 10;
      this.expandSpeed = Math.random() * 0.5 + 0.5;
    } else if (this.type === "trail") {
      this.lifetime = 20;
    } else if (this.type === "predatorFeed") {
      this.lifetime = 40;
      this.size = Math.random() * 1.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 2;
      this.speedY = (Math.random() - 0.5) * 2;
    }
  }

  update(deltaTime) {
    if (
      this.type === "burst" ||
      this.type === "predatorFeed" ||
      this.type === "packFormation"
    ) {
      this.x += this.speedX * deltaTime * 60;
      this.y += this.speedY * deltaTime * 60;
    } else if (this.type === "ripple") {
      this.radius += this.expandSpeed * deltaTime * 60;
    }
    if (this.type === "levelUp") {
      this.speedY += 0.05 * deltaTime; // Add some gravity
      this.size = Math.max(this.size - deltaTime * 0.05, 0.1);
    }

    if (this.type === "virusEffect") {
      this.lifetime = 20;
      this.size = 2;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
    }

    if (this.type === "virusEffect" || this.type === "cellDeath") {
      this.x += this.speedX * deltaTime * 60;
      this.y += this.speedY * deltaTime * 60;
      this.size = Math.max(this.size - deltaTime * 0.05, 0.1);
    }

    this.lifetime -= deltaTime * 60;
    this.alpha = Math.max(this.lifetime / 100, 0);
    this.size = Math.max(this.size - deltaTime * 0.1, 0.1); // Gradually decrease size, but keep it positive
  }

  draw(ctx) {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;

    if (
      this.type === "burst" ||
      this.type === "trail" ||
      this.type === "predatorFeed"
    ) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, Math.max(this.size, 0.1), 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === "ripple") {
      ctx.beginPath();
      ctx.arc(this.x, this.y, Math.max(this.radius, 0.1), 0, Math.PI * 2);
      ctx.strokeStyle = this.color;
      ctx.stroke();
    }
    if (this.type === "levelUp") {
      ctx.beginPath();
      ctx.arc(this.x, this.y, Math.max(this.size, 0.1), 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();

      ctx.font = `${this.size * 2}px Arial`;
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.fillText("↑", this.x - this.size / 2, this.y + this.size / 2);
    }
    if (this.type === "virusEffect" || this.type === "cellDeath") {
      ctx.beginPath();
      ctx.arc(this.x, this.y, Math.max(this.size, 0.1), 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }
}

class ParticleSystem {
  constructor(maxParticles = 250) {
    this.particles = [];
    this.maxParticles = maxParticles;
  }

  addParticles(x, y, color, count, type = "burst") {
    count = Math.min(count, 5); // Limit the number of particles per addition
    for (let i = 0; i < count; i++) {
      if (this.particles.length >= this.maxParticles) {
        // Remove the oldest particle if we've reached the limit
        this.particles.shift();
      }
      this.particles.push(new Particle(x, y, color, type));
    }
  }
  addLevelUpEffect(x, y) {
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(new Particle(x, y, "pink", "levelUp"));
    }
  }
  addEggSpawnEffect(x, y) {
    const particleCount = 10;
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(
        new Particle(x, y, "rgba(255, 255, 255, 0.7)", "eggSpawn")
      );
    }
  }
  addPullEffect(x, y, radius) {
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const distance = Math.random() * radius;
      this.particles.push(
        new Particle(
          x + Math.cos(angle) * distance,
          y + Math.sin(angle) * distance,
          "rgba(0, 255, 0, 0.5)",
          "pullEffect"
        )
      );
    }
  }

  addProjectileHitEffect(x, y) {
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 50 + 50;
      this.particles.push(
        new Particle(
          x,
          y,
          "yellow",
          "projectileHit",
          Math.cos(angle) * speed,
          Math.sin(angle) * speed
        )
      );
    }
  }

  update(deltaTime) {
    this.particles = this.particles.filter((particle) => {
      particle.update(deltaTime);
      return (
        particle.lifetime > 0 &&
        !(particle.type === "ripple" && particle.radius >= particle.maxRadius)
      );
    });
  }

  draw(ctx) {
    ctx.save();
    for (let particle of this.particles) {
      particle.draw(ctx);
    }
    ctx.restore();
  }
}

class Quadtree {
  constructor(x, y, width, height, level = 0, maxLevel = 4, maxObjects = 10) {
    this.bounds = { x, y, width, height };
    this.level = level;
    this.maxLevel = maxLevel;
    this.maxObjects = maxObjects;
    this.objects = [];
    this.nodes = [];
  }

  clear() {
    this.objects = [];
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i]) {
        this.nodes[i].clear();
      }
    }
    this.nodes = [];
  }

  split() {
    const subWidth = this.bounds.width / 2;
    const subHeight = this.bounds.height / 2;
    const x = this.bounds.x;
    const y = this.bounds.y;

    this.nodes[0] = new Quadtree(
      x + subWidth,
      y,
      subWidth,
      subHeight,
      this.level + 1,
      this.maxLevel,
      this.maxObjects
    );
    this.nodes[1] = new Quadtree(
      x,
      y,
      subWidth,
      subHeight,
      this.level + 1,
      this.maxLevel,
      this.maxObjects
    );
    this.nodes[2] = new Quadtree(
      x,
      y + subHeight,
      subWidth,
      subHeight,
      this.level + 1,
      this.maxLevel,
      this.maxObjects
    );
    this.nodes[3] = new Quadtree(
      x + subWidth,
      y + subHeight,
      subWidth,
      subHeight,
      this.level + 1,
      this.maxLevel,
      this.maxObjects
    );
  }

  getIndex(obj) {
    const midX = this.bounds.x + this.bounds.width / 2;
    const midY = this.bounds.y + this.bounds.height / 2;

    const topQuadrant = obj.y < midY && obj.y + obj.height < midY;
    const bottomQuadrant = obj.y > midY;

    if (obj.x < midX && obj.x + obj.width < midX) {
      if (topQuadrant) {
        return 1;
      } else if (bottomQuadrant) {
        return 2;
      }
    } else if (obj.x > midX) {
      if (topQuadrant) {
        return 0;
      } else if (bottomQuadrant) {
        return 3;
      }
    }

    return -1;
  }

  insert(obj) {
    if (this.nodes.length) {
      const index = this.getIndex(obj);
      if (index !== -1) {
        this.nodes[index].insert(obj);
        return;
      }
    }

    this.objects.push(obj);

    if (this.objects.length > this.maxObjects && this.level < this.maxLevel) {
      if (!this.nodes.length) {
        this.split();
      }

      let i = 0;
      while (i < this.objects.length) {
        const index = this.getIndex(this.objects[i]);
        if (index !== -1) {
          this.nodes[index].insert(this.objects.splice(i, 1)[0]);
        } else {
          i++;
        }
      }
    }
  }

  retrieve(obj) {
    const index = this.getIndex(obj);
    let returnObjects = this.objects;

    if (this.nodes.length) {
      if (index !== -1) {
        returnObjects = returnObjects.concat(this.nodes[index].retrieve(obj));
      } else {
        for (let i = 0; i < this.nodes.length; i++) {
          returnObjects = returnObjects.concat(this.nodes[i].retrieve(obj));
        }
      }
    }

    return returnObjects;
  }
}

customElements.define("cell-life-simulation", CellLifeSimulation);
document.addEventListener("DOMContentLoaded", () => {
  const simulation = document.createElement("cell-life-simulation");
  document.body.appendChild(simulation);
});
