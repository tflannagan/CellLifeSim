# CellLifeSim

CellLifeSim is a dynamic cellular automaton simulation that models evolving entities in a competitive and cooperative environment. It offers a fascinating glimpse into the complex interactions of digital life forms.

[Live Demo](https://tflannagan.github.io/CellLifeSim/)

## Features

- Grid-based simulation with various cell types (prey, predators, hybrids, adaptive)
- Complex entity behaviors including evolution, reproduction, and pack hunting
- Dynamic food supply and feeding areas
- Interactive controls for simulation management
- Real-time population statistics and graphs
- Customizable simulation parameters
- Particle effects for enhanced visual feedback
- User-controlled game mode

## How to Use

1. Choose between "Game" (user-controlled) or "Simulation" mode
2. Use the buttons on the right to toggle different cell types and behaviors:
   - 🧬: Toggle hybrid cells
   - 🧠: Toggle adaptive cells
   - 🐦: Toggle flocking behavior
   - 🍽️: Toggle food distribution mode
3. Use the buttons on the bottom-left for additional controls:
   - ↻: Restart the simulation
   - ⛶: Toggle fullscreen
   - 🕒: Show runtime
4. Monitor population statistics and graphs using the dashboard toggles
5. In game mode, control a predator cell using WASD keys

## Cell Types

- **Prey**: Basic cells that consume food and avoid predators
- **Predators**: Hunt and consume prey cells
- **Hybrid**: Can switch between prey and predator behaviors
- **Adaptive**: Highly evolved cells with complex survival strategies

## Technical Details

- Built with vanilla JavaScript and HTML5 Canvas
- Utilizes object-oriented programming for cell behaviors
- Implements quadtree data structure for efficient spatial partitioning
- Uses particle systems for visual effects
- Responsive design adapts to different screen sizes
